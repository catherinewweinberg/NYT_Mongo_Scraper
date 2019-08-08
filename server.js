var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Adding scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

// Requiring all models
var db = require("./models");
var PORT = 3000;

// Initialize Express
var app = express();

// Middleware
// Morgan logger for logging requests
app.use(logger("dev"));
// parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Making public a static folder
app.use(express.static("public"));

// Connect to Mongo DB
mongoose.connect("mongodb://localhost/unit18Populater", {
  useNewUrlParser: true
});

// Routes

app.get("/scrape", function(req, res) {
  axios.get("https://www.nytimes.com/").then(function(response) {
    var $ = cheerio.load(response.data);
    $("article h2").each(function(i, element) {
      var result = {};
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");
      db.Article.create(result)
        .then(function(dbArticle) {
          console.log(dbArticle);
        })
        .catch(function(err) {
          console.log(err);
        });
    });
    res.send("Scrape Complete");
  });
});
// Starting Server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
