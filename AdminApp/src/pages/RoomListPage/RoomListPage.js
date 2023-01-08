import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import API from "../../constants/api";

import PageLayout from "../../layouts/PageLayout/PageLayout";
import Table from "../../layouts/TableLayout/TableLayout";
import "./RoomListPage.css";

const RoomListPage = () => {
  // Navigate function
  const navigate = useNavigate();

  // Rooms list
  const [rooms, setRooms] = useState([]);

  // onFetch function to pass to pagination
  const fetchPage = useCallback((page, callback) => {
    // Get hotels
    fetch(API.GET_ALL_ROOMS + "?page=" + page)
      // Convert response to json data
      .then((res) => res.json())
      // Apply data
      .then((data) => {
        setRooms(data.items);
        return data;
      })
      // Run callback
      .then((data) => callback(data))
      // Catch error
      .catch((err) => console.log(err));
  }, []);

  // Handle when click add room
  const handleAddRoom = () => {
    navigate("/rooms/add");
  };

  // Handle when click edit room
  const handleEditRoom = (roomId) => {
    navigate(`/rooms/edit/${roomId}`);
  };

  // Handle when click delete room
  const handleDeleteRoom = (roomId) => {
    // Ask user to delete room
    const sureToDelete = window.confirm(
      "Are you sure you want to delete this room?"
    );

    // If user press ok
    if (sureToDelete) {
      // Delete hotel
      fetch(API.POST_DELETE_ROOM_BY_ID, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId }),
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
      <div className="room-list-page">
        <Table title="Rooms List" hasAdd={true} onAdd={handleAddRoom}>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Max People</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room._id}>
                <th>
                  <input type="checkbox" />
                </th>
                <td>{room._id}</td>
                <td>{room.title}</td>
                <td>{room.desc}</td>
                <td>{room.price}</td>
                <td>{room.maxPeople}</td>
                <td>
                  <div className="action-list">
                    <button
                      className="btn-edit"
                      onClick={() => handleEditRoom(room._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteRoom(room._id)}
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

export default RoomListPage;
