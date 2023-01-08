import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./contexts/AuthContext";
import HomePage from "./pages/HomePage/HomePage";
import HotelListPage from "./pages/HotelListPage/HotelListPage";
import HotelModifyPage from "./pages/HotelModifyPage/HotelModifyPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RoomListPage from "./pages/RoomListPage/RoomListPage";
import RoomModifyPage from "./pages/RoomModifyPage/RoomModifyPage";
import TranListPage from "./pages/TranListPage/TranListPage";
import UserListPage from "./pages/UserListPage/UserListPage";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        {!isLoggedIn && (
          <>
            <Route path="*" element={<LoginPage />} />
          </>
        )}
        {isLoggedIn && (
          <>
            <Route path="/users" element={<UserListPage />} />
            <Route path="/hotels" element={<HotelListPage />} />
            <Route path="/rooms" element={<RoomListPage />} />
            <Route path="/transactions" element={<TranListPage />} />
            <Route
              path="/hotels/add"
              element={<HotelModifyPage mode="add" />}
            />
            <Route
              path="/hotels/edit/:hotelId"
              element={<HotelModifyPage mode="edit" />}
            />
            <Route path="/rooms/add" element={<RoomModifyPage mode="add" />} />
            <Route
              path="/rooms/edit/:roomId"
              element={<RoomModifyPage mode="edit" />}
            />
            <Route path="*" element={<HomePage />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
