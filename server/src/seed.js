import fs from "fs";
import path from "path";
import pool from "./db/db.js";

// helper to resolve file path
const __dirname = path.resolve();

async function seed() {
  try {
    // read JSON files
    const restaurantsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "data", "restaurants.json"))
    );
    const ordersData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "data", "orders.json"))
    );

    console.log("Seeding database...");

    // clear old data
    await pool.query("TRUNCATE orders, restaurants RESTART IDENTITY CASCADE");

    // insert restaurants
    for (const r of restaurantsData) {
      await pool.query(
        "INSERT INTO restaurants (id, name, location, cuisine) VALUES ($1, $2, $3, $4)",
        [r.id, r.name, r.location, r.cuisine]
      );
    }

    // insert orders
    for (const o of ordersData) {
      await pool.query(
        "INSERT INTO orders (id, restaurant_id, order_amount, order_time) VALUES ($1, $2, $3, $4)",
        [o.id, o.restaurant_id, o.order_amount, o.order_time]
      );
    }

    console.log("✅ Seeding completed!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding DB:", err);
    process.exit(1);
  }
}

seed();
