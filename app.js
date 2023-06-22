const express = require('express');
let students = require('./students.js');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello express');
})

app.get('/api/students/', (req, res) => {
    console.log(students)
    res.send(JSON.stringify(students));
})

app.get('/api/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id ===id)
    res.send(JSON.stringify(student));
})

app.post('/api/students/new', (req, res) => {
    const newId = students.length;
    const newStudent = {
        id: newId,
        age: 26,
        nickname: "youssef"
    }
    res.send(`Student : ${newStudent} added to students !`);
})

app.listen(port, () => {console.log(`listening on port : ${port}`)});
