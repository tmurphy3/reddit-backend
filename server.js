const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); // allows access to req.body

//routes

// get all users
app.get("/users", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM user_table");
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get one user
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query(
      "SELECT * FROM user_table WHERE user_id = $1",
      [id]
    );
    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// create user
app.post("/users", async (req, res) => {
  try {
    const { email } = req.body;
    const newUser = await pool.query(
      "INSERT INTO user_table (email) VALUES ($1) RETURNING *",
      [email]
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
