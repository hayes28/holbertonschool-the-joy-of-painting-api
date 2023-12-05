# ETL: The Joy of Coding API

## Description
This project is an ETL pipeline that extracts data from the Joy of Painting API, transforms the data, and loads it into a PostgreSQL database.

### Table of Contents
* [Features](#features)
* [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installing](#installing)
    * [How to Use](#how-to-use)
* [API Usage](#api-usage)
* [Frontend Usage](#frontend-usage)
* [Project Context](#project-context)
* [Presented Problem](#presented-problem)
* [Tasks](#tasks)
    * [0. Design a Database](#0-design-a-database)
    * [1. Extract, Transform, Load](#1-extract-transform-load)
    * [2. API](#2-api)
    * [3. Frontend Help! - Optional](#3-frontend-help---optional)
* [Technologies Used](#technologies-used)
* [Future Improvements](#future-improvements)
* [Acknowledgements](#acknowledgements)
* [Author](#author)


## Features

- ETL pipeline to extract data from raw files, transform it into a consistent format, and load it into a PostgreSQL database.
- RESTful API endpoints to filter episodes by different criteria such as broadcast month, subject matter, and color palette.
- Frontend React application to interact with the API (located in the `react-joy` directory).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm or yarn
- PostgreSQL

### Installing

1. Clone the repository:

```bash
git clone https://github.com/your-username/joy-of-painting-api.git
cd joy-of-painting-api
```
## How to Use
2. Install the dependencies
    ```bash
    cd api
    ```
    ```bash
    npm install
    ```
3. Create a `.env` file in the root directory and add the following environment variables:
    * `DB_USER`
    * `DB_PASSWORD`
    * `DB_HOST`
    * `DB_PORT`
    * `DB_DATABASE`
4. Run the following command to start the ETL pipeline:
    ```bash
    cd etl
    ```
    ```bash
    node etl.js
    ```
5. Start the backend server:
    ```bash
    cd ../api
    ```
    ```bash
    node index.js
    ```

The API server should now be running on `http://localhost:3001`


### Frontend Application
1. Install the dependencies
    ```bash
    cd react-joy
    ```
    ```bash
    npm install
    ```
2. Start the frontend server:
    ```bash
    npm start
    ```

The frontend server should now be running on `http://localhost:3000`

## API Usage
The API supports various endpoints to retrieve episode information. Here are a few examples:

* `GET /api/episodes` - Retrieve all episodes.
* `GET /api/episodes?color=Alizarin Crimson` - Retrieve episodes where 'Alizarin Crimson' was used.

## Frontend Usage
The frontend allows users to filter episodes by month, subject matter, and color palette. The user can select multiple filters at once and can choose to filter episodes that match all of the selected filters or episodes that match one or more of the selected filters.

## Project Context
This project is part of the curriculum at [Holberton School](https://www.holbertonschool.com/).
In this project we are going to explore the idea of ETL (Extract, Transform, Load), which is the process of taking data from multiple unique sources, modifying them in some way, and then storing them in a centralized database. This is a very common practice when collecting data from systems in order to utilize that data in another system. This data may come in the form of CSV, JSON, XML, API requests with other custom formats, etc - it might even be that you have direct access to several databases with different, but relatable data that you want to be merged into another database in order to gain insight from it in some way.

## Presented Problem
Your local public broadcasting station has an overwhelming amount of requests for information on The Joy of Painting. Their viewers want a website that allows them to filter the 403 episodes based on the following criteria:

-  <b>Month of original broadcast</b>
This will be useful for viewers who wish to watch paintings that were done during that same month of the year

- <b>Subject Matter</b>
This will be useful for viewers who wish to watch specific items get painted

- <b>Color Palette</b>
This will be useful for viewers who wish to watch specific colors being used in a painting

Your local broadcasting station has already done some leg work to gather data, however it is spread out across multiple different files and formats, which makes the data unusable in its current form. They’ve also already hired another team to build a front-end to allow their viewers to filter episodes of The Joy of Painting and now they’ve hired you to help them with the process of designing and building a database that will house this collected data in a way that is usable and also build an API to access it.

## Tasks

### 0. Design a Database
Please review the following datasets:

[Dataset 1](https://drive.google.com/file/d/1gWytikmlOXF4gpI4wp8VsiLGgtnA7zC9/view)

[Dataset 2](https://drive.google.com/file/d/1-13lJ5aSdkLP9VZcMlDhyivlQgw0IEmL/view)

[Dataset 3](https://drive.google.com/file/d/1yyhCgVtXtSIeYFa0eVbLWBvt3qqE4MgZ/view)

The data has been collected from numerous sources and is everything required to create a database and API that would allow your local public broadcasting station to provide a service to filter episodes of The Joy Of Painting. Though this data is great, it was collected by three different individuals and they had three different ways they chose to store data. Please review the collected data and design a database that will store all of this information in a way that will make it usable via the API to filter episodes of The Joy of Painting.

For this task you must:

Create a design document using UML documentation for the database that you will create
Create the SQL scripts required to create your database from scratch based on the design document
The SQL scripts must run locally when building your database
You may use any SQL database you choose (examples: MySql, Postgres, SqlServer, etc.)

### 1. Extract, Transform, Load
Now that you’ve got a database designed that will make the collected data usable, it’s time to get that data into your database. The data collected is currently in three different sources and none of them will perfectly align to your database structure. We’ll need to write some custom code to extract this data from the different files, transform them a bit to make sure they will be able to be stored in our database, and then ultimately load them into it for long-term storage and use by your local public broadcasting station’s audience.

In this task you must:

- Write custom scripts in any language you chose that imports the data correctly from these data files into your new database

- Be sure to match data correctly before you commit to storage.
    - Data may have inconsistencies which need to be handled either in your script or as a part of the data-cleanup process before your scripts run to store that data in the database.
    - If data is not accurate in your database, your users may not be able to use the filters correctly

### 2. API
Your database is designed and now has data to work with. The last step is to build an API that utilizes this data. Again, your local public broadcasting station has an overwhelming amount of requests for information on The Joy of Painting. Their viewers want a website that allows them to filter the 403 episodes based on the following criteria:

- Month of original broadcast
    - This will be useful for viewers who wish to watch paintings that were done during that same month of the year
- Subject Matter
    - This will be useful for viewers who wish to watch specific items get painted
- Color Palette
    - This will be useful for viewers who wish to watch specific colors being used in a painting

You must build an API that handles filtering so that the 403 episodes can be pared down to the desired episodes to watch. Multiple filters should be usable at the same time and filters should allow the user to select multiple items (like selecting multiple colors to filter by). When multiple filters are selected, the user should be able to specify if the filter should look for episodes that match all of the selected filters (meaning all filters must apply to every episode that is returned) OR be able to set the filters to look for an episode that includes one or more matches (a union of the filters, for example: one episode matches one of the colors selected but not the object painted while another episode matches on the month it aired, but not the color or object drawn).

Your API must:

- Run locally and communicate with your database to get data to the user
- Must accept parameters via the URL, query parameters, or even as POST data in the body
- Must return JSON with a list of episode information

Hint: You can use a tool called PostMan to test your API locally.

### 3. Frontend Help! - Optional
The dev deam hired to build the frontend have not met their deadlines and now your local public broadcasting station is stuck with data and a working backend, but no frontend for their customers to use the tool! You’ve proven yourself to be reliable on this project and they have asked that you help them build a single page application that uses your API.

Here you must:

- Build a SPA (single page application) that utilizes your API
- Allow users to use all three filters
- Show a list of episodes that are returned from the API

Your local public broadcasting is super appreciative of all the work you’ve done with them!

## Technologies Used
I used the PERN stack for this project:
* PostgreSQL
* Express
* React
* Node.js

## Future Improvements
* Add pagination to the frontend
* Add a loading spinner to the frontend
* Add a search bar to the frontend
* Add a dropdown menu to the frontend to select the number of episodes to display per page
* Add a dropdown menu to the frontend to sort episodes by date, subject matter, or color palette
* Add a dropdown menu to the frontend to select the order to display episodes in (ascending or descending)

## Acknowledgements
* [Holberton School](https://www.holbertonschool.com/)
* [Bob Ross](https://www.bobross.com/)
* [PBS](https://www.pbs.org/show/best-joy-painting/)

## Author
* **Heather Hayes** - [GitHub](https://github.com/hayes28) - [LinkedIn](https://www.linkedin.com/in/heatherhayes/) - [website](https://hireheather918.com/)

