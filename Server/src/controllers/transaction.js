// Import base
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

// Import model
const User = require("../models/user");
const Room = require("../models/room");
const Hotel = require("../models/hotel");
const Transaction = require("../models/transaction");

// Import util
const paging = require("../utils/paging");

// Update transaction status function
const updateTransactionStatus = async () => {
  try {
    // Get all transactions
    const trans = await Transaction.find();

    // Update transactions
    trans.forEach(async (tran) => {
      // Convert date to time (ms)
      const curDate = new Date().getTime();
      const staDate = new Date(tran.startDate).getTime();
      const endDate = new Date(tran.endDate).getTime() + 24 * 60 * 60 * 1000;

      // Room status is booked
      if (curDate < staDate)
        await Transaction.findByIdAndUpdate(tran._id, {
          status: "Booked",
        });
      // Room status is check in
      else if (curDate < endDate)
        await Transaction.findByIdAndUpdate(tran._id, {
          status: "Check in",
        });
      // Room status is check out
      else
        await Transaction.findByIdAndUpdate(tran._id, {
          status: "Check out",
        });
    });

    // Catch error
  } catch (error) {
    console.log(error);
  }
};

exports.updateTransactionStatus = updateTransactionStatus;

// POST - /api/transaction/create-transaction
exports.postCreateTransaction = (req, res, next) => {
  // Create response data
  const resData = {};

  // Get transaction data
  const rooms = req.body.rooms;
  const startDate = new Date(req.body.startDate);
  const endDate = new Date(req.body.endDate);
  const price = Number(req.body.price);
  const payment = req.body.payment;
  const status = req.body.status;
  let user;
  let hotel;

  // If user haven't logged in yet
  if (!req.session.user) {
    resData.type = "Error";
    resData.message = "You need to login to create transaction";
    return res.status(400).json(resData);
  }

  // Try to convert string id to object id
  try {
    user = new ObjectId(req.session.user._id);
    hotel = new ObjectId(req.body.hotel);
  } catch (err) {
    // If catch error
    console.log(err);
    resData.type = "Error";
    resData.message = "Invalid id";
    return res.status(400).json(resData);
  }

  resData.input = {
    user,
    hotel,
    rooms,
    startDate,
    endDate,
    price,
    payment,
    status,
  };

  // Create transaction
  Transaction.create({
    user,
    hotel,
    rooms,
    startDate,
    endDate,
    price,
    payment,
    status,
  })
    // Return success state
    .then(() => {
      resData.type = "Success";
      resData.message = "Create transaction successfully";
      return res.json(resData);
    })
    // Catch errors
    .catch((err) => {
      console.log(err);
      resData.type = "Error";
      resData.message = "Some error occurs in server - " + err.toString();
      return res.status(500).json(resData);
    });
};

// GET - /api/transaction/get-by-user-id/:userId
exports.getTransactionsByUserId = async (req, res, next) => {
  // Create response data
  const resData = {};

  // Get userId from params
  const userId = req.params.userId;

  try {
    // Update transactions state base on current date
    await updateTransactionStatus();

    // Get transactions of user have userId
    const trans = await Transaction.find({
      user: new ObjectId(userId),
    })
      .populate(["hotel", "user"])
      .exec();

    // Send response
    resData.type = "Success";
    resData.items = trans;
    return res.json(resData);

    // If catch error
  } catch (error) {
    console.log(error);
    resData.type = "Error";
    resData.message = "Some errors in server - " + error.toString();
    return res.status(500).json(resData);
  }
};

// GET - /api/transaction/get-latest
exports.getLatestTransactions = async (req, res, next) => {
  // Response data
  let resData = {};

  // Get number of transaction client want to get
  const limit = Number(req.query.limit) || 1000;
  // Get page
  const page = Number(req.query.page) || 1;
  // Get page size
  const pageSize = Number(req.query.pageSize) || 8;

  try {
    // Update transactions state base on current date
    updateTransactionStatus();

    // Get transactions and sort by startDate descending
    const trans = await Transaction.find()
      .populate([{ path: "user" }, { path: "hotel" }])
      .sort({ startDate: -1, endDate: -1 })
      .limit(limit);

    // Paging items
    const paged = paging(trans, page, pageSize);

    // Send response
    resData = paged;
    resData.type = "Success";
    return res.json(resData);

    // If catch error
  } catch (error) {
    console.log(error);
    resData.type = "Error";
    resData.message = "Some errors in server - " + error.toString();
    return res.status(500).json(resData);
  }
};

// GET - /api/transaction/count
exports.getTransactionsCount = async (req, res, next) => {
  // Response data
  let resData = {};

  try {
    // Get transactions count
    const transCount = await Transaction.countDocuments({});

    // Send response
    resData.item = { transCount };
    resData.type = "Success";
    return res.json(resData);

    // If catch error
  } catch (error) {
    console.log(error);
    resData.type = "Error";
    resData.message = "Some errors in server - " + error.toString();
    return res.status(500).json(resData);
  }
};

// GET - /api/transaction/earnings
exports.getEarnings = async (req, res, next) => {
  // Response data
  let resData = {};

  try {
    // Get all transactions
    const trans = await Transaction.find();
    const lastTran = await Transaction.findOne().sort("-startDate").limit(1);
    const firstTran = await Transaction.findOne().sort("startDate").limit(1);

    // Total earnings
    const totalEarnings = trans.reduce((total, tran) => total + tran.price, 0);
    // Total time (millisecond)
    const totalTime =
      lastTran && firstTran
        ? new Date(lastTran.startDate).getTime() -
          new Date(firstTran.startDate).getTime()
        : 0;

    // Send response
    resData.item = { totalEarnings, totalTime };
    resData.type = "Success";
    return res.json(resData);

    // If catch error
  } catch (error) {
    console.log(error);
    resData.type = "Error";
    resData.message = "Some errors in server - " + error.toString();
    return res.status(500).json(resData);
  }
};
