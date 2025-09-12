import express from "express";
import pool from "./db/db.js";
import dotenv from "dotenv";
import cors from "cors";
import { formatISO } from "date-fns";

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

// app.get("/orders", async (req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM orders");
//     res.json(result.rows);
//   } catch (err) {
//     console.error("Database query error:", err);
//     res.status(500).json({ error: "Database error" });
//   }
// });

app.get("/restaurants", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM restaurants");
    res.json(result.rows);
  } catch (err) {
    console.error("Database query error:", err.message); // log message
    res.status(500).json({ error: "Database error", details: err.message });
  }
});

app.get("/orders", async (req, res) => {
  try {
    const { restaurant_id, start_date, end_date, min_amount, max_amount, start_hour, end_hour } =
      req.query;

    let query = `SELECT * FROM orders WHERE 1=1`;
    const values = [];
    let i = 1;

    if (restaurant_id) {
      query += ` AND restaurant_id = $${i++}`;
      values.push(Number(restaurant_id));
    }

    if (start_date) {
      query += ` AND order_time >= $${i++}`;
      values.push(new Date(start_date));
    }

    if (end_date) {
      query += ` AND order_time <= $${i++}`;
      values.push(new Date(end_date));
    }

    if (min_amount) {
      query += ` AND order_amount >= $${i++}`;
      values.push(Number(min_amount));
    }

    if (max_amount) {
      query += ` AND order_amount <= $${i++}`;
      values.push(Number(max_amount));
    }

    if (start_hour !== undefined && end_hour !== undefined) {
      query += ` AND EXTRACT(HOUR FROM order_time) BETWEEN $${i++} AND $${i++}`;
      values.push(Number(start_hour), Number(end_hour));
    }

    query += ` ORDER BY order_time ASC`;

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error("Database query error:", err);
    res.status(500).json({ error: "Database error", details: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
