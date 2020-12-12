CREATE DATABASE DB_NAME;
CREATE USER DB_USER WITH PASSWORD 'DB_PWD';
GRANT ALL PRIVILEGES ON DATABASE DB_NAME TO DB_USER;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO DB_USER;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public to DB_USER;

CREATE TABLE users_table(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(60) NOT NULL UNIQUE
);

CREATE TABLE subreddits_table (
    subreddit_id SERIAL PRIMARY KEY,
    user_id int,
    subreddit_title VARCHAR(2000),
    subreddit_content VARCHAR(2000),
    subreddit_image TEXT,
      CONSTRAINT user_id FOREIGN KEY (user_id)
    REFERENCES users_table (user_id)
);

CREATE TABLE posts_table (
    post_id SERIAL PRIMARY KEY,
    user_id int,
    subreddit_id int,
    post_title VARCHAR(2000),
    post_content VARCHAR(2000),
    post_image TEXT,
    post_upvotes int,
    post_timestamp VARCHAR(255),
        CONSTRAINT user_id FOREIGN KEY (user_id)
    REFERENCES users_table (user_id),
        CONSTRAINT subreddit_id FOREIGN KEY (subreddit_id)
    REFERENCES subreddits_table (subreddit_id)
);

CREATE TABLE comments_table (
    comment_id SERIAL PRIMARY KEY,
    user_id int,
    post_id int,
    comment_content VARCHAR(2000),
    comment_upvotes int,
    comment_timestamp VARCHAR(255),
        CONSTRAINT user_id FOREIGN KEY (user_id)
    REFERENCES users_table (user_id),
        CONSTRAINT post_id FOREIGN KEY (post_id)
    REFERENCES posts_table (post_id)
);