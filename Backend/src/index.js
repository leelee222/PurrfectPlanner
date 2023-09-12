require ('dotenv').config();
var bcrypt = require('bcryptjs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
app.use(express.json())
app.use(express.raw())
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
const database = require('./config/db');
const checkStatus = require('./middleware/notFound');
require('./routes/user/user')(app, bcrypt);
require('./routes/todos/todos')(app, bcrypt);
require('./routes/auth/auth')(app, bcrypt);
app.use(checkStatus);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})
