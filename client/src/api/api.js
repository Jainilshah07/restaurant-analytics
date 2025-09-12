const API_BASE = "http://localhost:5000";

export async function fetchRestaurants() {
  const res = await fetch(`${API_BASE}/restaurants`);
  return res.json();
}

export async function fetchOrders() {
  const res = await fetch(`${API_BASE}/orders`);
  return res.json();
}
