import { useEffect, useState } from "react";
import "./featured.css";
import API from "../../constants/api";

const Featured = () => {
  const [items, setItems] = useState([]);

  const images = [
    "https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o=",
    "https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o=",
    "https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o=",
  ];

  useEffect(() => {
    fetch(API.GET_HOTEL_COUNT + "?groupBy=city")
      .then((res) => res.json())
      .then((data) => {
        if (data.type === "Error") alert(data.message);
        else setItems(data.items);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="featured">
      {items.map((item, index) => (
        <div className="featuredItem" key={index}>
          <img src={images[index]} alt="" className="featuredImg" />
          <div className="featuredTitles">
            <h1>{item.name}</h1>
            <h2>{item.count} properties</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Featured;
