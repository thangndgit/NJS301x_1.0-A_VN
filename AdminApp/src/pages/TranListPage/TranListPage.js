import { useCallback, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import API from "../../constants/api";

import PageLayout from "../../layouts/PageLayout/PageLayout";
import Table from "../../layouts/TableLayout/TableLayout";
import { toDDMMYYYY } from "../../utils/date";
import { compStandard } from "../../utils/string";
import "./TranListPage.css";

const TranListPage = () => {
  // Transactions list
  const [trans, setTrans] = useState([]);

  // onFetch function to pass to pagination
  const fetchPage = useCallback((page, callback) => {
    // Get transactions
    fetch(API.GET_LATEST_TRANSACTIONS + "?page=" + page)
      // Convert response to json data
      .then((res) => res.json())
      // Apply data
      .then((data) => {
        setTrans(data.items);
        return data;
      })
      // Run callback
      .then((data) => callback(data))
      // Catch error
      .catch((err) => console.log(err));
  }, []);

  return (
    <PageLayout>
      <div className="tran-list-page">
        <Table title="Transactions List" hasAdd={false}>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>ID</th>
              <th>User</th>
              <th>Hotel</th>
              <th>Room</th>
              <th>Date</th>
              <th>Price</th>
              <th>Payment Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {trans.map((tran, index) => (
              <tr key={index}>
                <th>
                  <input type="checkbox" />
                </th>
                <td>{tran._id}</td>
                <td>{tran.user.fullName}</td>
                <td>{tran.hotel.name}</td>
                <td>{[tran.rooms.join(", ")]}</td>
                <td>
                  {toDDMMYYYY(tran.startDate) +
                    " - " +
                    toDDMMYYYY(tran.endDate)}
                </td>
                <td>${tran.price}</td>
                <td>{tran.payment}</td>
                <td>
                  {compStandard(tran.status, "Booked") && (
                    <div className="booking-status booked">Booked</div>
                  )}
                  {compStandard(tran.status, "Check in") && (
                    <div className="booking-status check-in">Check in</div>
                  )}
                  {compStandard(tran.status, "Check out") && (
                    <div className="booking-status check-out">Check out</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={9}>
                <Pagination onFetch={fetchPage} />
              </td>
            </tr>
          </tfoot>
        </Table>
      </div>
    </PageLayout>
  );
};

export default TranListPage;
