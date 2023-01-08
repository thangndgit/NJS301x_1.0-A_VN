import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../constants/api";

const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({});
  const [photos, setPhotos] = useState([]);

  const navigate = useNavigate();
  const params = useParams();
  const hotelId = params.hotelId;

  useEffect(() => {
    fetch(API.GET_HOTEL_BY_ID + "?hotelId=" + hotelId)
      .then((res) => res.json())
      .then((data) => {
        if (data.type === "Error") alert(data.message);
        else {
          setItem(data.item);
          setPhotos(data.item.photos);
        }
      })
      .catch((err) => console.log(err));
  }, [hotelId]);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? photos.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === photos.length - 1 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleBooking = () => {
    navigate(`/booking/${hotelId}`);
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={photos[slideNumber]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <button className="bookNow" onClick={handleBooking}>
            Reserve or Book Now!
          </button>
          <h1 className="hotelTitle">{item.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{item.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent location – {item.distance} meters from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over ${item.cheapestPrice} at this property and get a
            free airport taxi
          </span>
          <div className="hotelImages">
            {photos.map((photo, i) => (
              <img
                onClick={() => handleOpen(i)}
                src={photo}
                alt=""
                className="hotelImg"
                key={i}
              />
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{item.name}</h1>
              <p className="hotelDesc">{item.desc}</p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a 1 night stay!</h1>
              <span>
                Located in the real heart of {item.city}, this property has an
                excellent location score of {item.rating}!
              </span>
              <h2>
                <b>From ${item.cheapestPrice}</b> (1 night)
              </h2>
              <button onClick={handleBooking}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;
