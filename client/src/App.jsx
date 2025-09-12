import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Restaurants from "./pages/Restaurants";
import RestaurantDetail from "./pages/RestaurantDetail";
// import Orders from "./pages/Orders";
import { CssBaseline } from "@mui/material";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
    <CssBaseline />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/restaurants/:id" element={<RestaurantDetail />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      </>
  );
}

export default App;

 // <BrowserRouter>
    //   <nav>
    //     <Link to="/restaurants">Restaurants</Link> |{" "}
    //     <Link to="/orders">Orders</Link>
    //   </nav>
    //   <Routes>
    //     <Route path="/restaurants" element={<Restaurants />} />
    //     <Route path="/orders" element={<Orders />} />
    //   </Routes>
    // </BrowserRouter>
