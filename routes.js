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

// all posts by user
routes.get("/user/posts", async (req, res) => {
  try {
    const client = await connection.connect();
    const { user_id } = req.headers;
    const usersPosts = await client.query(
      "select p.*, s.subreddit_title, u.email from posts_table p join subreddits_table s on p.subreddit_id = s.subreddit_id join users_table u on u.user_id = p.user_id WHERE p.user_id = $1",
      [user_id]
    );
    res.json(usersPosts.rows);
    client.release();
  } catch (err) {
    console.error(err.message);
  }
});

// subreddits
//get all subreddits
routes.get("/subreddits", async (req, res) => {
  try {
    const client = await connection.connect();
    const allSubreddits = await client.query("SELECT * FROM subreddits_table");
    res.json(allSubreddits.rows);
    client.release();
  } catch (err) {
    console.error(err.message);
  }
});

// get one subreddit
routes.get("/subreddits/:id", async (req, res) => {
  try {
    const client = await connection.connect();
    const { id } = req.params;
    const user = await client.query(
      "select * from subreddits_table where subreddit_id = $1",
      [id]
    );
    res.json(user.rows);
    client.release();
  } catch (err) {
    console.error(err.message);
  }
});

// popular subreddits
routes.get("/trending", async (req, res) => {
  try {
    const client = await connection.connect();
    const posts = await client.query(
      "select COUNT(p.subreddit_id), s.subreddit_title, s.subreddit_id from posts_table p join subreddits_table s on s.subreddit_id = p.subreddit_id GROUP BY s.subreddit_id order by COUNT(p.subreddit_id) desc nulls last limit 6"
    );
    res.json(posts.rows);
    client.release();
  } catch (err) {
    console.error(err.message);
  }
});

// create a subreddit
routes.post("/subreddits", async (req, res) => {
  try {
    const client = await connection.connect();
    const {
      subreddit_title,
      subreddit_image,
      subreddit_content,
      user_id,
    } = req.body;
    const newSubreddit = await client.query(
      "INSERT INTO subreddits_table (subreddit_title, subreddit_image, subreddit_content, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [subreddit_title, subreddit_image, subreddit_content, user_id]
    );
    res.json(newSubreddit.rows[0]);
    client.release();
  } catch (err) {
    console.error(err.message);
  }
});

// lists all posts in subreddit
routes.get("/subreddit/posts", async (req, res) => {
  try {
    const client = await connection.connect();
    const { subreddit_id } = req.headers;
    const posts = await client.query(
      "select p.*, s.subreddit_title, s.subreddit_content, s.subreddit_image, u.email from posts_table p join users_table u on p.user_id = u.user_id join subreddits_table s on s.subreddit_id = p.subreddit_id where p.subreddit_id = $1",
      [subreddit_id]
    );
    res.json(posts.rows);
    client.release();
  } catch (err) {
    console.error(err.message);
  }
});

// posts
// get one subreddit
routes.get("/posts/:id", async (req, res) => {
  try {
    const client = await connection.connect();
    const { id } = req.params;
    const user = await client.query(
      "select p.*, s.subreddit_title, u.email from posts_table p join users_table u on p.user_id = u.user_id join subreddits_table s on s.subreddit_id = p.subreddit_id and p.post_id = $1",
      [id]
    );
    res.json(user.rows);
    client.release();
  } catch (err) {
    console.error(err.message);
  }
});

// create a post
routes.post("/posts", async (req, res) => {
  try {
    const client = await connection.connect();
    const {
      post_title,
      post_content,
      post_image,
      post_upvotes,
      post_timestamp,
      user_id,
      subreddit_id,
    } = req.body;
    const newPost = await client.query(
      "INSERT INTO posts_table (post_title, post_content, post_image, post_upvotes, post_timestamp, user_id, subreddit_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        post_title,
        post_content,
        post_image,
        post_upvotes,
        post_timestamp,
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
routes.get("/subreddit/post/comments", async (req, res) => {
  try {
    const client = await connection.connect();
    const { post_id } = req.headers;
    const comments = await client.query(
      "select c.*, u.email from comments_table c join users_table u on c.user_id = u.user_id and c.post_id = $1",
      [post_id]
    );
    res.json(comments.rows);
    client.release();
  } catch (err) {
    console.error(err.message);
  }
});

// popular posts
routes.get("/popular", async (req, res) => {
  try {
    const client = await connection.connect();
    const popularPosts = await client.query(
      "select p.*, s.subreddit_title, u.email from posts_table p join subreddits_table s on p.subreddit_id = s.subreddit_id join users_table u on u.user_id = p.user_id order by p.post_upvotes desc nulls last limit 15"
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
    const {
      comment_content,
      comment_upvotes,
      comment_timestamp,
      user_id,
      post_id,
    } = req.body;
    const newComment = await client.query(
      "INSERT INTO comments_table (comment_content, comment_upvotes, comment_timestamp, user_id, post_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [comment_content, comment_upvotes, comment_timestamp, user_id, post_id]
    );
    res.json(newComment.rows[0]);
    client.release();
  } catch (err) {
    console.error(err.message);
  }
});

routes.post("/upvotepost", async (req, res) => {
  try {
    const client = await connection.connect();
    const { user_id, post_id, upvote, downvote } = req.body;
    const newComment = await client.query(
      "INSERT INTO posts_upvotes_table (user_id, post_id, upvote, downvote) VALUES ($1, $2, $3, $4) RETURNING *",
      [user_id, post_id, upvote, downvote]
    );
    res.json(newComment.rows[0]);
    client.release();
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = routes;
