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

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route index element={<Index />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/admin/add-product" element={<EditProduct mode="add" />} />
          <Route path="/admin/edit-product/:productId" element={<EditProduct mode="update" />} />
          <Route path="/admin/products" element={<Admin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
