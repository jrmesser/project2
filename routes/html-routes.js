
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads home.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/signup", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/discover", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/discover.html"));
  });

  app.get("/liked", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/liked.html"));
  });

  app.get("/settings", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/settings.html"));
  });

};
