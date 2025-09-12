// src/components/FiltersPanel.jsx
import React from "react";
import { Card, CardContent, Box, TextField, Button } from "@mui/material";

export default function FiltersPanel({ onApply }) {
  // simple local state; you can lift to parent
  const [start, setStart] = React.useState("");
  const [end, setEnd] = React.useState("");

  return (
    <Card className="mb-4">
      <CardContent>
        <div className="flex gap-3 items-end">
          <TextField label="Start date" type="date" value={start} onChange={e=>setStart(e.target.value)} InputLabelProps={{ shrink: true }} />
          <TextField label="End date" type="date" value={end} onChange={e=>setEnd(e.target.value)} InputLabelProps={{ shrink: true }} />
          <Button variant="contained" onClick={() => onApply && onApply({ start, end })}>Apply</Button>
        </div>
      </CardContent>
    </Card>
  );
}
