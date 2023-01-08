import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "./mailList.css";

const MailList = () => {
  const navigate = useNavigate();

  const { isLoggedIn } = useContext(AuthContext);

  const handleSubcribe = () => {
    navigate("/register");
  };

  return (
    <div className="mail">
      <h1 className="mailTitle">Save time, save money!</h1>
      {!isLoggedIn && (
        <>
          <span className="mailDesc">
            Sign up and we'll send the best deals to you
          </span>
          <div className="mailInputContainer">
            <input type="text" placeholder="Your Email" />
            <button onClick={handleSubcribe}>Subscribe</button>
          </div>
        </>
      )}
    </div>
  );
};

export default MailList;
