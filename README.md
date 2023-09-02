## Overview

Embark on your next outdoor adventure with ease using the Pick-A-Trail app. Explore a vast network of trails, from serene walks to rugged hikes effortlessly. Get detailed trail information, track your progress, and share your experiences with a community of fellow nature enthusiasts.

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

TBD

## User Stories

TBD

## DB Schema

## Users
| Column Name    | DataType      | Constraints      |
|----------------|---------------|------------------|
| id             | INTEGER       | PK, NOT NULL     |
| firstName      | VAR CHAR      |                  |
| lastName       | VAR CHAR      | NOT NULL, UNIQUE |
| userName       | VAR CHAR      | NOT NULL, UNIQUE |
| email          | VAR CHAR      | NOT NULL         |
| hashedPassword | VAR CHAR      | NOT NULL         |
| Followers      | INTEGER []    |                  |
| Following      | INTEGER []    |                  |
| adminUser      | BOOLEAN       | NOT NULL         |



## Parks
| Column Name    | DataType   | Constraints  |
|----------------|------------|--------------|
| id             | INTEGER    | PK, NOT NULL |
| name           | VAR CHAR   | NOT NULL     |
| description    | VAR CHAR   |              |
| location       | VAR CHAR   |              |

- `Park` hasMany Trails.

## Trails

| Column Name    | DataType   | Constraints  |
|----------------|------------|--------------|
| id             | INTEGER    | PK, NOT NULL |
| name           | VAR CHAR   | NOT NULL, FK |
| ParkId         | INTEGER    | FK           |
| difficulty     | ENUM       |              |
| length         | INTEGER    | NOT NULL     |
| elevationGain  | INTEGER    | NOT NULL     |
| description    | VAR CHAR   |              |
| images         | VAR CHAR[] | NOT NULL     |
| tags           | ENUM       |              |
| location       | TBD        |              |

- `ParkId` references `Park` table
- `Trail` belongsTo relationship with `Park`

## Lists

| Column Name    | DataType   | Constraints  |
|----------------|------------|--------------|
| id             | INTEGER    | PK, NOT NULL |
| UserID         | INTEGER    | FK, NOT NULL |
| privacy        | ENUM       |              |
| trailsList     | INTEGER[]  |              |

- `UserID` references `Users` table
- `List` belongs to one `Users`



## CompletedSavedUserTrails

| Column Name  | DataType | Constraints  |
|--------------|----------|--------------|
| id           | INTEGER  | PK, NOT NULL |
| UserId       | INTEGER  | NOT NULL, FK |
| TrailId      | INTEGER  | NOT NULL, FK |
| completed    | BOOLEAN  |              |
| saved        | BOOLEAN  |              |

- `UserId` references `Users` table
- `TrailId` references `Trails` table
- `CompletedSavedUserTrails` is a through relation between `Users` and `Trails`

## Reviews

| Column Name  | DataType | Constraints  |
|--------------|----------|--------------|
| id           | INTEGER  | PK, NOT NULL |
| UserId       | INTEGER  | NOT NULL, FK |
| TrailId      | INTEGER  | NOT NULL, FK |
| starsReview  | ENUM     | NOT NULL     |
| comment      | VAR CHAR |              |
| createdAt    | DATETIME |              |

- `UserId` references `Users` table
- `TrailId` references `Trails` table
- `Reviews` is a through relation between `Users` and `Trails`

## Activities

| Column Name  | DataType | Constraints  |
|--------------|----------|--------------|
| id           | INTEGER  | PK, NOT NULL |
| UserId       | INTEGER  | NOT NULL, FK |
| TrailId      | INTEGER  | NOT NULL, FK |
| title        | VAR CHAR | NOT NULL     |
| message      | VAR CHAR | NOT NULL     |
| starsReview  | ENUM     | NOT NULL     |
| likes        | INTEGER[]|              |

- `UserId` references `Users` table
- `TrailId` references `Trails` table
- `Activities` is a through relation between `Users` and `Trails`

## Comments

| Column Name  | DataType | Constraints  |
|--------------|----------|--------------|
| id           | INTEGER  | PK, NOT NULL |
| UserId       | INTEGER  | NOT NULL, FK |
| ActivityId   | INTEGER  | NOT NULL, FK |
| comment      | VAR CHAR |              |
| createdAt    | DATETIME |              |

- `UserId` references `Users` table
- `TrailId` references `Trails` table
- `Comments` is a through relation between `Users` and `Trails`
