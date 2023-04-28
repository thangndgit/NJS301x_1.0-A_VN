import { useEffect, useState } from "react";
import api, { call } from "../api/api";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState({ products: [], totalPrice: 0 });
  const [reload, setReload] = useState(true);

  useEffect(() => {
    call(api.cart.get(), (data) => setCart(data.item));
  }, [reload]);

  const handleRemoveProduct = (productId) => {
    call(
      api.cart.update(),
      (data) => {
        alert(data.message);
        setReload((prev) => !prev);
      },
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
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
        body: JSON.stringify({}),
      }
    );
  };

  return (
    <main>
      {!cart.products.length && <h1>No Products In Cart</h1>}
      {!!cart.products.length && (
        <>
          <ul className="cart__item-list">
            {cart.products.map((prod) => (
              <li className="cart__item" key={prod.id}>
                <h1>{prod.title}</h1>
                <h2>Quantity: {prod.cartItem.quantity}</h2>
                <button className="btn danger" type="submit" onClick={() => handleRemoveProduct(prod.id)}>
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
