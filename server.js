var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
// Requiring all models
// var db = require("./models");
var PORT = 3000;

// Initialize Express
var app = express();
var routes = require("./routes");
console.log(routes);
// Middleware
// Morgan logger for logging requests
app.use(logger("dev"));
// parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Making public a static folder
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(routes);
// Connect to Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/MongoScraper";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Starting Server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
