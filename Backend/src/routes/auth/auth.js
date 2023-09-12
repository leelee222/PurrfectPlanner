const jwt = require('jsonwebtoken');
const {register_user, check_useremail, login_user} = require('./../user/user.query');

module.exports = function(app, bcrypt) {
    app.post('/login', (req, res) => {
        var email = req.body["email"];
        if (email === null || req.body["password"] === null) {
            res.status(500).json({"msg":"Bad parameter"});
            return;
        }
        login_user(res, email, req.body["password"], bcrypt, function(nbr) {
            if (nbr == 84) {
                res.status(401).json({"msg":"Invalid Credentials"});
            }
            return;
        });
    });
    app.post('/register', (req, res) => {
        var email = req.body["email"];
        var name = req.body["name"];
        var firstname = req.body["firstname"];
        var password = req.body["password"];
        if (email === null || name === null  ||
        firstname === null || password === null) {
            res.status(500).json({"msg":"Bad parameter"});
            return;
        }
        password = bcrypt.hashSync(password, 10);
        check_useremail(res, email, function(nbr) {
            if (nbr == 84) {
                res.status(409).json({"msg":"account already exist"});
                return;
            } else {
                register_user(res, email, password, name, firstname);
                return;
            }
        });
    });
}