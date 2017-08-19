var db = require("../models");
const crypto = require("crypto");
const cryptoRandomString = require("crypto-random-string");

var controller = function(app, model) {

    app.get("/api/login", (req, res) => {
        console.log(model); 
    });
    //post will cover creating a new user and password
    // we'd expect user data as well as the password in the post body
    // we'll deploy on https so sending password won't hurt
    app.post("/api/login", (req, res) => {

        //new password object: {salt: "", alg: "sha256", hash: ""}
        const newPass = {
            salt: cryptoRandomString(10),
            algorithm: "sha256",
        };
        newPass.hash = crypto.createHash("sha256").update(newPass.salt + req.body.password).digest("hex");

        //new user object
        const newUser = {
            username: req.body.username,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            country: req.body.country,
            state: req.body.state,
            password: {
                pass_obj: JSON.stringify(newPass)
            }
        };

        db.user.create(newUser, {include: [{association: db.user.hasOne(db.password)}]}).then(() => res.json("true"));;
    });

    //put will cover login on a (hopefully) existing user
    // we'll expect the username and password in the post body
    // we'll deploy on https so sending password won't hurt
    app.put("/api/login", (req, res) => {
        db.user.findOne({username: req.body.username, include:[{model: db.password}]})
            .then(result => {
                const passObj = JSON.parse(result.password.pass_obj);
                if (result.username===req.body.username && passObj.hash === crypto.createHash("sha256").update(passObj.salt + req.body.password).digest("hex")) {
                    // create a session ID from current datetime, some salt, and the username
                    const sessionId = crypto.createHash("sha256").update(cryptoRandomString(10) + req.body.username + Date() + cryptoRandomString(10)).digest("hex");
                    // store that as the session ID of the user
                    db.user.update({sessionId: sessionId}, {where: {username: req.body.username}})
                        .then(res.json({sessionId: sessionId}));
                }
                else {
                    res.status(403).json("username or password incorrect");
                }
            })
            .catch(error => {
                res.status(403).json("username or password incorrect");
            });
   
    });
    return app;
};

module.exports = (app) => {
    return controller(app, db);
};

module.exports.controller = controller;
