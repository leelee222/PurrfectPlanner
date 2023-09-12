const {list_all, list_todo, info_on_email_or_id, delete_some_user, update_user_info} = require('./user.query');
const auth = require('../../middleware/auth');

module.exports = function(app, bcrypt){
    app.get('/user', auth, (req, res) => {
        list_all(res);
    });
    app.get('/user/todos', auth, (req, res, next)=> {
        list_todo(res, req.user, next);
    });
    app.get('/user/:id', auth, (req, res) => {
        var id = req.params.id;
        info_on_email_or_id(res, id);
    });
    app.get('/user/:email', auth, (req, res) => {
        var email = req.params.email;
        info_on_email_or_id(res, email);
    });
    app.delete('/user/:id', auth, (req, res) => {
        var id = req.params.id;
        delete_some_user(res, id);
    });
    app.put('/user/:id', auth, (req, res) => {
        var id = req.params.id;
        var email = req.body["email"];
        var name = req.body["name"];
        var firstname = req.body["firstname"];
        var password = req.body["password"];

        if (id === null || email === null || name === null  ||
        firstname === null || password === null) {
            res.status(500).json({"msg":"Bad parameter"});
            return;
        }
        password = bcrypt.hashSync(password, 10);
        update_user_info(res, id, email, password, name, firstname);
    });
}
