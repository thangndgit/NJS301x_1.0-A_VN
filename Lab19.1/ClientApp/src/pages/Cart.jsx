import { useEffect, useState } from "react";
import api, { call } from "../api/api";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState({ items: [] });
  const [reload, setReload] = useState(true);

  useEffect(() => {
    call(
      api.cart.get(),
      (data) => {
        if (data.error) alert(data.error);
        else setCart(data.item);
      },
      { credentials: "include" }
    );
  }, [reload]);

  const handleRemoveProduct = (productId) => {
    if (window.confirm("Are you sure to remove this product from cart?"))
      call(
        api.cart.update(),
        (data) => {
          if (data.error) alert(data.error);
          else {
            alert(data.message);
            setReload((prev) => !prev);
          }
        },
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            action: "REMOVE_FROM_CART",
            productId,
          }),
        }
      );
  };

  const handleCreateOrder = () => {
    call(
      api.order.create(),
      (data) => {
        alert(data.message);
        navigate("/orders");
      },
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({}),
      }
    );
  };

  return (
    <main>
      {!cart.items.length && <h1>No Products In Cart</h1>}
      {!!cart.items.length && (
        <>
          <ul className="cart__item-list">
            {cart.items.map((item) => (
              <li className="cart__item" key={item.product._id}>
                <h1>{item.product.title}</h1>
                <h2>Quantity: {item.quantity}</h2>
                <button className="btn danger" type="submit" onClick={() => handleRemoveProduct(item.product._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <hr />
          <div className="centered">
            <button className="btn" onClick={handleCreateOrder}>
              Order Now!
            </button>
          </div>
        </>
      )}
    </main>
  );
};

export default Cart;
