import { useEffect, useState } from "react";
import api, { call } from "../api/api";

const Cart = () => {
  const [cart, setCart] = useState({ products: [], totalPrice: 0 });
  const [reload, setReload] = useState(true);

  useEffect(() => {
    call(api.cart.get(), (data) => setCart(data.item));
  }, [reload]);

  const handleRemoveProduct = (product) => {
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
          productId: product.id,
          productPrice: product.price,
        }),
      }
    );
  };

  return (
    <main>
      {!cart.products.length && <h1>No Products In Cart</h1>}
      {!!cart.products.length && (
        <>
          <ul>
            {cart.products.map((prod) => (
              <li key={prod.id}>
                <div>
                  {prod.title} ({prod.qty})
                </div>
                <button className="btn" onClick={() => handleRemoveProduct(prod)}>
                  Delete
                </button>
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
