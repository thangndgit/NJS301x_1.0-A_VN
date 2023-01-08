import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import MailList from "../../components/mailList/MailList";
import API from "../../constants/api";
import { toUpperFirstCase } from "../../utils/string";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [items, setItems] = useState([]);

  // Handle for searching action
  const handleSearch = () => {
    // Create search body
    const searchBody = {
      ...options,
      address: destination,
      startDate: date[0].startDate,
      endDate: date[0].endDate,
    };

    // Fetch data
    fetch(API.POST_HOTEL_SEARCH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(searchBody),
    })
      .then((res) => res.json())
      .then((data) => {
        // If some error occur
        if (data.type === "Error") alert(data.message);
        // If everything is fine
        else {
          setItems(data.items);
          alert(`${data.items.length} items found!`);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      })
      .catch((err) => console.log(err));
  };

  // First search when access this page
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(handleSearch, []);

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input
                placeholder={destination}
                type="text"
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    onChange={(e) =>
                      setOptions({
                        ...options,
                        minPrice: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    onChange={(e) =>
                      setOptions({
                        ...options,
                        maxPrice: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                    onChange={(e) =>
                      setOptions({ ...options, adult: e.target.value })
                    }
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                    onChange={(e) =>
                      setOptions({ ...options, children: e.target.value })
                    }
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                    onChange={(e) =>
                      setOptions({ ...options, room: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="listResult">
            {items.map((item) => (
              <SearchItem
                key={item._id}
                name={item.name}
                distance={`${item.distance} meters`}
                tag={toUpperFirstCase(item.type)}
                type={toUpperFirstCase(item.type)}
                description={item.desc}
                free_cancel={true}
                price={item.cheapestPrice}
                rate={item.rating}
                rate_text="Excellent"
                img_url={item.photos[0]}
                hotel_id={item._id}
              />
            ))}
          </div>
        </div>
      </div>
      <MailList />
      <Footer />
    </div>
  );
};

export default List;
