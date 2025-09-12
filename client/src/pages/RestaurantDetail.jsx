// src/pages/RestaurantDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, Typography } from "@mui/material";
import KpiCard from "../components/KpiCard";
import OrdersLineChart from "../components/OrdersLineChart";
import RevenueLineChart from "../components/RevenueLineChart";
import PeakHourBarChart from "../components/PeakHourBarChart";
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function RestaurantDetail() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [ordersSeries, setOrdersSeries] = useState([]);
  const [revenueSeries, setRevenueSeries] = useState([]);
  const [peakHourSeries, setPeakHourSeries] = useState([]);
  const [kpis, setKpis] = useState({ totalRevenue: 0, totalOrders: 0, avgOrder: 0 });

  useEffect(()=>{
    async function load() {
      try {
        const r = await fetch(`${API}/restaurants/${id}`).then(res=>res.json());
        setRestaurant(r);
        // analytics endpoint (replace with real endpoint if available)
        const analytics = await fetch(`${API}/analytics/restaurants/${id}/summary?start_date=2025-06-24&end_date=2025-06-30`).then(res=>res.json()).catch(()=>null);
        if (analytics) {
          setOrdersSeries(analytics.daily_orders || []);
          setRevenueSeries(analytics.daily_revenue || []);
          setPeakHourSeries(analytics.peak_hours || []);
          setKpis({
            totalRevenue: analytics.total_revenue || 0,
            totalOrders: analytics.total_orders || 0,
            avgOrder: analytics.total_orders ? (analytics.total_revenue / analytics.total_orders) : 0
          });
        } else {
          // fallback demo data
          const demo = [
            { date: "2025-06-24", orders: 12, revenue: 1200, peakHourOrders: 6 },
            { date: "2025-06-25", orders: 15, revenue: 1500, peakHourOrders: 8 },
            { date: "2025-06-26", orders: 9, revenue: 900, peakHourOrders: 4 },
          ];
          setOrdersSeries(demo.map(d=>({date: d.date, orders: d.orders})));
          setRevenueSeries(demo.map(d=>({date: d.date, revenue: d.revenue})));
          setPeakHourSeries(demo.map(d=>({date: d.date, peakHourOrders: d.peakHourOrders})));
          setKpis({ totalRevenue: 3600, totalOrders: 36, avgOrder: 100 });
        }
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, [id]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h5" sx={{ mb: 2 }}>{restaurant?.name || `Restaurant ${id}`}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}><KpiCard title="Total Revenue" value={`₹ ${Math.round(kpis.totalRevenue)}`} /></Grid>
        <Grid item xs={12} md={3}><KpiCard title="Total Orders" value={kpis.totalOrders} /></Grid>
        <Grid item xs={12} md={3}><KpiCard title="Avg Order" value={`₹ ${Math.round(kpis.avgOrder)}`} /></Grid>
        <Grid item xs={12} md={3}><KpiCard title="Peak Hour (recent)" value={`Hour ${peakHourSeries?.[peakHourSeries.length-1]?.hour ?? "-"}`}/></Grid>

        <Grid item xs={12} md={6}><OrdersLineChart data={ordersSeries} /></Grid>
        <Grid item xs={12} md={6}><RevenueLineChart data={revenueSeries} /></Grid>
        <Grid item xs={12}><PeakHourBarChart data={peakHourSeries} /></Grid>
      </Grid>
    </Container>
  );
}
