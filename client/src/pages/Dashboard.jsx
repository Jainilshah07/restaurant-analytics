// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { Grid, Container } from "@mui/material";
import FiltersPanel from "../components/FiltersPanel";
import KpiCard from "../components/KpiCard";
import TopRestaurants from "../components/TopRestaurantsList";
import OrdersLineChart from "../components/OrdersLineChart";
import RevenueLineChart from "../components/RevenueLineChart";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Dashboard() {
  const [top, setTop] = useState([]);
  const [summary, setSummary] = useState({ totalRevenue: 0, totalOrders: 0, avgOrderValue: 0 });
  const [ordersSeries, setOrdersSeries] = useState([]);
  const [revenueSeries, setRevenueSeries] = useState([]);

  async function load() {
    try {
      // Top restaurants by revenue endpoint
      const tr = await fetch(`${API}/analytics/top-restaurants?limit=3`).then(r=>r.json());
      setTop(tr);
      // Summary (you can implement backend endpoint to return overall KPIs or compute locally)
      // For demo we hit /restaurants and compute locally (not performant for prod)
      const restaurants = await fetch(`${API}/restaurants`).then(r=>r.json());
      setSummary({ totalRevenue: restaurants.reduce((s, r)=>s + (r.revenue || 0),0), totalOrders: 0, avgOrderValue: 0 });
      // Load demo series (replace with real analytics endpoints)
      const sampleOrders = [
        { date: "2025-06-24", orders: 20 },
        { date: "2025-06-25", orders: 32 },
        { date: "2025-06-26", orders: 25 },
        { date: "2025-06-27", orders: 28 },
        { date: "2025-06-28", orders: 40 },
        { date: "2025-06-29", orders: 34 },
        { date: "2025-06-30", orders: 30 },
      ];
      setOrdersSeries(sampleOrders);
      const sampleRev = sampleOrders.map(d => ({ date: d.date, revenue: d.orders * (Math.random()*400 + 200) | 0 }));
      setRevenueSeries(sampleRev);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(()=>{ load(); }, []);

  return (
    <Container maxWidth="xl">
      <FiltersPanel onApply={(filters)=>{ console.log("apply filters", filters); /* re-load datasets */ }} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}><KpiCard title="Total Revenue" value={`₹ ${Math.round(summary.totalRevenue)}`} /></Grid>
        <Grid item xs={12} md={3}><KpiCard title="Total Orders" value={summary.totalOrders} /></Grid>
        <Grid item xs={12} md={3}><KpiCard title="Avg Order Value" value={`₹ ${Math.round(summary.avgOrderValue)}`} /></Grid>
        <Grid item xs={12} md={3}><TopRestaurants data={top} /></Grid>

        <Grid item xs={12} md={6}><OrdersLineChart data={ordersSeries} /></Grid>
        <Grid item xs={12} md={6}><RevenueLineChart data={revenueSeries} /></Grid>
      </Grid>
    </Container>
  );
}
