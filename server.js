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
// Parse request body as JSON
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));


// display HTML 
app.get("/survey", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));

});

// using a GET route to carry out our scrapping 
app.get("/scrape", function (req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://www.bbc.com/").then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);

        $(".media__link").each((index, element) => {
            // define an empty object to save data 
            let article = {}
            // find the tittle of our article
            article.tittle = $(element).text()
            console.log(article.tittle)
            // find the link
            article.link = $(element).attr('href')
            console.log(article.link)
        })
    });
    res.send("Scrape Complete")
});

app.get("/dummy.js", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/"));
})

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});