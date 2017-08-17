var db = require("../models");

module.exports = function(app) {
  app.get("/api/users", function(req, res) {
    // 1. Add a join to include all of each User's Urls
    db.User.findAll({
      include: [db.Url]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/Users/:id", function(req, res) {
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

  app.Url("/api/Users", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.delete("/api/Users/:id", function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

};
