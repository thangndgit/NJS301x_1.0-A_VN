import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shop from "./pages/Shop";
import EditProduct from "./pages/EditProduct";
import Header from "./components/Header";
import Admin from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route index element={<Shop />} />
          <Route path="/add-product" element={<EditProduct mode="add" />} />
          <Route path="/edit-product/:productId" element={<EditProduct mode="update" />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
