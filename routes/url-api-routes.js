var db = require("../models");

module.exports = function(app) {
  app.get("/api/urls", function(req, res) {
    // 1. Add a join to include all of each User's Urls
    db.Url.findAll({
      include: [db.Url]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/urls/:id", function(req, res) {
    // 2; Add a join to include all of the User's Urls here
    db.User.findOne({
      include: [db.Url],
        where: {
          id: req.params.id
        }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/urls", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.delete("/api/urls/:id", function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

};
