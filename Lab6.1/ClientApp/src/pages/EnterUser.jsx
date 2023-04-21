import { useRef } from "react";
import api, { call } from "../api/api";
import { useNavigate } from "react-router-dom";

const EnterUser = () => {
  const refUser = useRef(null);
  const navigate = useNavigate();

  return (
    <div className="enter-user">
      <h1>Enter User</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(refUser.current.value);
          call(api.users.create(), (data) => navigate("/users"), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: refUser.current.value,
            }),
          });
        }}
      >
        <input type="text" ref={refUser} required />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default EnterUser;
