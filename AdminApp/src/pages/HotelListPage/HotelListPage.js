import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import API from "../../constants/api";

import PageLayout from "../../layouts/PageLayout/PageLayout";
import Table from "../../layouts/TableLayout/TableLayout";
import { toUpperFirstCase } from "../../utils/string";
import "./HotelListPage.css";

const HotelListPage = () => {
  // Navigate function
  const navigate = useNavigate();

  // Last 8 hotels
  const [hotels, setHotels] = useState([]);

  // onFetch function to pass to pagination
  const fetchPage = useCallback((page, callback) => {
    // Get hotels
    fetch(API.GET_ALL_HOTELS + "?page=" + page)
      // Convert response to json data
      .then((res) => res.json())
      // Apply data
      .then((data) => {
        setHotels(data.items);
        return data;
      })
      // Run callback
      .then((data) => callback(data))
      // Catch error
      .catch((err) => console.log(err));
  }, []);

  // Handle when click add hotel
  const handleAddHotel = () => {
    navigate("/hotels/add");
  };

  // Handle when click edit hotel
  const handleEditHotel = (hotelId) => {
    navigate(`/hotels/edit/${hotelId}`);
  };

  // Handle when click delete hotel
  const handleDeleteHotel = (hotelId) => {
    // Ask user to delete hotel
    const sureToDelete = window.confirm(
      "Are you sure you want to delete this hotel?"
    );

    // If user press ok
    if (sureToDelete) {
      // Delete hotel
      fetch(API.POST_DELETE_HOTEL_BY_ID, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hotelId }),
      })
        // Convert response to json
        .then((res) => res.json())
        // Process return data
        .then((data) => {
          alert(data.message);
          // If success, reload to update
          if (data.type === "Success") window.location.reload();
        })
        // Catch error
        .catch((err) => console.log(err));
    }
  };

  return (
    <PageLayout>
      <div className="hotel-list-page">
        <Table title="Hotels List" hasAdd={true} onAdd={handleAddHotel}>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Address</th>
              <th>City</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel) => (
              <tr key={hotel._id}>
                <th>
                  <input type="checkbox" />
                </th>
                <td>{hotel._id}</td>
                <td>{hotel.name}</td>
                <td>{toUpperFirstCase(hotel.type)}</td>
                <td>{hotel.address}</td>
                <td>{hotel.city}</td>
                <td>
                  <div className="action-list">
                    <button
                      className="btn-edit"
                      onClick={() => handleEditHotel(hotel._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteHotel(hotel._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={7}>
                <Pagination onFetch={fetchPage} />
              </td>
            </tr>
          </tfoot>
        </Table>
      </div>
    </PageLayout>
  );
};

export default HotelListPage;
