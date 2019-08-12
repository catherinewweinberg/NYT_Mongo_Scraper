var router = require("express").Router();
var { Headline } = require("../models");

router.get("/", function(req, res) {
  Headline.find({ saved: false })
    .sort({ date: -1 })
    .then(function(dbArticles) {
      res.render("index", { articles: dbArticles });
    });
});

router.get("/saved", function(req, res) {
  Headline.find({ saved: true })
    .sort({ date: -1 })
    .then(function(dbArticles) {
      res.render("saved", { articles: dbArticles });
    });
});

module.exports = router;
