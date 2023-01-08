// Import base
const { ObjectId } = require("mongodb");

// Import model
const Hotel = require("../models/hotel");
const Room = require("../models/room");
const Transaction = require("../models/transaction");

// Import util
const { compStandard, toStandard } = require("../utils/string");
const { groupBy } = require("../utils/array");
const paging = require("../utils/paging");
const { updateTransactionStatus } = require("./transaction");

// Function to get cheapest price of hotel
const getCheapestPrice = (hotel) => {
  return hotel.rooms.reduce(
    (cheapest, room) => Math.min(cheapest, room.price),
    999999
  );
};

// GET - /api/hotel/get-all
exports.getAllHotels = async (req, res, next) => {
  // Response data
  let resData = {};

  // Get number of users client want to get
  const limit = Number(req.query.limit) || 1000;
  // Get page
  const page = Number(req.query.page) || 1;
  // Get page size
  const pageSize = Number(req.query.pageSize) || 8;

  try {
    // Get all users
    const hotels = await Hotel.find().limit(limit);

    // Paging items
    const paged = paging(hotels, page, pageSize);

    // Get cheapest price
    paged.items = paged.items.map((item) => {
      const tmpItem = item.toObject();
      tmpItem.cheapestPrice = getCheapestPrice(tmpItem);
      return tmpItem;
    });

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

// GET - /api/hotel/get-by-id
exports.getHotelById = (req, res, next) => {
  // Create response data
  const resData = {};

  // Get hotelId query
  const hotelId = req.query.hotelId;

  // Send back query to client
  resData.query = { hotelId };

  // Get hotel
  Hotel.findById(hotelId)
    .populate("rooms")
    .then((hotel) => {
      // If hotel with given id not found
      if (!hotel) {
        resData.type = "Error";
        resData.message = "No hotel found";
        return res.status(404).json(resData);
      }

      // Convert hotel to object
      const hotelObj = hotel.toObject();

      // Get cheapest price
      hotelObj.cheapestPrice = getCheapestPrice(hotelObj);

      // Send data to client
      resData.type = "Success";
      resData.item = hotelObj;
      res.json(resData);
    })
    // If catch some error
    .catch((err) => {
      console.log(err);
      resData.type = "Error";
      resData.message = "Some errors occur in the server: " + err.toString();
      return res.status(500).json(resData);
    });
};

// GET - /api/hotel/count
exports.getHotelCount = (req, res, next) => {
  // Create response data
  const resData = {};

  // Valid groupBy list
  const validGroupBy = ["city", "type"];

  // Get groupBy query
  let groupBy = req.query.groupBy;

  // If query is not valid
  if (!validGroupBy.includes(groupBy)) groupBy = validGroupBy[0];

  // Set valid query to response data
  resData.query = { groupBy };

  // Get all hotels
  Hotel.find()
    .then((hotels) => {
      // Create count items
      const countItems = [];

      // If group by city
      if (groupBy === "city") {
        // Count hotels in Ha Noi
        countItems.push({
          name: "Ha Noi",
          count: hotels.filter((h) => compStandard(h.city, "Ha Noi")).length,
        });

        // Count hotels in Ho Chi Minh
        countItems.push({
          name: "Ho Chi Minh",
          count: hotels.filter((h) => compStandard(h.city, "Ho Chi Minh"))
            .length,
        });

        // Count hotels in Ha Noi
        countItems.push({
          name: "Da Nang",
          count: hotels.filter((h) => compStandard(h.city, "Da Nang")).length,
        });
      }

      // If group by type
      else if (groupBy === "type") {
        // Count hotels
        countItems.push({
          name: "Hotel",
          count: hotels.filter((h) => compStandard(h.type, "Hotel")).length,
        });

        // Count apartments
        countItems.push({
          name: "Apartment",
          count: hotels.filter((h) => compStandard(h.type, "Apartment")).length,
        });

        // Count resorts
        countItems.push({
          name: "Resort",
          count: hotels.filter((h) => compStandard(h.type, "Resort")).length,
        });

        // Count villas
        countItems.push({
          name: "Villa",
          count: hotels.filter((h) => compStandard(h.type, "Villa")).length,
        });

        // Count cabins
        countItems.push({
          name: "Cabin",
          count: hotels.filter((h) => compStandard(h.type, "Cabin")).length,
        });
      }

      // Set data end send response
      resData.type = "Success";
      resData.items = countItems;
      return res.json(resData);
    })
    // If catch some error
    .catch((err) => {
      console.log(err);
      resData.type = "Error";
      resData.message = "Some errors occur in the server: " + err.toString();
      return res.status(500).json(resData);
    });
};

// GET - /api/hotel/top-rate
exports.getHotelTopRate = (req, res, next) => {
  // Create response data
  const resData = {};

  // Get query
  const top = Number(req.query.top) || 3;
  resData.query = { top };

  // Get hotels
  Hotel.find()
    .find()
    .populate("rooms")
    .sort("-rating")
    .limit(top)
    .then((hotels) => {
      // Convert hotels to array of object
      const hotelsObj = hotels.map((hotel) => {
        // Convert hotel to object
        const hotelObj = hotel.toObject();
        // Get cheapest price
        hotelObj.cheapestPrice = getCheapestPrice(hotelObj);
        // Return
        return hotelObj;
      });

      // Set and send response
      resData.type = "Success";
      resData.items = hotelsObj;
      return res.json(resData);
    })
    // If catch some error
    .catch((err) => {
      console.log(err);
      resData.type = "Error";
      resData.message = "Some errors occur in the server: " + err.toString();
      return res.status(500).json(resData);
    });
};

// POST - /api/hotel/create
exports.postCreateHotel = async (req, res, next) => {
  // Response data
  const resData = {};

  // Get hotel data
  const hotelData = req.body;

  try {
    // Create hotel
    await Hotel.create(hotelData);

    // Send response
    resData.type = "Success";
    resData.message = "Create hotel successfully!";
    return res.json(resData);

    // If catch error
  } catch (error) {
    console.log(error);
    resData.type = "Error";
    resData.message = "Some errors in server - " + error.toString();
    return res.status(500).json(resData);
  }
};

// POST - /api/hotel/update-by-id
exports.postUpdateHotelById = async (req, res, next) => {
  // Response data
  const resData = {};

  // Get hotel data
  const hotelData = req.body;
  const hotelId = hotelData._id;
  delete hotelData.__v;
  delete hotelData._id;

  try {
    // Create hotel
    await Hotel.findByIdAndUpdate(hotelId, hotelData);

    // Send response
    resData.type = "Success";
    resData.message = "Update hotel successfully!";
    return res.json(resData);

    // If catch error
  } catch (error) {
    console.log(error);
    resData.type = "Error";
    resData.message = "Some errors in server - " + error.toString();
    return res.status(500).json(resData);
  }
};

// POST - /api/hotel/search
exports.postHotelSearch = async (req, res, next) => {
  // Create response data
  const resData = {};

  // Get search option
  let address = req.body.address || "";
  let startDate = new Date(req.body.startDate);
  let endDate = new Date(req.body.endDate);
  let adult = req.body.adult || 1;
  let children = req.body.children || 0;
  let room = req.body.room || 1;
  let minPrice = req.body.minPrice || 1;
  let maxPrice = req.body.maxPrice || 999999;

  // Fix type
  address = toStandard(address);
  adult = parseInt(adult);
  children = parseInt(children);
  room = parseInt(room);
  minPrice = Number(minPrice);
  maxPrice = Number(maxPrice);

  // Set options to send back to client
  resData.options = {
    address,
    startDate,
    endDate,
    adult,
    children,
    room,
    minPrice,
    maxPrice,
  };

  let hotels;
  let trans;

  // Get all hotels and transactions
  try {
    hotels = await Hotel.find().populate("rooms").exec();
    trans = await Transaction.find();
  } catch (err) {
    // If catch error
    console.log(err);
    resData.type = "Error";
    resData.message = "Some errors occur in server - " + err.toString();
    return res.status(500).json(resData);
  }

  // Get transactions contain busy room
  trans = trans.filter(
    (tran) =>
      tran.startDate.getTime() <= endDate.getTime() &&
      tran.endDate.getTime() >= startDate.getTime()
  );

  // Group transaction by hotelId
  transObj = groupBy(trans, "hotel");

  // Create busy rooms object
  const busyHotels = {};

  // Loop through object key (hotelId)
  for (let key of Object.keys(transObj)) {
    // Merge room numbers in transactions by key (hotelId)
    busyHotels[key] = transObj[key].reduce((rns, tran) => {
      rns.push(...tran.rooms);
      return rns;
    }, []);
  }

  // Remove busy rooms from available rooms of all hotels
  hotels.forEach((hotel) => {
    // Get busy rooms
    const busyRooms = busyHotels[hotel._id];
    // If there is no busy rooms, skip this part
    if (!busyRooms) return;
    // If there are busy rooms, loop through rooms of hotel
    hotel.rooms.forEach((room) => {
      // Filter room numbers that are not busy
      room.roomNumbers = room.roomNumbers.filter(
        (rn) => !busyRooms.includes(rn)
      );
    });
  });

  // Split address
  const addrTokens = address.split(" ");

  // Filter hotel by address
  hotels = hotels.filter((hotel) => {
    return (
      addrTokens.every((token) => toStandard(hotel.address).includes(token)) ||
      addrTokens.every((token) => toStandard(hotel.city).includes(token)) ||
      addrTokens.every((token) => toStandard(hotel.name).includes(token))
    );
  });

  // Filter hotel by number of people and rooms
  hotels = hotels.filter((hotel) => {
    // Calculate total rooms
    const totalRooms = hotel.rooms.reduce(
      (tp, room) => tp + room.roomNumbers.length,
      0
    );
    // Calculate total people
    const totalPeople = hotel.rooms.reduce(
      (tp, room) => tp + room.roomNumbers.length * room.maxPeople,
      0
    );

    return totalRooms >= room && totalPeople >= adult + children;
  });

  // Filter hotel by price
  hotels = hotels.filter((hotel) => {
    // Get max price of one room in hotel
    const hotelMaxPrice = hotel.rooms.reduce(
      (max, room) => (max >= room.price ? max : room.price),
      -999999
    );
    // Get min price of one room in hotel
    const hotelMinPrice = hotel.rooms.reduce(
      (min, room) => (min <= room.price ? min : room.price),
      999999
    );

    return hotelMaxPrice <= maxPrice && hotelMinPrice >= minPrice;
  });

  // Get cheapest price
  hotels = hotels.map((item) => {
    const tmpItem = item.toObject();
    tmpItem.cheapestPrice = getCheapestPrice(tmpItem);
    return tmpItem;
  });

  resData.type = "Success";
  resData.items = hotels;

  return res.json(resData);
};

// POST - /api/hotel/search/free-rooms
exports.postFreeRoomsSearch = async (req, res, next) => {
  // Create response data
  const resData = {};

  // Get search option
  const hotelId = req.body.hotelId;
  const startDate = new Date(req.body.startDate);
  const endDate = new Date(req.body.startDate);

  // Send back option to client
  resData.options = { hotelId, startDate, endDate };

  let hotel;
  let trans;

  // Get hotel by id and all transactions
  try {
    hotel = await Hotel.findById(hotelId).populate("rooms").exec();
    trans = await Transaction.find();
  } catch (err) {
    // If catch some error
    console.log(err);
    resData.type = "Error";
    resData.message = "Some errors occur in the server: " + err.toString();
    return res.status(500).json(resData);
  }

  // If hotel with given hotel id is not exist
  if (!hotel) {
    (resData.type = "Error"), (resData.message = "Hotel not found");
    return res.status(404).json(resData);
  }

  // Filter transactions to get transactions of this hotel
  trans = trans.filter((tran) => tran.hotel.toString() === hotelId);

  // Filter transaction by date
  trans = trans.filter(
    (tran) =>
      tran.startDate.getTime() <= endDate.getTime() &&
      tran.endDate.getTime() >= startDate.getTime()
  );

  // Get busy rooms in this hotel
  const busyRooms = trans.reduce((rns, tran) => {
    rns.push(...tran.rooms);
    return rns;
  }, []);

  // Filter room numbers that are not busy
  hotel.rooms.forEach((room) => {
    room.roomNumbers = room.roomNumbers.filter((rn) => !busyRooms.includes(rn));
  });

  const objHotel = hotel.toObject();
  objHotel.cheapestPrice = getCheapestPrice(objHotel);

  resData.type = "Success";
  resData.item = objHotel;

  return res.json(resData);
};

// POST - /api/hotel/delete-by-id
exports.postDeleteHotelById = async (req, res, next) => {
  // Response data
  const resData = {};

  // Get id of hotel need to delete
  const hotelId = req.body.hotelId;

  try {
    // Update transactions status
    await updateTransactionStatus();

    // Get transaction that in state booked or check in of this hotel
    const trans = await Transaction.find({
      hotel: new ObjectId(hotelId),
      $or: [{ status: "Check in" }, { status: "Booked" }],
    });

    // If this hotel is serving someone
    if (trans.length > 0) {
      resData.type = "Error";
      resData.message =
        "This hotel cannot be deleted. The hotel has rooms that are currently rented.";
      return res.status(400).json(resData);
    }

    // If every thing is fine, delete hotel
    await Hotel.findByIdAndDelete(hotelId);

    // Delete transactions has hotel reference
    await Transaction.remove({ hotel: new ObjectId(hotelId) });

    resData.type = "Success";
    resData.message = "Delete hotel successfully.";
    return res.json(resData);

    // Catch error
  } catch (error) {
    resData.type = "Error";
    resData.message = "Some error occur in server - " + err.toString();
    return res.status(500).json(resData);
  }
};
