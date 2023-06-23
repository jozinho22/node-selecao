const {success} = require('../helpers/helpers.js');
const dbConfig = require("../../config.json")[process.env.NODE_ENV];
const { Op } = require("sequelize");

module.exports = (app, studentsTable) => {

    app.get('/', (req, res) => {
        res.send('Hello express');
    })

    app.get('/api/students/', (req, res) => {
        studentsTable
            .findAll({
                order: [
                    ['id', 'ASC']
                ],
            })
            .then(students => {
                const message = `Voici la liste des étudiants`;
                res.json(success(message, students));
            })
    })

    app.get('/api/students/:id', (req, res) => {
        studentsTable
            .findByPk(req.params.id)
            .then(student => {
                const message = `L\'étudiant ${student.name} existe bien`;
                res.json(success(message, student));
            })
    })

    app.post('/api/students/', (req, res) => {
        var newStudents = [];
        for(var student of req.body.students) {
            const newStudent = {
                ...student,
                ...{createdAt: new Date(), createdBy: dbConfig.username}
            }
            newStudents.push(newStudent);
        }
        
        studentsTable.bulkCreate(newStudents)
        const message = `Les étudiants ont bien été créés !`;
        res.json(success(message, req.body.students));
    })

    app.put('/api/students/', (req, res) => {
        var updatedStudents = [];
        for(var student of req.body.students) {
            const updatedStudent = {
                ...student,
                ...{updatedAd: new Date(), updatedBy: dbConfig.username}
            }
            updatedStudents.push(updatedStudent);
        }

         updatedStudents.map(student => {
                studentsTable.update(
                    student,
                    {
                        where: {
                            id: student.id
                        }
                    }
                )
        })
        
        const message = `Les étudiants ci-dessous ont bien été modifiés`;
        res.json(success(message, updatedStudents));
    })

    app.delete('/api/students/', (req, res) => {
        var studentsIdToDelete = req.body.students.map(student => student.id)

        studentsTable.destroy(
            {
                where: {
                    id: {
                        [Op.or]: studentsIdToDelete
                    }
                }
            })
        
        const message = `Les étudiants ont bien été supprimés !!!`;
        res.json(success(message, studentsIdToDelete));
    })
}