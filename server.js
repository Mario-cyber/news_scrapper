// for server set up : 
let express = require("express");
// for scrapping
let logger = require("morgan");
// for database setup
let mongoose = require("mongoose");

// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
let axios = require("axios");
// scraping tools
let cheerio = require("cheerio");

// require our db models:
let db = require("./models");

// define our server port:

let PORT = 3000

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));