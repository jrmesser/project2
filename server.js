var express = require("express");
var bodyParser = require("body-parser");

var app = express();

//load db and seed file
var db = require("./models");
var seedFunc = require("./seeders/seeds.js");

var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("public"));

require("./routes/html-routes.js")(app);
require("./routes/url-api-routes.js")(app);
require("./controllers/login_routes.js")(app);

db.sequelize.sync({force: true})
    .then(() => {
          //create a user using the seed file
          seedFunc();

          app.listen(PORT, () =>{
              console.log(`app listening on port: ${PORT}`);
          });
    });
