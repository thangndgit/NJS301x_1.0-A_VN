import { useEffect, useState } from "react";
import api, { call } from "../api/api";

const Cart = () => {
  const [cart, setCart] = useState({ products: [], totalPrice: 0 });

  useEffect(() => {
    call(api.cart.get(), (data) => setCart(data.item));
  }, []);

  return (
    <main>
      {!cart.products.length && <h1>No Products In Cart</h1>}
      {!!cart.products.length && (
        <>
          <ul>
            {cart.products.map((prod) => (
              <li key={prod.id}>
                {prod.title} ({prod.qty})
              </li>
            ))}
          </ul>
          <h1>Total Price: ${cart.totalPrice}</h1>
        </>
      )}
    </main>
  );
};

export default Cart;
