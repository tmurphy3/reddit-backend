const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { send } = require("process");
const { Pool } = require("pg");
const routes = require("./routes");

//middleware
app.use(cors());
app.use(express.json()); // allows access to req.body

// connection
const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.use("/", routes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
