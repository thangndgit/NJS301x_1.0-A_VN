import { useCallback, useEffect, useState } from "react";
import {
  RiMoneyDollarCircleLine,
  RiShoppingCartLine,
  RiUserLine,
  RiWallet3Line,
} from "react-icons/ri";
import Pagination from "../../components/Pagination/Pagination";
import API from "../../constants/api";

import PageLayout from "../../layouts/PageLayout/PageLayout";
import Table from "../../layouts/TableLayout/TableLayout";
import { toDDMMYYYY } from "../../utils/date";
import { compStandard } from "../../utils/string";
import "./HomePage.css";

const HomePage = () => {
  // Last 8 transactions
  const [trans, setTrans] = useState([]);

  // Dashboard data
  const [dashboard, setDashboard] = useState({
    users: 0,
    orders: 0,
    earnings: 0,
    balances: 0,
  });

  useEffect(() => {
    // Fetch dashboard function
    const fetchDashboard = async () => {
      try {
        // Response and data temp
        let tmpRes;
        let tmpData;
        let tmpDashboard = {};

        // Get users count
        tmpRes = await fetch(API.GET_USERS_COUNT);
        tmpData = await tmpRes.json();
        tmpDashboard.users = tmpData.item.usersCount;

        // Get transactions count
        tmpRes = await fetch(API.GET_TRANSACTIONS_COUNT);
        tmpData = await tmpRes.json();
        tmpDashboard.orders = tmpData.item.transCount;

        // Get earnings
        tmpRes = await fetch(API.GET_EARNINGS);
        tmpData = await tmpRes.json();
        tmpDashboard.earnings = tmpData.item.totalEarnings;
        tmpDashboard.balances =
          Math.min(
            tmpData.item.totalEarnings,
            Math.round(
              (tmpData.item.totalEarnings / tmpData.item.totalTime) *
                30 *
                24 *
                60 *
                60 *
                1000
            )
          ) || 0;

        // Set dashboard
        setDashboard(tmpDashboard);

        // If catch error
      } catch (error) {
        console.log(error);
      }
    };

    // Run fetch dashboard
    fetchDashboard();
  }, []);

  // onFetch function to pass to pagination
  const fetchPage = useCallback((page, callback) => {
    // Get transactions
    fetch(API.GET_LATEST_TRANSACTIONS + "?limit=8&page=" + page)
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
      <div className="home-page">
        <div className="info-list">
          <div className="info-item">
            <div className="info-item__title">USERS</div>
            <div className="info-item__value">{dashboard.users}</div>
            <div className="info-item__icon color-1">
              <RiUserLine />
            </div>
          </div>
          <div className="info-item">
            <div className="info-item__title">ORDERS</div>
            <div className="info-item__value">{dashboard.orders}</div>
            <div className="info-item__icon color-2">
              <RiShoppingCartLine />
            </div>
          </div>
          <div className="info-item">
            <div className="info-item__title">EARNINGS</div>
            <div className="info-item__value">$ {dashboard.earnings}</div>
            <div className="info-item__icon color-3">
              <RiMoneyDollarCircleLine />
            </div>
          </div>
          <div className="info-item">
            <div className="info-item__title">BALANCE</div>
            <div className="info-item__value">$ {dashboard.balances}</div>
            <div className="info-item__icon color-4">
              <RiWallet3Line />
            </div>
          </div>
        </div>
        <Table title="Latest Transactions" hasAdd={false}>
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

export default HomePage;
