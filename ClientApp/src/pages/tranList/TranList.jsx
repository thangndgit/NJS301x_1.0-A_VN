import "./tranList.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useContext, useEffect, useState } from "react";
import API from "../../constants/api";
import { AuthContext } from "../../contexts/AuthContext";
import { toDDMMYYYY } from "../../utils/date";
import { compStandard } from "../../utils/string";

const TranList = () => {
  const [items, setItems] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log("run");
    fetch(API.GET_TRANSACTION_BY_HOTEL_ID + `/${user._id}`)
      .then((res) => res.json())
      .then((data) => setItems(data.items))
      .catch((err) => console.log(err));
  }, [user._id]);

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="tranListContainer">
        <div className="tranListWrapper">
          <h1 className="tranListTitle">Your Transactions</h1>
          <table className="tranListTable">
            <tbody>
              <tr className="tranListTableHeader">
                <th>#</th>
                <th>Hotel</th>
                <th>Room</th>
                <th>Date</th>
                <th>Price</th>
                <th>Payment Method</th>
                <th>Status</th>
              </tr>
              {items.map((tran, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{tran.hotel.name || tran.hotel.title}</td>
                  <td>{tran.rooms.join(", ")}</td>
                  <td className="center">
                    {toDDMMYYYY(tran.startDate) +
                      " - " +
                      toDDMMYYYY(tran.endDate)}
                  </td>
                  <td className="center">${tran.price}</td>
                  <td className="center">{tran.payment}</td>
                  <td className="center">
                    {compStandard(tran.status, "booked") && (
                      <span className="status booked">Booked</span>
                    )}
                    {compStandard(tran.status, "check in") && (
                      <span className="status checkIn">Check in</span>
                    )}
                    {compStandard(tran.status, "check out") && (
                      <span className="status checkOut">Check out</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TranList;
