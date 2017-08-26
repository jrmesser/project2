var db = require("../models");

module.exports = function(app) {

// GET route to get all URLs associated with session ID
  app.get("/api/urls/:pw", function(req, res) {
      db.user.findAll({
          include: [{model: db.url}],
          where: {sessionId: req.params.pw}
      }).then(function(dbUser) {
          res.json(dbUser);
      });
  });

// GET route to get all URLs associated with session ID and less than or equal to the length param
    app.get("/api/urls/:pw/:length", function(req, res) {
        db.user.findAll({
            include: [{model: db.url,
                       where: {length: {$lte: req.params.length}}
                      }],
            where: {sessionId: req.params.pw}
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

// POST route to create a new URL for the session ID
    app.post("/api/urls/:pw", function(req, res) {
        db.user.findOne({
            where: {sessionId: req.params.pw}
        }).then(function(dbUser) {
            if (dbUser.id) {
                //create the newURL object to make sure we don't just pass whatevers in the body
                var newURL = {};
                newURL.url = req.body.url;
                newURL.content_type = req.body.content_type;
                newURL.length = req.body.length;
                newURL.category = req.body.category;
                newURL.userId = dbUser.id;
                newURL.archived = false;
                newURL.deleted = false;
                db.url.create(newURL, {
                    include: [{
                        association: db.url.belongsTo(db.user)
                    }]
                }).then(function() {
                    res.status(200).json(true);
                });
            }
            else {
                res.status(403).json("Something went wrong");
            }
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

//NOTE: this isn't needed
  // POST route to get all the URLs for the session ID and length
      // app.post("/api/urls/:pw/:length", function(req, res) {
      //   db.User.create(req.body).then(function(dbUser) {
      //     res.json(dbUser);
      //   });
      // });
};
