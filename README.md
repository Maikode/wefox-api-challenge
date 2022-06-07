<!-- PROJECT LOGO -->
<br />
<div align="center">
    <img src="images/wefox_logo.png" alt="Logo" width="300" height="80">
  <p> CHALLENGE API REST</p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-challenge">About Challenge</a>
      <ul>
        <li><a href="#introduction">Introduction</a></li>
      </ul>
    </li>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#testing">Testing</a></li>

</details>
</br>

<!-- ABOUT THE PROJECT -->

## About Challenge

### Introduction

This project has been developed for the technical test of the company Wefox. This project consists in the implementation of a REST API service for address validation and obtaining the current weather.

The endpoints to implement are the following:

1. Login following the OAuth2 standard.
2. Receives an address and validate if its real.
3. Receives an address and check the weather with the latitude and longitude of that address.

For this challenge a swagger file has been generated with all the information about the endpoints developed for the REST API following the OpenAPI3.0 specifications.

<p align="right">(<a href="#top">back to top</a>)</p>

## About the project

This project has been implemented together with a clean architecture (hexagonal architecture) divided by contexts oriented to the resources offered by the API.

Context:

-   User
-   Address
-   Weather

In each context, different layers have been added following the architecture:

```scala
src
├── context
│   ├── address
│   │   ├── application
│   │   ├── domain
│   │   └── infrastructure
│   ├── shared
│   │   ├── domain
│   │   └── infrastructure
│   ├── user
│   │   ├── application
│   │   ├── domain
│   │   └── infrastructure
│   └── weather
│       ├── application
│       ├── domain
│       └── infrastructure
├── index.ts
└── server.ts
```

### Built With

Following the specifications of the challenge, the technologies used are as follows:

1. Development Stack.

    - [Node.js](https://nodejs.org/es/) v16.14.0
    - [NPM](https://www.npmjs.com/) v8.7.0
    - [Typescript](https://www.typescriptlang.org/) v4.6
    - [Express](https://expressjs.com/es/) v4.18.1
    - [Jest](https://jestjs.io/) v28.1
    - [Docker](https://www.docker.com/) v4.7.1

2. External Services

    - [MongoDB](https://www.mongodb.com/es) v5.0 (latest) for users
    - [Nominatim API](https://nominatim.org/release-docs/develop/api/Search/) for address
    - [7Timer!](http://www.7timer.info/doc.php) for weather

3. Tools
    - [MongoDBCompass](https://www.mongodb.com/es/products/compass) as mongo db GUI tool

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

-   **Nodejs and NPM**

    Have **node** and **npm** installed locally with the version v16.14.0 or higher.

    **Docker**

    When you run the container locally **for the first time**, the database will be empty, so you will have to create a collection of `users` and insert a sample document to be able to call the `/login` service correctly.

    Follow these steps to insert such a test document:

    1. Run the docker container with:
        ```sh
        npm run docker:start
        ```
    2. Connect with a mongo client ( like MongoDB Compass ) with this URL:
        ```sh
        mongodb://root:admin@127.0.0.1:27017
        ```
    3. Open `wefox` database and create a collection named `users`.

    4. Add a new document for an `user`, u can copy this example:

        ```sh
            {
                "email": "email@example.com",
                "password": "$2b$10$JFT6.c15TaHoVomhS4tPR.kz2M8I0122b874/NWUmQGeu0xZVWium"
            }
        ```

        Keep in mind the password is hashed with the [`bcrypt`](https://www.npmjs.com/package/bcrypt) library to add a further level of database security.
        This hash is the result of encrypting the plain text password with value: ` password`.
        So, the user credentials are:

        ```sh
            {
                "email": "email@example.com",
                "password": "password"
            }
        ```

### Installation

1. Clone the repo
    ```sh
    git clone https://github.com/Maikode/wefox-api-challenge
    ```
2. Install NPM packages
    ```sh
    npm install
    ```
3. Execute in developer mode
    ```sh
    npm run start:dev
    ```
4. It can also be run in production
    ```sh
    npm run start:prod
    ```

## Teting

In order to carry out the tests, jest has been used together with some libraries to make visual reports on the results of the executions.

1. To Execute testing

    ```sh
    npm run test
    ```

The reports are generated in HTML format in the folder "reports".

```scala
tests
├── context
├── e2e
└── reports
```

Examples of reports generated:

-   Test results
    </br></br><img src="images/result_tests.png" alt="results tests">

-   Coverage test
    </br></br><img src="images/result_coverage.png" alt="results tests">
