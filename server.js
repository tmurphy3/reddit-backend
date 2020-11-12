const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { send } = require("process");
const { Pool } = require("pg");

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

//routes
app.post("/subreddits", async (req, res) => {
  try {
    const client = await connection.connect();
    const { title, image_url, user_id } = req.body;
    const newSubreddit = await client.query(
      "INSERT INTO subreddit_table (title, image_url, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, image_url, user_id]
    );
    res.json(newSubreddit.rows[0]);
    client.release();
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/posts", async (req, res) => {
  try {
    const client = await connection.connect();
    const {
      title,
      content,
      image_url,
      upvotes,
      datetime_created,
      user_id,
      subreddit_id,
    } = req.body;
    const newPost = await client.query(
      "INSERT INTO posts_table (title, content, image_url, upvotes, datetime_created, user_id, subreddit_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        title,
        content,
        image_url,
        upvotes,
        datetime_created,
        user_id,
        subreddit_id,
      ]
    );
    res.json(newPost.rows[0]);
    client.release();
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/comments", async (req, res) => {
  try {
    const client = await connection.connect();
    const { content, upvotes, datetime_created, user_id, post_id } = req.body;
    const newComment = await client.query(
      "INSERT INTO comments_table (content, upvotes, datetime_created, user_id, post_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [content, upvotes, datetime_created, user_id, post_id]
    );
    res.json(newComment.rows[0]);
    client.release();
  } catch (err) {
    console.error(err.message);
  }
});
// home
app.get("/", (req, res) => {
  res.send("Welcome");
});

// get all users
app.get("/users", async (req, res) => {
  try {
    const client = await connection.connect();
    const allUsers = await client.query("SELECT * FROM user_table");
    res.json(allUsers.rows);
    client.release();
  } catch (err) {
    console.error(err.message);
  }
});

// get one user
app.get("/users/:id", async (req, res) => {
  try {
    const client = await connection.connect();

    const { id } = req.params;
    const user = await client.query(
      "SELECT * FROM user_table WHERE user_id = $1",
      [id]
    );
    res.json(user.rows);
    client.release();
  } catch (err) {
    console.error(err.message);
  }
});

// create user
app.post("/users", async (req, res) => {
  try {
    const client = await connection.connect();
    const { email } = req.body;
    const newUser = await client.query(
      "INSERT INTO user_table (email) VALUES ($1) RETURNING *",
      [email]
    );
    res.json(newUser.rows[0]);
    client.release();
  } catch (err) {
    console.error(err.message);
  }
});

// update user, we wont use this for users though
app.put("/users/:id", async (req, res) => {
  try {
    const client = await connection.connect();

    const { id } = req.params;
    const { email } = req.body;
    const updatedUser = await client.query(
      "UPDATE user_table SET email = $1 WHERE user_id = $2",
      [email, id]
    );
    res.json("User was updated");
    client.release();
  } catch (err) {
    console.error(err.message);
  }
});

// delete a user
app.delete("/users/:id", async (req, res) => {
  try {
    const client = await connection.connect();

    const { id } = req.params;
    const deleteUser = await client.query(
      "DELETE FROM user_table WHERE user_id = $1",
      [id]
    );
    res.json("User was deleted");
    client.release();
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
