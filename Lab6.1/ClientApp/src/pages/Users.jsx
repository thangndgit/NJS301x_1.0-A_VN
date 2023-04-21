import { useEffect, useState } from "react";
import api, { call } from "../api/api";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    call(api.users.getAll(), (data) => setUsers(data.items));
  }, []);

  return (
    <div className="users">
      <h1>Users</h1>
      {!users.length && <h1>No Users Found!</h1>}
      {!!users.length && (
        <ol>
          {users.map((u, i) => (
            <li key={i}>{u}</li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default Users;
