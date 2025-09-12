// src/components/KpiCard.jsx
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

export default function KpiCard({ title, value, subtitle }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle2" color="textSecondary">{title}</Typography>
        <Typography variant="h5" sx={{ mt: 1 }}>{value}</Typography>
        {subtitle && <Typography variant="caption" color="textSecondary">{subtitle}</Typography>}
      </CardContent>
    </Card>
  );
}
