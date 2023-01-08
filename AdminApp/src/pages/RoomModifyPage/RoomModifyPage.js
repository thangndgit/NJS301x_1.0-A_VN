import PageLayout from "../../layouts/PageLayout/PageLayout";
import Form from "../../layouts/FormLayout/FormLayout";
import "./RoomModifyPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../constants/api";

const RoomModifyPage = ({ mode }) => {
  // Navigate function
  const navigate = useNavigate();

  // Default room info
  const defaultRoom = {
    desc: "",
    maxPeople: 1,
    price: 0,
    roomNumbers: [],
    title: "",
  };

  const [formTitle, setFormTitle] = useState("Modify Room");
  const [submitText, setSubmitText] = useState("Save Room");
  const [room, setRoom] = useState(defaultRoom);
  const [hotels, setHotels] = useState([]);
  const [hotelId, setHotelId] = useState("");
  const [preHotelId, setPreHotelId] = useState("");
  const [roomNumbers, setRoomNumbers] = useState("");

  // Get params
  const params = useParams();

  useEffect(() => {
    // If in edit mode
    if (mode === "edit") {
      // Set text
      setFormTitle("Edit Room");
      setSubmitText("Save Changes");

      // Get room to edit
      fetch(API.GET_ROOM_BY_ID + "?roomId=" + params.roomId)
        // Convert response to json data
        .then((res) => res.json())
        // Apply data
        .then((data) => {
          if (data.type === "Success") {
            setRoom(data.item);
            setRoomNumbers(data.item.roomNumbers.join(", "));
          } else alert(data.message);
        })
        // Catch error
        .catch((err) => console.log(err));
    }

    // If in add mode
    if (mode === "add") {
      // Set text
      setFormTitle("Add Room");
      setSubmitText("Add Room");
      setRoom(defaultRoom);
      setRoomNumbers("");
    }

    // Get all hotels
    fetch(API.GET_ALL_HOTELS)
      // Convert response to json
      .then((res) => res.json())
      // Set hotels
      .then((data) => {
        // Set hotels
        setHotels(data.items);

        // If in edit mode
        if (mode === "edit") {
          // Find hotel of room need to edit
          const hotel = data.items.find((hotel) =>
            hotel.rooms.includes(params.roomId)
          );

          // Set hotelId
          if (hotel) {
            setHotelId(hotel._id);
            setPreHotelId(hotel._id);
          }
        }

        // If in add mode
        if (mode === "add") {
          setHotelId("");
          setPreHotelId("");
        }
      })
      // Catch error
      .catch((err) => console.log(err));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, params.roomId]);

  // Handle when submit room form
  const handleSubmitForm = (e) => {
    // Prevent page reload
    e.preventDefault();

    // Set fetch url
    let fetchUrl = "";
    if (mode === "add") fetchUrl = API.POST_CREATE_ROOM;
    if (mode === "edit") fetchUrl = API.POST_UPDATE_ROOM_BY_ID;

    // Fetch
    fetch(fetchUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ room, hotelId, preHotelId }),
    })
      // Convert response to json
      .then((res) => res.json())
      // Process data
      .then((data) => {
        alert(data.message);
        if (data.type === "Success") navigate("/rooms");
      })
      // Catch error
      .catch((err) => console.log(err));
  };

  return (
    <PageLayout>
      <div className="room-modify-page">
        <Form title={formTitle} onSubmit={handleSubmitForm}>
          <div>
            <label>Title</label>
            <input
              type="text"
              placeholder="Enter the room title"
              value={room.title}
              onChange={(e) => setRoom({ ...room, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Description</label>
            <input
              type="text"
              placeholder="Enter the room description"
              value={room.desc}
              onChange={(e) => setRoom({ ...room, desc: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Price</label>
            <input
              type="number"
              min={0}
              placeholder="Enter the room price"
              value={room.price}
              onChange={(e) =>
                setRoom({ ...room, price: Number(e.target.value) })
              }
              required
            />
          </div>
          <div>
            <label>Max People</label>
            <input
              type="number"
              min={1}
              step={1}
              placeholder="Enter the max people"
              value={room.maxPeople}
              onChange={(e) =>
                setRoom({ ...room, maxPeople: Number(e.target.value) })
              }
              required
            />
          </div>
          <div>
            <label>Rooms</label>
            <input
              type="text"
              placeholder="Give comma between room numbers"
              value={roomNumbers}
              onChange={(e) => {
                setRoomNumbers(e.target.value);
                setRoom({
                  ...room,
                  roomNumbers: [
                    ...new Set(
                      e.target.value
                        .replace(" ", "")
                        .split(",")
                        .map((rn) => parseInt(rn))
                        .filter((rn) => !isNaN(rn))
                    ),
                  ],
                });
              }}
              required
            />
          </div>
          <div>
            <label>Hotel</label>
            <select
              value={hotelId}
              onChange={(e) => setHotelId(e.target.value)}
            >
              <option value="">Select hotel</option>
              {hotels.map((hotel) => (
                <option key={hotel._id} value={hotel._id}>
                  {hotel.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>&nbsp;</label>
            <button type="submit">{submitText}</button>
          </div>
        </Form>
      </div>
    </PageLayout>
  );
};

export default RoomModifyPage;
