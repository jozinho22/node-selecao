const {success} = require('../helpers/helpers.js');
const dbConfig = require("../../config.json")[process.env.NODE_ENV];
const { Op } = require("sequelize");

module.exports = (app, playersTable) => {
    
    app.get('/', (req, res) => {
        res.send('Hello express');
    })

    app.get('/api/players/', (req, res) => { 
        playersTable
            .findAll({
                order: [
                    ['id', 'ASC']
                ],
            })
            .then(players => {
                const message = `Voici la liste des joueurs`;
                res.json(success(message, players));
            })
            .catch(err => res.send(err))
    })

    app.get('/api/players/:id', (req, res) => {
        playersTable
            .findByPk(req.params.id)
            .then(student => {
                const message = `L\'étudiant ${student.name} existe bien`;
                res.json(success(message, student));
            })
            .catch(err => res.send(err))
    })

    app.post('/api/players/', (req, res) => {
        var newplayers = [];
        for(var student of req.body.players) {
            newplayers.push(
                {
                ...student,
                ...{createdAt: new Date(), createdBy: dbConfig.username}
                }
            )
        }
        
        playersTable
            .bulkCreate(newplayers)
            .then(players => {
                const message = `Les joueurs ont bien été créés !`;
                res.json(success(message, players));
            })
            .catch(err => res.send(err))
    })

    app.put('/api/players/', (req, res) => {
        var updatedplayers = [];
        for(var student of req.body.players) {
            updatedplayers.push(
                {
                ...student,
                ...{updatedAt: new Date(), updatedBy: dbConfig.username}
                }
            )
        }

        playersTable
            .bulkCreate(
                updatedplayers,
                { 
                    updateOnDuplicate: Object.keys(playersTable.getAttributes()).map(attr => attr)
                }
            )
            .then(players => {
                const message = `Les joueurs ci-dessous ont bien été modifiés ou ajoutés s'ils n\'existaient pas auparavant`;    
                res.json(success(message, {players}));
            })
            .catch(err => res.send(err));
    }) 

    app.delete('/api/players/', (req, res) => {
        var playersIdToDelete = req.body.players.map(student => student.id)

        playersTable
            .destroy(
                {
                    where: {
                        id: {
                            [Op.or]: playersIdToDelete
                        }
                    }
                }
            )
            .then(nbDestroyed => {
                const message = `${nbDestroyed} joueurs ont bien été supprimés !!!`;
                res.json(success(message, playersIdToDelete));
            })
            .catch(err => {res.send(err)})
    })
}