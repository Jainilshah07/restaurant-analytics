import { useEffect, useState } from "react";
import { fetchOrders } from "../api/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders().then(setOrders);
  }, []);

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {orders.map((o) => (
          <li key={o.id}>
            {o.restaurant_id} - {o.order_amount}
          </li>
        ))}
      </ul>
    </div>
  );
}
