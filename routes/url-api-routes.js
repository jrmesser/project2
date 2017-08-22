url-api-routes


var db = require("../models");

module.exports = function(app) {

  // GET route for getting all of the URLs

  app.get("/api/urls", function(req, res) {

// GET post for getting all of the URLs
  var query = {};
  if (req.query.username) {
    query.user_id = req.query.username;
  }
    // 1. Add a join to include all of each User's URLs
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

// GET route to get session ID
  app.get("/api/urls/:pw", function(req, res) {
    db.User.findAll({
      include: [db.Url],
        where: {
          sessionId: req.params.pw
        }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

// POST route to get all the URLs
  app.post("/api/urls", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // app.delete("/api/urls/:id", function(req, res) {
  //   db.User.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbUser) {
  //     res.json(dbUser);
  //   });
  // });

};
