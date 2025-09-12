// src/pages/Restaurants.jsx
import React, { useEffect, useState } from "react";
import { Container, TextField, Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Restaurants() {
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");

  async function load() {
  try {
    const res = await fetch(`${API}/restaurants`);
    const json = await res.json();
    if (!res.ok) {
      console.error("API error:", json.error || res.statusText);
      setData([]); // Set to empty array on error
      return;
    }
    setData(json);
  } catch (err) {
    console.error("Network error:", err);
    setData([]);
  }
}

  useEffect(()=>{ load(); }, []);

  const filtered = Array.isArray(data)
  ? data.filter(r => (r.name + r.location + r.cuisine).toLowerCase().includes(q.toLowerCase()))
  : [];

  return (
    <Container maxWidth="lg">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h5">Restaurants</Typography>
        <TextField placeholder="Search" value={q} onChange={e=>setQ(e.target.value)} />
      </div>

      <Grid container spacing={2}>
        {filtered.map(r => (
          <Grid item xs={12} md={6} lg={4} key={r.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{r.name}</Typography>
                <Typography variant="subtitle2" color="textSecondary">{r.cuisine} • {r.location}</Typography>
                <div className="mt-3">
                  <Button component={Link} to={`/restaurants/${r.id}`} variant="contained" size="small">View analytics</Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
