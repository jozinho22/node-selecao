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
            .catch(err => res.send(err))
    })

    app.get('/api/students/:id', (req, res) => {
        studentsTable
            .findByPk(req.params.id)
            .then(student => {
                const message = `L\'étudiant ${student.name} existe bien`;
                res.json(success(message, student));
            })
            .catch(err => res.send(err))
    })

    app.post('/api/students/', (req, res) => {
        var newStudents = [];
        for(var student of req.body.students) {
            newStudents.push(
                {
                ...student,
                ...{createdAt: new Date(), createdBy: dbConfig.username}
                }
            )
        }
        
        studentsTable
            .bulkCreate(newStudents)
            .then(students => {
                const message = `Les étudiants ont bien été créés !`;
                res.json(success(message, students));
            })
            .catch(err => res.send(err))
    })

    app.put('/api/students/', (req, res) => {
        var updatedStudents = [];
        for(var student of req.body.students) {
            updatedStudents.push(
                {
                ...student,
                ...{updatedAt: new Date(), updatedBy: dbConfig.username}
                }
            )
        }

        studentsTable
            .bulkCreate(
                updatedStudents,
                { 
                    updateOnDuplicate: Object.keys(studentsTable.getAttributes()).map(attr => attr)
                }
            )
            .then(students => {
                const message = `Les étudiants ci-dessous ont bien été modifiés ou ajoutés s'ils n\'existaient pas auparavant`;    
                res.json(success(message, {students}));
            })
            .catch(err => res.send(err));
    }) 

    app.delete('/api/students/', (req, res) => {
        var studentsIdToDelete = req.body.students.map(student => student.id)

        studentsTable
            .destroy(
                {
                    where: {
                        id: {
                            [Op.or]: studentsIdToDelete
                        }
                    }
                }
            )
            .then(nbDestroyed => {
                const message = `${nbDestroyed} étudiants ont bien été supprimés !!!`;
                res.json(success(message, studentsIdToDelete));
            })
            .catch(err => {res.send(err)})
    })
}