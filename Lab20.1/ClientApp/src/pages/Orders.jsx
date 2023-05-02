import { useEffect, useState } from "react";
import api, { call } from "../api/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    call(
      api.order.get(),
      (data) => {
        if (data.error) console.log(data.error);
        else setOrders(data.items);
      },
      { credentials: "include" }
    );
  }, []);

  return (
    <main>
      {!orders.length && <h1>Nothing there!</h1>}
      {!!orders.length && (
        <ul className="orders">
          {orders.map((order) => (
            <li key={order._id} className="orders__item">
              <h1>
                # {order._id} -{" "}
                <a href={`http://localhost:5000/invoices/invoice-${order._id}.pdf`} target="__blank">
                  Invoice
                </a>
              </h1>
              <ul className="orders__products">
                {order.items.map((item) => (
                  <li key={item.product._id} className="orders__products-item">
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
