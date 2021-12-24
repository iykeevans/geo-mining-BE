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
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "Welcome to the geo mining server",
  });
});

app.get("/sample-data", async (req, res) => {
  try {
    let query;

    if (Object.keys(req.query).length) {
      const { labelSection } = req.query;
      query = `SELECT * FROM "sample-data-v1" WHERE thin_section_label LIKE '%${labelSection}';`;
    } else {
      query = `SELECT * FROM "sample-data-v1"`;
    }

    const { rows: data } = await pool.query(query);
    res.json({
      status: 200,
      message: "Successfully fetched sample data",
      data,
    });
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
