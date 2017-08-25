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

    //create Url example object
    const newUrl = {
        url: "https://www.nateliason.com/books-after-stoics/",
        content_type: "Article",
        length: "5",
        category: "Philosophy",
        archived: false,
        deleted: false,
        userId: 1
    };

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
    });

    db.url.create(newUrl, {
        include: [{
            association: db.url.belongsTo(db.user)
        }]
    });

};
module.exports = seedFunc;
