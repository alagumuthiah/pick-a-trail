## Overview

Embark on your next outdoor adventure with ease using the Pick-A-Trail app. Explore a vast network of trails, from serene walks to rugged hikes effortlessly. Get detailed trail information, track your progress, and share your experiences with a community of fellow nature enthusiasts.

## Project setup

To run the application locally:
1. Git clone the repo `https://github.com/alagumuthiah/pick-a-trail.git`
2. Run `npm install` in both frontend and backend folders to install the required packages for the application.
3. Create a .env file with the configuration for the database.
4. Create the database using sequelize - `npx sequelize db:create`
5. Run `npx sequelize db:migrate` to migrate the database.
6. Run `npx sequelize db:seed:all` to seed the database(populate the data)
7. Run npm start in the backend folder to start our Express server.
8. run npm start in the frontend folder to start the React frontend server.
9. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Technologies USed

**FrontEnd**
- React
- Redux
- HTML
- CSS
- Javascript

**Backend**
- Express
- NodeJS
- Sequelize
- PostgreSQL

**API**
- Google Maps API
- Google Weather API

**Authentication & Authorization**
- OAuth
- JSON Web Tokens

## Features of the App

* User can signUp/ Login
* Use OAuth for Authentication and JSON web tokens
* List the trails
* Add trails to completed, favorites, saved, etc
* Search
* Include the weather forecast for the following week for the trails - Optional
* Community feature
    1. Local - fetched based on the location and recently added activity
    2. Community - fetched based on the following user's activities and recently added activities
 

## Link to Wiki docs

[Link to Wiki Docs] [https://github.com/alagumuthiah/pick-a-trail/wiki]



