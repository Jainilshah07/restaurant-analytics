import express from "express";
import pool from "./db/db.js";
import dotenv from "dotenv";

dotenv.config();
console.log("Database URL:", process.env.DATABASE_URL); // FIXED case

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/restaurants", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM restaurants");
    res.json(result.rows);
  } catch (err) {
    console.error("Database query error:", err.message); // log message
    res.status(500).json({ error: "Database error", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
