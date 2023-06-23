const express = require('express');
const middlewares = require('./src/helpers/middlewares.js')

const authenticate = require('./src/sequelize/authenticate.js')

const StudentModel = require("./src/models/StudentModel.js");
const studentsCRUD = require('./src/crud/studentsCRUD.js')

const addStudents = require('./src/helpers/addStudents.js')

const app = express();
const port = 3000;

middlewares(app)
const conn = authenticate();
const studentsTable = StudentModel(conn);
studentsCRUD(app, studentsTable);
addStudents();

app.listen(port, () => {console.log(`listening on port : ${port}`)});
