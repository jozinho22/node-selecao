const express = require('express');
const middlewares = require('./src/helpers/middlewares.js')

const authenticate = require('./src/sequelize/authenticate.js')

const StudentModel = require("./src/models/StudentModel.js");
const TeacherModel = require("./src/models/TeacherModel.js");

const studentsCRUD = require('./src/crud/studentsCRUD.js')
const genericCRUD = require('./src/crud/genericCRUD.js')

const studentsSample = require('./src/helpers/students/studentsSample.js')
const addItems = require('./src/helpers/addItems.js')
const affectItemToSubItems = require('./src/helpers/affectItemToSubItems.js')

const teachersSample = require('./src/helpers/teachers/teachersSample.js');

const app = express();
const port = 3000;

middlewares(app)
const sequalize = authenticate();

const teachers = TeacherModel(sequalize);
const students = StudentModel(sequalize);

teachers.hasMany(students, {
        foreignKey: {
            allowNull: true
        },
        onUpdate: 'CASCADE'
    }
);
students.belongsTo(teachers);

genericCRUD(app, students); 
genericCRUD(app, teachers); 

/* addItems(teachersSample, teachers);
addItems(studentsSample, students);  */
/* affectItemToSubItems(teachers, students)
 */
app.use(({res}) => {
    const message = "Impossible de trouver la ressource demandée, veuillez essayer une autre URL";
    res.status(404).json(message)
})

app.listen(port, () => {console.log(`listening on port : ${port}`)});

/* sudo -i -u postgres  */
