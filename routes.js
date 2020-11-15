const routes = require("express").Router();
const { Pool } = require("pg");

// connection
const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

routes.get("/", (req, res) => {
  res.send("Welcome");
});

// login
routes.get("/login", async (req, res) => {
  try {
    const client = await connection.connect();
    const { email } = req.headers;
    const user = await client.query(
      "SELECT * FROM users_table WHERE email = $1",
      [email]
    );
    res.json(user.rows);
    client.release();
  } catch (err) {
    console.error(err.message);
  }
});

// users
// get all users
routes.get("/users", async (req, res) => {
  try {
    const client = await connection.connect();
    const allUsers = await client.query("SELECT * FROM users_table");
    res.json(allUsers.rows);
    client.release();
  } catch (err) {
    console.error(err.message);
  }
});

// get one user
routes.get("/users/:id", async (req, res) => {
  try {
    const client = await connection.connect();

    const { id } = req.params;
    const user = await client.query(
      "SELECT * FROM users_table WHERE user_id = $1",
      [id]
    );
    res.json(user.rows);
    client.release();
  } catch (err) {
    console.error(err.message);
  }
});

// create user
routes.post("/users", async (req, res) => {
  try {
    const client = await connection.connect();
    const { email } = req.body;
    const newUser = await client.query(
      "INSERT INTO users_table (email) VALUES ($1) RETURNING *",
      [email]
    );
    res.json(newUser.rows[0]);
    client.release();
  } catch (err) {
    console.error(err.message);
  }
});

// update user, we wont use this for users though
routes.put("/users/:id", async (req, res) => {
  try {
    const client = await connection.connect();

    const { id } = req.params;
    const { email } = req.body;
    const updatedUser = await client.query(
      "UPDATE users_table SET email = $1 WHERE user_id = $2",
      [email, id]
    );
    res.json("User was updated");
    client.release();
  } catch (err) {
    console.error(err.message);
  }
});

// delete a user
routes.delete("/users/:id", async (req, res) => {
  try {
    const client = await connection.connect();

    const { id } = req.params;
    const deleteUser = await client.query(
      "DELETE FROM users_table WHERE user_id = $1",
      [id]
    );
    res.json("User was deleted");
    client.release();
  } catch (err) {
    console.error(err.message);
  }
});

// subreddits
// create a subreddit
routes.post("/subreddits", async (req, res) => {
  try {
    const client = await connection.connect();
    const { title, image_url, user_id } = req.body;
    const newSubreddit = await client.query(
      "INSERT INTO subreddits_table (title, image_url, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, image_url, user_id]
    );
    res.json(newSubreddit.rows[0]);
    client.release();
  } catch (err) {
    console.error(err.message);
  }
});

// lists all posts in subreddit
routes.get("/subreddits/posts", async (req, res) => {
  try {
    const client = await connection.connect();
    const { subreddit_id } = req.headers;
    const posts = await client.query(
      "SELECT * FROM posts_table WHERE subreddit_id = $1",
      [subreddit_id]
    );
    res.json(posts.rows);
    client.release();
  } catch (err) {
    console.error(err.message);
  }
});

// posts
// create a post
routes.post("/posts", async (req, res) => {
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

// lists all comments in post
routes.get("/subreddits/posts/comments", async (req, res) => {
  try {
    const client = await connection.connect();
    const { post_id } = req.headers;
    const comments = await client.query(
      "SELECT * FROM comments_table WHERE post_id = $1",
      [post_id]
    );
    res.json(comments.rows);
    client.release();
  } catch (err) {
    console.error(err.message);
  }
});

// popular subreddits
routes.get("/popular", async (req, res) => {
  try {
    const client = await connection.connect();
    const popularPosts = await client.query(
      "select * from posts_table order by upvotes desc limit 15"
    );
    res.json(popularPosts.rows);
    client.release();
  } catch (err) {
    console.error(err.message);
  }
});

// popular subreddits
routes.get("/popular2", async (req, res) => {
  try {
    const client = await connection.connect();
    const popularPosts = await client.query(
      "select p.*, s.title from posts_table p join subreddits_table s on p.subreddit_id = s.subreddit_id order by upvotes desc limit 15"
    );
    res.json(popularPosts.rows);
    client.release();
  } catch (err) {
    console.error(err.message);
  }
});

// comments
// create a comment
routes.post("/comments", async (req, res) => {
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

module.exports = routes;
