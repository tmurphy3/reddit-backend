CREATE DATABASE DB_NAME;
CREATE USER DB_USER WITH PASSWORD 'DB_PWD';
GRANT ALL PRIVILEGES ON DATABASE DB_NAME TO DB_USER;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO DB_USER;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public to DB_USER;

CREATE TABLE user_table(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(40) NOT NULL UNIQUE
);

CREATE TABLE subreddit_table (
    subreddit_id SERIAL PRIMARY KEY,
    user_id int,
    title VARCHAR(40),
    image_url VARCHAR(255),
      CONSTRAINT user_id FOREIGN KEY (user_id)
    REFERENCES user_table (user_id)
);

CREATE TABLE posts_table (
    post_id SERIAL PRIMARY KEY,
    user_id int,
    subreddit_id int,
    title VARCHAR(40),
    content VARCHAR(500),
    image_url VARCHAR(255),
    upvotes int,
    datetime_created timestamp,
        CONSTRAINT user_id FOREIGN KEY (user_id)
    REFERENCES user_table (user_id),
        CONSTRAINT subreddit_id FOREIGN KEY (subreddit_id)
    REFERENCES subreddit_table (subreddit_id)
);
