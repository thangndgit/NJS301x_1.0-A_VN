import { useCallback } from "react";
import api, { call } from "../api/api";

const AddToCart = ({ productId }) => {
  // Handle function
  const handleAddToCart = useCallback(() => {
    const action = "ADD_TO_CART";
    call(api.cart.update(), (data) => alert(data.message), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ action, productId }),
    });
  }, [productId]);

  return (
    <button className="btn" onClick={handleAddToCart}>
      Add To Cart
    </button>
  );
};

export default AddToCart;
