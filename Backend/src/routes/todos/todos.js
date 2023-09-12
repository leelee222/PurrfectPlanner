const {all_tasks, tasks_id, create_task, delete_some_tasks, update_tasks} = require('./todos.query');
//const checkStatus = require('../../middleware/notFound');
const auth = require('../../middleware/auth');
// const express = require('express');
// const app = express();
// app.use(checkStatus);

module.exports = function(app, bcrypt){
    app.get('/todos', auth, (req, res) => {
        all_tasks(res);
    });
    app.post('/todos', auth, (req, res) => {
        var title = req.body["title"];
        var description = req.body["description"];
        var duetime = req.body["due_time"];
        var user_id = req.body["user_id"];
        var status = req.body["status"];
        if (title === null || description === null || duetime === null  ||
        user_id === null || status === null) {
                res.status(500).json({"msg":"Bad parameter"});
                return;
        }
        create_task(res, title, description, duetime, user_id, status);
    });
    app.get('/todos/:id', auth, (req, res) => {
        var id = req.params.id;
        tasks_id(res, id);
    });
    app.delete('/todos/:id', auth, (req, res) => {
        var id = req.params.id;
        delete_some_tasks(res, id);
    });
    app.put('/todos/:id', auth, (req, res) => {
        var id = req.params.id;
        var title = req.body["title"];
        var description = req.body["description"];
        var duetime = req.body["due_time"];
        var user_id = req.body["user_id"];
        var status = req.body["status"];
        if (id === null || title === null || description === null || duetime === null ||
        user_id === null || status === null) {
                res.status(500).json({"msg":"Bad parameter"});
                return;
        }
        update_tasks(res, id, title, description, duetime, user_id, status);
    });
}