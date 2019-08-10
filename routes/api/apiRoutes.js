var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../../models");
// Routes
var router = require("express").Router();
router.get("/scrape", function(req, res) {
  axios.get("https://www.nytimes.com/section/us").then(function(response) {
    var $ = cheerio.load(response.data);
    var results = [];
    $("ol li").each(function(i, element) {
      var headline = $(element)
        .find("h2")
        .text();
      var summary = $(element)
        .find("h2")
        .text();
      var url = $(element)
        .find("a")
        .attr("href");

      // Save these results in an object that we'll push into the results array we defined earlier
      results.push({
        headline: headline,
        summary: summary,
        url: url
      });

      //saves into db
      db.Headline.create(results)
        .then(function(dbArticle) {
          console.log(dbArticle);
        })
        .catch(function(err) {
          // console.log(err);
        });
    });
    setTimeout(() => {
      res.redirect(301, "/");
    }, 1000);
  });
});

// Getting all articles from the DB
router.get("/articles", function(req, res) {
  db.Headline.find({})
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

router.post("/articles/:id", function(req, res) {
  db.Note.create(req.body).then(function(dbNote) {
    return db.Article.findOneAndUpdate(
      { _id: req.params.id },
      {
        note: dbNote._id
      },
      { new: true }
    );
  });
});

module.exports = router;
