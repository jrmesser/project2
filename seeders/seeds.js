var db = require("../models");
const crypto = require("crypto");
const cryptoRandomString = require("crypto-random-string");
const seedFunc = () => {
    //new password object: {salt: "", alg: "sha256", hash: ""}
    const newPass = {
        salt: cryptoRandomString(10),
        algorithm: "sha256",
    };
    newPass.hash = crypto.createHash("sha256").update(newPass.salt + "test").digest("hex");

    //new user object
    const newUser = {
        username: "test",
        first_name: "test",
        last_name: "test",
        country: "test",
        state: "test",
        password: {
            pass_obj: JSON.stringify(newPass)
        }
    };

    db.user.create(newUser, {
        include: [{
            association: db.user.hasOne(db.password)
        }]
    });;
};
module.exports = seedFunc;
