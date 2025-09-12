// src/components/TopRestaurantsList.jsx
import React from "react";
import { Card, CardContent, Typography, List, ListItem, ListItemText } from "@mui/material";

export default function TopRestaurantsList({ data = [] }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1">Top Restaurants</Typography>
        <List>
          {data.map((r, idx) => (
            <ListItem key={r.id}>
              <ListItemText primary={`${idx+1}. ${r.name}`} secondary={`Revenue: ₹ ${r.revenue}`}/>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
