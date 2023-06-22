const express = require('express');
const morgan = require('morgan');
const serveFavicon = require('serve-favicon');
const bodyParser = require('body-parser');

const {success} = require('./helpers.js');

let staticStudents = require('./students.js');

var students = [...staticStudents];

const app = express();
const port = 3000;

app.use((req, res, next) => {
    console.log(`URL : ${req.url}`)
    next()
})

app
    .use(morgan('dev'))
    .use(serveFavicon(__dirname + '/assets/favicon-brasil-mini.png'))
    .use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello express');
})

app.get('/api/students/', (req, res) => {
    res.json(students);
})

app.get('/api/students/get/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id ===id);
    const message = `L\'étudiant ${student.nickname} existe bien`;
    res.json(success(message, student));
})

app.post('/api/students/', (req, res) => {
    const newId = students.length;
    const newStudent = {
        ...{id: newId, created: new Date()},
        ...req.body
    }
    students.push(newStudent)
    let message = `L\'étudiant ${req.body.nickname} a bien été créé !`;
    res.json(success(message, newStudent));
})

app.put('/api/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedStudent = {
        ...{id: id, created: new Date()},
        ...req.body   
    }
    var oldStudent = {}
    students = students.map(student => {
        console.log(students)
        if(student.id === id) {
            oldStudent = student;
            return updatedStudent;
        } else {
            return student;
        }
    });
    
    const message = `L\'étudiant ${oldStudent.nickname} portant l\'id ${id} a bien été modifié par ${updatedStudent.nickname}`;
    res.json(success(message, updatedStudent));
})

app.delete('/api/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    var oldStudent = {}
    var studentToDelete = students.find(student => student.id === id);
    students.splice(students.indexOf(studentToDelete), 1);
    
    console.log(students)
    const message = `L\'étudiant ${oldStudent.nickname} portant l\'id ${id} a bien été supprimé`;
    res.json(success(message, {}));
})

app.listen(port, () => {console.log(`listening on port : ${port}`)});
