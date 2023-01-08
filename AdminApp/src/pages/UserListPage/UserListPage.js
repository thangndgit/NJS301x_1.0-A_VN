import { useCallback, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import API from "../../constants/api";

import PageLayout from "../../layouts/PageLayout/PageLayout";
import Table from "../../layouts/TableLayout/TableLayout";
import "./UserListPage.css";

const UserListPage = () => {
  // Users list
  const [users, setUsers] = useState([]);

  // onFetch function to pass to pagination
  const fetchPage = useCallback((page, callback) => {
    // Get users
    fetch(API.GET_ALL_USERS + "?page=" + page)
      // Convert response to json data
      .then((res) => res.json())
      // Apply data
      .then((data) => {
        setUsers(data.items);
        return data;
      })
      // Run callback
      .then((data) => callback(data))
      // Catch error
      .catch((err) => console.log(err));
  }, []);

  return (
    <PageLayout>
      <div className="user-list-page">
        <Table title="Users List" hasAdd={false}>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>ID</th>
              <th>Username</th>
              <th>Full Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <th>
                  <input type="checkbox" />
                </th>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.fullName}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? <>Admin</> : <>User</>}</td>
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

export default UserListPage;
