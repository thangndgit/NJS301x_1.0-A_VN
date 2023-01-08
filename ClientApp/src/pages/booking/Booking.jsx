import "./booking.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../constants/api";
import { DateRange } from "react-date-range";

const Booking = () => {
  const [item, setItem] = useState({ rooms: [{ roomNumbers: [] }] });
  const [bookedRooms, setBookedRooms] = useState([]);
  const [duration, setDuration] = useState(1);
  const [bill, setBill] = useState(0);
  const [input, setInput] = useState({});
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const paymentRef = useRef();

  const params = useParams();
  const hotelId = params.hotelId;

  const navigate = useNavigate();

  useEffect(() => {
    const searchBody = {
      hotelId,
      startDate: date[0].startDate,
      endDate: date[0].endDate,
    };

    fetch(API.POST_FREE_ROOMS_SEARCH, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(searchBody),
    })
      .then((res) => res.json())
      .then((data) => setItem(data.item));
  }, [date, hotelId]);

  const handleCheckBoxChange = (event) => {
    const checkBox = event.target;
    const roomNumber = Number(checkBox.name);
    const roomPrice = Number(checkBox.value);

    if (checkBox.checked) {
      setBill(bill + roomPrice * duration);
      setBookedRooms([...bookedRooms, roomNumber]);
    } else {
      setBill(bill - roomPrice * duration);
      setBookedRooms(bookedRooms.filter((rn) => rn !== roomNumber));
    }
  };

  const handleDateRangeChange = (item) => {
    const startDate = item.selection.startDate.getDate();
    const endDate = item.selection.endDate.getDate();
    const newDuration = endDate - startDate + 1;
    setDate([item.selection]);
    setDuration(newDuration);
    setBookedRooms([]);
    setBill(0);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (bill === 0) {
      alert("You need to choose some rooms to continue!");
      return;
    }

    const submitBody = {
      hotel: hotelId,
      rooms: bookedRooms,
      startDate: date[0].startDate.toISOString(),
      endDate: date[0].endDate.toISOString(),
      price: bill,
      payment: paymentRef.current.value,
    };

    if (new Date().getTime() < date[0].startDate.getTime())
      submitBody.status = "Booked";
    else submitBody.status = "Check in";

    fetch(API.POST_CREATE_TRANSACTION, {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitBody),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        navigate("/transactions");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="bookingContainer">
        <form className="bookingWrapper" onSubmit={handleSubmitForm}>
          <div className="bookingTop">
            <div className="bookingTopLeft">
              <h1
                className="bookingTitle"
                style={{ marginTop: "0", marginBottom: "15px" }}
              >
                {item.name}
              </h1>
              <span className="bookingDesc">{item.desc}</span>
            </div>
            <div className="bookingTopRight">
              <div className="bookingPrice">
                <h2>
                  <b>From ${item.cheapestPrice}</b> (1 night)
                </h2>
                <button>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <div className="bookingInput">
            <div className="bookingInputDate">
              <h1 className="bookingTitle" style={{ marginBottom: "15px" }}>
                Dates
              </h1>
              <DateRange
                onChange={handleDateRangeChange}
                minDate={new Date()}
                ranges={date}
              />
            </div>
            <div className="bookingInputInfo">
              <h1 className="bookingTitle" style={{ marginBottom: "15px" }}>
                Reserve info
              </h1>
              <label>Your Full Name:</label>
              <input
                type="text"
                placeholder="Full Name"
                required
                onChange={(e) => setInput({ ...input, name: e.target.value })}
              />
              <label>Your Email:</label>
              <input
                type="email"
                placeholder="Email"
                required
                onChange={(e) => setInput({ ...input, email: e.target.value })}
              />
              <label>Your Phone Number:</label>
              <input
                type="text"
                placeholder="Phone Number"
                required
                onChange={(e) => setInput({ ...input, phone: e.target.value })}
              />
              <label>Your Identity Card Number:</label>
              <input
                type="text"
                placeholder="Card Number"
                required
                onChange={(e) => setInput({ ...input, card: e.target.value })}
              />
            </div>
          </div>
          <h1 className="bookingTitle">Select Rooms</h1>
          <div className="bookingRooms">
            {item.rooms.map(
              (room, index) =>
                room.roomNumbers.length !== 0 && (
                  <div className="bookingRoom" key={index}>
                    <div className="bookingRoomLeft">
                      <div className="bookingRoomName">
                        <b>{room.title}</b>
                      </div>
                      <div className="bookingRoomDesc">{room.desc}</div>
                      <div className="bookingRoomPeople">
                        Max people: <b>{room.maxPeople}</b>
                      </div>
                      <div className="bookingRoomPrice">
                        Price: <b>${room.price}</b>
                      </div>
                    </div>
                    <div className="bookingRoomRight">
                      {room.roomNumbers.map((rn, index) => (
                        <div className="bookingRoomCheckBox" key={index}>
                          <span>{rn}</span>
                          <input
                            type="checkbox"
                            name={rn}
                            value={room.price}
                            onChange={handleCheckBoxChange}
                            checked={bookedRooms.includes(rn)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )
            )}
          </div>
          <div className="bookingBill">
            <h1 className="bookingTitle">Total Bill: ${bill}</h1>
          </div>
          <div className="bookingReserve">
            <select
              className="bookingPayment"
              required
              ref={paymentRef}
              defaultValue=""
            >
              <option value="" disabled>
                Select Payment Method
              </option>
              <option value="Credit card">Credit Card</option>
              <option value="Cash">Cash</option>
            </select>
            <button className="bookingBtn" type="submit">
              Reserve or Book Now!
            </button>
          </div>
        </form>
      </div>
      <MailList />
      <Footer />
    </div>
  );
};

export default Booking;
