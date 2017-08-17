var db = require("./models");
var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

require("./controllers/login_routes.js")(app);

db.sequelize.sync({force: true})
    .then(() =>
          app.listen(PORT, () =>
                     {console.log(`app listening on port: ${PORT}`)
                     })
         );
