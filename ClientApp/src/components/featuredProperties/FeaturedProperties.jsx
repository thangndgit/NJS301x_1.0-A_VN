import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../constants/api";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(API.GET_HOTEL_TOP_RATE)
      .then((res) => res.json())
      .then((data) => setItems(data.items))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="fp">
      {items.map((item, index) => (
        <div className="fpItem" key={index}>
          <img src={item.photos[0]} alt="" className="fpImg" />
          <span className="fpName">
            <Link to={`/hotels/${item._id}`}>{item.name}</Link>
          </span>
          <span className="fpCity">{item.city}</span>
          <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
          <div className="fpRating">
            <button>{item.rating}</button>
            <span>Excellent</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProperties;
