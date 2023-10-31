This is the planning phase for the application.

# Overview

Pick-A-Trail, clone of the All Trails App - a guide for outdoor recreational activities.

# Style
- Colors-#2c5601
- Font - Percent,Beatrice,Arial,sans-serif

# User types:
* User types:
    - Normal User
    - Admin User

# Features of the APP
* User can signUp/ Login
* Use OAuth for Authentication and JSON web tokens
* List the trails
* Add trails to completed, favorites, saved, etc
* Search
* Include the weather forecast for the following week for the trails - Optional
* Include one of the feature
    - Community
    1. Local - fetched based on the location and recently added activity
    2. Community - fetched based on the following user's activities and recently added activities


# UI Pages for the App

* Header:
    - Logo
    - Explore
    - Saved -> My favorites, My maps, Lists, Activities, completed, Create Map

    - Log In

* Footer
    - Navigation to other pages in the App
    - Connect us with (Social Media Links)
    - Copyrights
    - Change Language Feature (Optional feature)

Header and Footer has to placed on all pages.

* Sign Up
    - Card that displays signup options
    - Supports OAuth - Google, github or Create a new Account
* Login
    - Card that displays Login form - Requesting username and Password

* Explore
    - It is a open page- Home Page. To explore various trails. Can be accessed without logging in
    - List the trails on one side of the page and a google map of the current location on the other side
    - Filters on the page: - each filter has to be drop down, slider, radio button, etc
        * Difficulty
        * Length
        * Activity
        * Elevation gain
        * Rating
        * Distance away - can be access only after login

    - When clicking on a trail- has to prompt to login to continue further

* Saved

    * Completed
        - List the same Trail detail Card along with the Google map for the trail on the right side
    * My favorites - similar to Completed
    * Activities, My Maps, Create Map - TBD
    * Create a List and keep track of the trails


* Trail Details Card
    - Image of the trail
    - Name, Rating, Difficulty
    - Directions
    - Options
    - Short Description about the trail
    - Save option


* View Trail Details
    - List all the details of the specifc trail in the entire page
    - Write a Review Button

# DB Schema
- User
    * Id
    * username
    * firstname
    * lastname
    * email
    * hashedPassword
    * Followers - array (list of userId)
    * Following - array (list of userId)
    * adminUser - true/ false

- Trails
    * Id
    * Name
    * Park Id ( Foreign Key)
    * Difficulty
    * Length
    * Elevation Gain
    * Description
    * Images
    * Tags - Dog friendly, hiking, forest, lake, falls, etc
    * Route - Google Map
    * City


- Parks
    * id
    * name
    * description

- Lists
    * Id
    * UserId (Foreign Key)
    * Privacy (Public, Private, only to followers)
    * List of Trail Ids (to be checked for existing trailIds)

- CompletedSavedUserTrails
    * Id
    * UserId (Foreign Key)
    * TrailId (Foreign Key)
    * Completed- Boolean
    * Saved - Boolean

Run a periodic query to delete when both completed/ saved  are set to false

- Maps
    * Id
    * UserID (Foreign Key)
    * HOW TO STORE THE MAP

- Reviews
    * ReviewId
    * UserID (Foreign Key)
    * TrailId (Foreign Key)
    * Star Review (out of 5)
    * Comment
    * Date/ Time created

- Activities
    * ActivityId
    * UserId (Foreign Key)
    * TrailId (Foreign Key)
    * Name
    * Message
    * Review
    * Likes (Array of UserIds)
    * Location (CHECK THIS)

- Comments
    * Id
    * ActivityId (Foreign Key)
    * UserId (Foreign Key)
    * Comment
    * DateTime

TODO:
- Activities
- Create Map, MyMaps
- Integrate google Maps
- How to make use of some external API for weather forecast details

Associations:
 - A User can add many Trails as favorites
 - A Trail can be saved as favorites by many users
 - User many-to-many(save/ add as favorites) trails
 - A User can complete many Trails
 - A Trail can be completed by many Users
 - User many-to-many(complete) trails
 - User can have many Lists
 - List belongs to only one User
 - User hasMany List, List belongs to a User
 - User hasManyMaps, Map belongs to a User
 - Park has many trails
 - A trail belongs to a Park

# Backend Routes:

`Users`

* POST /users/login
* POST /users/signup
* DELETE /users/logout

`Trails`

* GET /trails
* POST /trails - only admin users can add a new trail
* GET /trails/:id
* PUT /trails/:id - only admin users can update existing trail
* DELETE /trails/:id - only admin users can delete a trail

`Parks`

* GET /parks
* POST /parks - only admin users can add a new park
* GET /parks/:id
* PUT /parks/:id - only admin users can update existing trail
* DELETE /parks/:id - only admin users can delete a trail

`Lists`

* GET /lists
* POST /lists - Create a new List
* GET /lists/:id - get a specifc list
* PUT /lists/:id - append the trail ids to the list
* DELETE /lists/:id - delete the specific list with the given id

`CompletedSavedUserTrails`

* GET /CompletedSavedUserTrails&type=queryParams
* POST /CompletedSavedUserTrails&type=queryParams Create an entry if not present and then add the boolean values to saved or completed based on the query parameter
* CHECK ON DELETION / UPDATION
    - Update/ delete scenarios - when saved is removed, completed is removed, Both are added, both are removed.

`Review`

* GET /reviews/:userId - Returns all the reviews by the user
* GET /reviews/:trailId - Returns all the reviews for a specific trail
* GET /reviews/:userId/:trailId
* POST /reviews/:trailId - User has to be loggedin to post a review
* PUT /reviews/:trailId - Only the user created the review can update/delete
* DELETE /reviews/:trailId - Only the user created the review can update/delete

`Activities`

* GET /activities/:userId - Return all activities by the user
* GET /activities/:activityId - List the specific activity
* POST /activities/ - Add an activity
* PUT /activities/:activityId - Only the user created the activity can update
* DELETE /activities/:activityId - Only the user created the activity can delete
* GET /activities/local - List activities based on location
* GET /activities/community - List activities of the user's followers


# Points to be noted/ checked:

* When creating a Park - should I keep track of the admin user who created the Park entry
