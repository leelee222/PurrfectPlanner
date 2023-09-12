var db = require('../../config/db');

exports.all_tasks = function(res) {
    db.query('SELECT * FROM todo', function(err, results, fields){
        res.status(200).json(results);
    });
    console.log("All tasks listed carefully !");
}

exports.tasks_id = function(res, id) {
    db.execute('SELECT * FROM todo WHERE id = ?', [id], function(err, results, fields){
        res.status(200).json(results);
    });
}

exports.create_task = function(res, title, description, duetime, userid, status){
    db.execute('INSERT INTO todo (title, description, due_time, status, user_id) VALUES (?, ?, ?, ?, ?)', [title, description, duetime, status, userid], function(err, results, fields){
        var id_not = results["insertId"];
        db.execute('SELECT * FROM todo WHERE id = ?', [id_not], function(err, results, fields){
            res.status(200).json(results);
        });
    });
    console.log("New task inserted !");
}

exports.delete_some_tasks = function(res, id){
    db.execute('DELETE FROM todo WHERE id = ?', [id], function(err, results, fields) {
        res.status(200).json({"msg":`succesfully deleted record number: ${id}`});
    });
    console.log("Task deleted in a whip !");
}

exports.update_tasks = function(res, id, title, description, duetime, userid, status){
    db.execute('UPDATE todo SET title = ?, description = ?, due_time = ?, user_id = ?, status = ?, WHERE id = ?', [title, description, duetime, userid, status, id], function(err, results, fields) {
        db.execute('SELECT id, title, description, due_time, user_id, status FROM todo WHERE id = ?', [id], function(err, results, fields) {
            res.status(200).json(results);
        });
    });
    console.log("User's info thoroughly updated !");
}
