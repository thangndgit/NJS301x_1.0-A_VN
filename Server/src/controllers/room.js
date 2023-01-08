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
const hotel = require("../models/hotel");

// GET - /api/room/get-all
exports.getAllRooms = async (req, res, next) => {
  // Response data
  let resData = {};

  // Get number of rooms client want to get
  const limit = Number(req.query.limit) || 1000;
  // Get page
  const page = Number(req.query.page) || 1;
  // Get page size
  const pageSize = Number(req.query.pageSize) || 8;

  try {
    // Get all rooms
    const rooms = await Room.find().limit(limit);

    // Paging items
    const paged = paging(rooms, page, pageSize);

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

// GET - /api/room/get-by-id
exports.getRoomById = (req, res, next) => {
  // Create response data
  const resData = {};

  // Get hotelId query
  const roomId = req.query.roomId;

  // Send back query to client
  resData.query = { roomId };

  // Get hotel
  Room.findById(roomId)
    .then((room) => {
      // If hotel with given id not found
      if (!room) {
        resData.type = "Error";
        resData.message = "No room found";
        return res.status(404).json(resData);
      }

      // Send data to client
      resData.type = "Success";
      resData.item = room;
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

// GET - /api/room/get-non-attached
exports.getNonAttachedRooms = async (req, res, next) => {
  // Response data
  const resData = {};

  // Get rooms and hotels, then get non attached rooms
  try {
    // Get hotels and rooms
    const hotels = await Hotel.find({}, "rooms");
    const rooms = await Room.find();

    // Reduce from hotels attached rooms
    let attached = hotels.reduce((arr, hotel) => [...arr, ...hotel.rooms], []);

    // Convert all room id to string
    attached = attached.map((roomId) => roomId.toString());

    // Filter from rooms to get non attached rooms
    const nonAttached = rooms.filter(
      (room) => !attached.includes(room._id.toString())
    );

    // Send response
    resData.type = "Success";
    resData.items = nonAttached;
    return res.json(resData);

    // If catch error
  } catch (error) {
    console.log(error);
    resData.type = "Error";
    resData.message = "Some errors in server - " + error.toString();
    return res.status(500).json(resData);
  }
};

// POST - /api/room/create
exports.postCreateRoom = async (req, res, next) => {
  // Response data
  const resData = {};

  // Get data
  const roomData = req.body.room;
  const hotelId = req.body.hotelId;

  try {
    if (hotelId !== "") {
      // Get hotel
      const hotel = await Hotel.findById(hotelId).populate("rooms");

      // Get room numbers
      const roomNumbers = hotel.rooms.reduce(
        (rns, room) => [...rns, ...room.roomNumbers],
        []
      );

      // Duplicate room numbers
      const duplicateRoomNumbers = [];
      roomData.roomNumbers.forEach((rn) => {
        if (roomNumbers.includes(rn)) duplicateRoomNumbers.push(rn);
      });

      // If some room numbers is duplicate
      if (duplicateRoomNumbers.length > 0) {
        resData.type = "Error";
        resData.message = `Room number ${duplicateRoomNumbers.join(
          ", "
        )} already exists in ${
          hotel.name
        } hotel, please enter another room number.`;
        return res.status(400).json(resData);
      }
    }

    // If everything is fine, create hotel and add it to hotel
    const room = await Room.create(roomData);
    if (hotelId !== "")
      await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: room._id } });

    // Send response
    resData.type = "Success";
    resData.message = "Create room successfully";
    return res.json(resData);

    // If catch error
  } catch (error) {
    console.log(error);
    resData.type = "Error";
    resData.message = "Some errors in server - " + error.toString();
    return res.status(500).json(resData);
  }
};

// POST - /api/room/update-by-id
exports.postUpdateRoomById = async (req, res, next) => {
  // Response data
  const resData = {};

  // Get data
  const roomData = req.body.room;
  const hotelId = req.body.hotelId;
  const preHotelId = req.body.preHotelId;

  try {
    if (hotelId !== "" && hotelId !== preHotelId) {
      // Get hotel
      const hotel = await Hotel.findById(hotelId).populate("rooms");
      const prevHotel = await Hotel.findOne({
        rooms: new ObjectId(roomData._id),
      });

      // Get room numbers
      const roomNumbers = hotel.rooms.reduce(
        (rns, room) => [...rns, ...room.roomNumbers],
        []
      );

      // Duplicate room numbers
      const duplicateRoomNumbers = [];
      roomData.roomNumbers.forEach((rn) => {
        if (roomNumbers.includes(rn)) duplicateRoomNumbers.push(rn);
      });

      // If some room numbers is duplicate
      if (duplicateRoomNumbers.length > 0) {
        resData.type = "Error";
        resData.message = `Room number ${duplicateRoomNumbers.join(
          ", "
        )} already exists in ${
          hotel.name
        } hotel, please enter another room number.`;
        return res.status(400).json(resData);
      }
    }

    // If everything is fine, create hotel and add it to hotel
    const room = await Room.findByIdAndUpdate(roomData._id, roomData);
    // Remove it from old hotel
    if (preHotelId !== "")
      await Hotel.findByIdAndUpdate(preHotelId, { $pull: { rooms: room._id } });
    // Add it to new hotel
    if (hotelId !== "")
      await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: room._id } });

    // Send response
    resData.type = "Success";
    resData.message = "Update room successfully";
    return res.json(resData);

    // If catch error
  } catch (error) {
    console.log(error);
    resData.type = "Error";
    resData.message = "Some errors in server - " + error.toString();
    return res.status(500).json(resData);
  }
};

// POST - /api/room/delete-by-id
exports.postDeleteRoomById = async (req, res, next) => {
  // Response data
  const resData = {};

  // Get id of room need to delete
  const roomId = req.body.roomId;

  try {
    // Update transactions status
    await updateTransactionStatus();

    // Get hotels of this room
    const hotel = await Hotel.findOne({ rooms: new ObjectId(roomId) }).populate(
      "rooms"
    );

    // Get this room
    const room = hotel.rooms.find((room) => room._id.toString() === roomId);

    // Get transactions has status check in or booked of this hotel
    const trans = await Transaction.find({
      hotel: hotel._id,
      $or: [{ status: "Check in" }, { status: "Booked" }],
    });

    // Get room numbers of these transactions
    const roomNumbers = trans.reduce(
      (rns, tran) => [...rns, ...tran.rooms],
      []
    );

    // If room to delete has room number in list of check in or booked room number
    if (room.roomNumbers.some((rn) => roomNumbers.includes(rn))) {
      resData.type = "Error";
      resData.message =
        "This room cannot be deleted because it is currently rented.";
      return res.status(400).json(resData);
    }

    // If everything is fine, delete room in hotel
    await Hotel.findByIdAndUpdate(hotel._id, {
      $pullAll: { rooms: [room._id] },
    });

    // Delete room
    await Room.findByIdAndDelete(room._id);

    // Send response
    resData.type = "Success";
    resData.message = "Delete room successfully";
    return res.json(resData);

    // Catch error
  } catch (error) {
    resData.type = "Error";
    resData.message = "Some error occur in server - " + error.toString();
    return res.status(500).json(resData);
  }
};
