import { useEffect, useState } from "react";
import { fetchRestaurants } from "../api/api";

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetchRestaurants().then(setRestaurants);
  }, []);

  return (
    <div>
      <h2>Restaurants</h2>
      <ul>
        {restaurants.map((r) => (
          <li key={r.id}>
            {r.name} - {r.location}
          </li>
        ))}
      </ul>
    </div>
  );
}
