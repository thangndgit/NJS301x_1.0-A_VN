import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EnterUser from "./pages/EnterUser";
import Users from "./pages/Users";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          <Route index element={<EnterUser />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
