import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Restaurants from "./pages/Restaurants";
import Orders from "./pages/Orders";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/restaurants">Restaurants</Link> |{" "}
        <Link to="/orders">Orders</Link>
      </nav>
      <Routes>
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
