## Guilt Free Beauty API

## About
A RESTful API for cruelty free makeup and beauty brands. Built using Node.js (v8.6.0), Express.js (v4.14.0), MongoDB (v3.4.9) and Mongoose(v.4.7.0).

This API has been deployed to Heroku [here](https://cruelty-free-chrome-extension.herokuapp.com/api).

## Set Up
To check if Node.js is installed on your machine open a terminal window and enter:

```node -v```

If you do not already have Node.js installed please follow the instructions on [this guide](https://nodejs.org/en/download/package-manager/).

To check if npm is installed on your machine enter this command in you terminal window: 

```npm -v```

If you do not have npm already installed please follow [this guide](https://www.npmjs.com/get-npm) to set it up.

To check if git is installed on your machine please enter the following commitng in your terminal window: 

```git --version```

If you do not already have git installed on your machine please follow [this guide](https://git-scm.com/).

If you do not have MongoDB already installed, please follow [this guide](https://docs.mongodb.com/manual/installation/)

# Installation

To run this project you will need to clone it onto your local machine and install all dependencies.

To do so use the command line to navigate to your preferred directory on your local machine and enter the following command on the terminal window:

```https://github.com/jaderyan/Guilt-Free-Beauty-API.git```

Navigate inside the folder and install all dependencies by entering the following command on your terminal window: 

```npm install```

 Enter the following command in your terminal window to connect to the database and keep it running: 

```mongod```

Open another terminal window, navigate inside the project folder and enter the following command to populate the database: 

```mongoimport --db cruelty-free-api --collection companies --file seed/data/companies.json```

Finally to run the server enter the following command in your terminal window: 

```npm start```

This will run the server on port 3000. All endpoints can be found locally on http://localhost:3000 .

# Testing

To test the API navigate to the project directory and enter the following command

```npm test```

Testing was carried out using Mocha, Chai and Supertest

## API Routes

``` 
GET /api/companies 
```
Get all of the companies.

``` 
GET /api/companies/:company
```
Return details for a certain company.
```
POST /api/companies/:company
```
Add a new company. This route requires a JSON object with a name and website key value pair e.g. {"name": "New Company", "website": "https://www.newcompany.com/"}.

```
DELETE /api/companies/:company
```
Remove a company.

```
PATCH /api/companies/:company
```
Modify an existing company. This route requires a JSON object with the changes e.g. {"name": "New Company PLC"}.