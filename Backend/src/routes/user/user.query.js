var db = require('../../config/db');
const jwt = require('jsonwebtoken');

exports.list_all = function(res, id) {
    db.query('SELECT * FROM user', function(err, results, fields) {
        res.status(200).json(results);
    });
    console.log(`All users are specially presents. Sayonara!`);
}

exports.list_todo = function(res, id) {
    db.query('SELECT * FROM todo WHERE user_id = ?', [id], function(err, results, fields) {
        res.status(200).json(results);
    })
    console.log(`All tasks related to user are equally presents. Sayonara!`);
}

exports.register_user = function(res, email, password, name, first_name) {
    db.execute('INSERT INTO `user` (email, password, name, firstname) VALUES (?, ?, ?, ?)', [email, password, name, first_name], function(err, results, fields) {
        const token = jwt.sign({email:email, password:password}, process.env.SECRET);
        res.status(200).json({token});
    })
    console.log("User " + name + " registered!");
}

exports.check_username = function(res, username, callback) {
    db.execute('SELECT * FROM `user` WHERE name = ?', [username], function(err, results, fields){
        if (results.length > 0){
            callback(84);
        } else {
            callback(0);
        }
    })
}

exports.check_useremail = function(res, email, callback) {
    db.execute('SELECT * FROM `user` WHERE email = ?', [email], function(err, results, fields){
        if (results.length > 0){
            callback(84);
        } else {
            callback(0);
        }
    })
}

exports.login_user = function(res, email, password, bcrypt, callback) {
    db.execute('SELECT password, id FROM `user` WHERE email = ?', [email], function(err, results, fields){
        if (results.length > 0) {
            var secondpassword = results[0].password;
            var secondid = results[0].id;
            if (bcrypt.compareSync(password, secondpassword)) {
                const token = jwt.sign({email:email, id:secondid}, process.env.SECRET);
                res.json({token});
                callback(0);
                console.log("User is logged in !");
            } else {
                callback(84);
            }
        } else {
            callback(84);
        }
    })
}

exports.info_on_email_or_id = function(res, all, next) {
    db.execute("SELECT * FROM user WHERE email = ?", [all], function(err, results, fields, next){
        if (results.length > 0){
            res.status(200).json(results);
        } else {
            db.execute("SELECT * FROM user WHERE id = ?", [all], function(err, results, fields, next){
                if (results.length > 0) {
                    res.status(200).json(results);
                } else {
                    res.status(404);
                    next();
                }
            });
        }
    });
}

exports.delete_some_user = function(res, id){
    db.execute('DELETE FROM `user` WHERE id = ?', [id], function(err, results, fields) {
        res.status(200).json({"msg":`succesfully deleted record number: ${id}`});
    });
    console.log("User deleted whip !");
}

exports.update_user_info = function(res, id, email, password, name, firstname){
    db.execute('UPDATE `user` SET email = ?, password = ?, name = ?, firstname = ? WHERE id = ?', [email, password, name, firstname, id], function(err, results, fields) {
        db.execute('SELECT id, email, password, created_at, firstname, name FROM user WHERE id = ?', [id], function(err, results, fields) {
            res.status(200).json(results);
        });
    });
    console.log("User's info thoroughly updated !");
}
