# Reddit Clone

This is a full stack web application modeled after Reddit. The objective was to include the core features of the platform, including users, profiles, subreddits, posts, comments, and upvotes. This project was built with PostgreSQL, ExpressJS, ReactJS, and NodeJS - and is deployed through Netlify at https://redditv2.netlify.app.

# Overview

- [Overview](#overview)
  - [Front-end](#front-end)
    - [Technologies Used](#technologies-used)
    - [Dependencies](#dependencies)
  - [Back-end](#back-end)
    - [Technologies Used](#technologies-used-1)
    - [Dependencies](#dependencies-1)
    - [Authentication](#authentication)
    - [Server and Database](#server-and-database)
    - [Routes Available](#routes-available)

## Front-end

### Technologies Used

- [JavaScript](https://www.javascript.com/)
- [Netlify](https://www.netlify.com/) - A free website hosting service

### Dependencies

- [ReactJS](https://reactjs.org/) - A client-side JavaScript library for building interfaces
- [Axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js
- [React-Router](https://www.npmjs.com/package/react-router) - A package providing dynamic routing functionality for web apps
- [React-Router-Dom](https://www.npmjs.com/package/react-router-dom) - A package containing the DOM bindings for react-router
- [Moment](https://www.npmjs.com/package/moment) - A library for parsing, validating, manipulating, and formatting dates.
- [Firebase](https://firebase.google.com/) - A tool providing authentication services in collaboration with Google.

## Back-end 

### Technologies Used

- [NodeJS](https://nodejs.org/en/) - An event-driven JavaScript runtime designed to build scalable network applications
- [PostgreSQL](https://www.postgresql.org/) - An open source SQL database
- [Heroku](https://www.heroku.com/) - A platform providing cloud-based hosting services

### Dependencies

- [ExpressJS](https://expressjs.com/) - A NodeJS framework used for server side development
- [Cors](https://www.npmjs.com/package/cors) - A package providing cross-origin resource sharing
- [Dotenv](https://www.npmjs.com/package/dotenv) - A module for loading environment variables from a .env file into process.env
- [Pg](https://node-postgres.com/) - A PostgreSQL client for Node.js

### Authentication

In order to sign up or sign in, you must verify your identity through google authentication

### Server and Database

The server, database structure, and routes can be found in a separate repository: https://github.com/tmurphy3/reddit-backend.

### Routes Available

The following routes are available:

| **Route name**        | **URL**                 | **HTTP Verb** | **Description**                                                   |
| ---------------       | ----------------------- | ------------- | ----------------------------------------------------------------- |
| Login*                | /{login}                | GET           | Log user in using their ID and google authentication              |
| Find users*           | /{users}                | GET           | Return all users in database                                      |    
| Create user*          | /{users}                | POST          | Create a new user                                                 |       
| Find user*            | /{users}/{:id}          | GET           | Find basic user information                                       |    
| Update user*          | /{users}/{:id}          | PUT           | Update user information                                           |       
| Delete user*          | /{users}/{:id}          | DELETE        | Delete user from database                                         |   
| Find subreddits*      | /{subreddits}           | GET           | Return all subreddits in database                                 |    
| Create subreddit*     | /{subreddits}           | POST          | Create a new subreddit                                            |       
| Find subreddit*       | /{subreddits}/{:id}     | GET           | Find basic subreddit information                                  |    
| Update subreddit*     | /{subreddits}/{:id}     | PUT           | Update subreddit information                                      |       
| Delete subreddit*     | /{subreddits}/{:id}     | DELETE        | Delete subreddit from database                                    |  
| Find posts*           | /{posts}                | GET           | Return all posts in database                                      |    
| Create post*          | /{posts}                | POST          | Create a new post                                                 |       
| Find post*            | /{posts}/{:id}          | GET           | Find basic post information                                       |    
| Update post*          | /{posts}/{:id}          | PUT           | Update post information                                           |       
| Delete post*          | /{posts}/{:id}          | DELETE        | Delete post from database                                         | 
| Find comments*        | /{comments}             | GET           | Return all comments in database                                   |    
| Create comment*       | /{comments}             | POST          | Create a new comment                                              |       
| Find comment*         | /{comments}/{:id}       | GET           | Find basic comment information                                    |    
| Update comment*       | /{comments}/{:id}       | PUT           | Update comment information                                        |       
| Delete comment*       | /{comments}/{:id}       | DELETE        | Delete comment from database                                      | 

Route names marked with `*` need authentication to be accessed
