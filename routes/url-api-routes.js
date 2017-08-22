
var db = require("../models");

module.exports = function(app) {

// GET route to get session ID
  app.get("/api/urls/:pw", function(req, res) {
    db.Url.findAll({
      include: [db.user],
        where: {
          sessionId: req.params.pw
        }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

// POST route to get all the URLs for the session ID
  app.post("/api/urls/:pw", function(req, res) {
    db.Url.create(req.body).then(function(dbUser) {
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

  // GET route for filtering by length
    app.get("/api/urls/:pw/length", function(req, res) {
      db.url.findAll({
        include: [db.user],
          where: {
            db.user.sessionId: req.params.pw
            db.url.length: {
              lt: {
              req.params.length
            }
          }
      }).then(function(dbUser) {
        res.json(dbUser);
      });
    });

  // POST route to get all the URLs for the session ID and length
      app.post("/api/urls/:pw/:length", function(req, res) {
        db.User.create(req.body).then(function(dbUser) {
          res.json(dbUser);
        });
      });



};
