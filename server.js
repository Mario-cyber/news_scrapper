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
let db = require("./models/Index");

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

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/unit18Populater", {
    useNewUrlParser: true
});

// display HTML 
app.get("/", function (req, res) {
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
            let result = {}
            // find the tittle of our article
            result.title = $(element).text().trim()
            // console.log(result.title)
            // find the link
            result.link = $(element).attr('href')
            // console.log(result.link) 

            db.News.create(result)
                .then(function (dbNews) {
                    // View the added result in the console
                    console.log(dbNews);
                })
                .catch(function (err) {
                    // If an error occurred, log it
                    console.log(err);
                });

        })
    });
    res.send("Scrape Complete")
});

// route to display JSON fomatted result from scrapping 
app.get("/news", function (req, res) {
    // Grab every document in the News collection
    db.News.find({})
        .then(function (dbNew) {
            // If we were able to successfully find news, send them back to the client
            res.json(dbNew);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// cearing databases  

// app.delete("/clear", function (req, res) {
//     db.News.deleteMany({})
//         .then(function (dbNew) {
//             console.log("Articles deleted.");
//             res.json("deleted");
//         })
//         .catch(function (err) {
//             res.json(err);
//         })
// })​


app.get("/public/app.js", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/"));
})

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});