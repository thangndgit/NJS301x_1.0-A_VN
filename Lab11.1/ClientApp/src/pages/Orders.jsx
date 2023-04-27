import { useEffect, useState } from "react";
import api, { call } from "../api/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    call(api.order.get(), (data) => setOrders(data.items));
  }, []);

  return (
    <main>
      {!orders.length && <h1>Nothing there!</h1>}
      {!!orders.length && (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <h1># {order.id}</h1>
              <ul>
                {order.products.map((product) => (
                  <li key={order.id}>
                    {product.title} ({product.orderItem.quantity})
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default Orders;
