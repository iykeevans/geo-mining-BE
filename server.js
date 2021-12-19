const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const env = require("dotenv");
const PORT = 3000;

env.config();

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "Welcome to the geo mining server",
  });
});

app.get("/sample-data", async (req, res) => {
  const { rows: data } = await pool.query(`SELECT * FROM "sample-data-v1"`);
  res.json({ status: 200, message: "Successfully fetched sample data", data });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
