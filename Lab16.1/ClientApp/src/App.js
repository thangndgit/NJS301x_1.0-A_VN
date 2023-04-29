import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import EditProduct from "./pages/EditProduct";
import Header from "./components/Header";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Orders from "./pages/Orders";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("isLoggedIn"));

  return (
    <BrowserRouter>
      <div className="app">
        <Header onChangeAuth={setIsLoggedIn} />
        <Routes>
          <Route index element={<Index />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          {isLoggedIn && (
            <>
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/admin/add-product" element={<EditProduct mode="add" />} />
              <Route path="/admin/edit-product/:productId" element={<EditProduct mode="update" />} />
              <Route path="/admin/products" element={<Admin />} />
            </>
          )}
          {!isLoggedIn && (
            <>
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
            </>
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
