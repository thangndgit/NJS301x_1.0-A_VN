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
            <li key={order._id}>
              <h1># {order._id}</h1>
              <ul>
                {order.items.map((item) => (
                  <li key={item.product._id}>
                    {item.product.title} ({item.quantity})
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
