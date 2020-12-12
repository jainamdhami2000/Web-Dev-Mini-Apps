//jshint esversion:6
const express = require('express');
const body_parser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.use(body_parser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/Wiki-API", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const articleSchema = mongoose.Schema({
  title: String,
  content: String
});

const Article = mongoose.model("article", articleSchema);

app.route("/articles")
  .get(function(req, res) {
    Article.find({}, function(err, foundArticles) {
      if (!err) {
        res.send(foundArticles);
      } else {
        res.send(err);
      }
    });
  })
  .post(function(req, res) {
    const article = new Article({
      title: req.body.title,
      content: req.body.content
    });
    article.save(function(err) {
      if (!err) {
        res.send("Success");
      } else {
        res.send(err);
      }
    });
  })
  .delete(function(req, res) {
    Article.deleteMany({}, function(err) {
      if (!err) {
        res.send("Deleted successfully");
      } else {
        res.send(err);
      }
    });
  });

app.route("/articles/:articleTitle")
  .get(function(req, res) {
    Article.findOne({
      title: req.params.articleTitle
    }, function(err, foundarticle) {
      if (foundarticle) {
        res.send(foundarticle);
      } else {
        res.send("Not found");
      }
    });
  })
  .put(function(req, res) {
    Article.update({
      title: req.params.articleTitle
    }, {
      title: req.body.title,
      content: req.body.content
    }, {
      overwrite: true
    }, function(err) {
      if (!err) {
        res.send("Success updation");
      }
    });
  })
  .patch(function(req, res) {
    Article.update({
      title: req.params.articleTitle
    }, {
      $set: req.body
    }, function(err) {
      if (!err) {
        res.send("success update");
      } else {
        res.send(err);
      }
    });
  })
  .delete(function(req, res) {
    Article.deleteOne({
      title: req.params.articleTitle
    }, function(err) {
      if (!err) {
        res.send("Delete success of one");
      } else {
        res.send(err);
      }
    });
  });


app.listen(3000);
