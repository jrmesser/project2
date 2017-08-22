
var db = require("../models");

module.exports = function(app) {

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

// POST route to get all the URLs for the session ID
  app.post("/api/urls/:pw", function(req, res) {
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
