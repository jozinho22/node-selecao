const studentsSample = require('../models/studentsSample.js');

module.exports = async () => {
    console.log(studentsSample)
    await fetch('http://localhost:3000/api/students/', {
        method: 'post',
        body: JSON.stringify(studentsSample),
        headers: {'Content-Type': 'application/json'}
    });
}