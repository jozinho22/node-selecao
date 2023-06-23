const {success} = require('../helpers/helpers.js');
const dbConfig = require("../../config.json")[process.env.NODE_ENV];
const { Op } = require("sequelize");

module.exports = (app, table) => {

    var tableName = table.getTableName(); 
    
    app.get(`/api/${tableName}/`, (req, res) => {
        table
            .findAll({
                order: [
                    ['id', 'ASC']
                ],
            })
            .then(items => {
                const message = `Voici la liste des ${tableName}`;
                res.json(success(message, items));
            })
            .catch(err => res.send(err))
    })

    app.get(`/api/${tableName}/:id`, (req, res) => {
        table
            .findByPk(req.params.id)
            .then(item => {
                const message = `Le ${table} avec l\'id ${item.id} existe bien`;
                res.json(success(message, item));
            })
            .catch(err => res.send(err))
    })

    app.post(`/api/${tableName}/`, (req, res) => {
        var newItems = [];

        for(var item of req.body[tableName]) {
            newItems.push(
                {
                ...item,
                ...{createdAt: new Date(), createdBy: dbConfig.username}
                }
            )
        }
        
        table
            .bulkCreate(newItems)
            .then(items => {
                const message = `Les ${tableName}s ont bien été créés !`;
                res.json(success(message, items));
            })
            .catch(err => {
                console.log('---------------------------');
                console.log('ERREUR LORS DE l INSERTION: ' + tableName);
                console.log(err);
                console.log('---------------------------');
                res.send(err)
            })
    })

    app.put(`/api/${tableName}/`, (req, res) => {
        var updatedItems = [];
        console.log(req.body[tableName])
        for(var item of req.body[tableName]) {
            updatedItems.push(
                {
                ...item,
                ...{updatedAt: new Date(), updatedBy: dbConfig.username}
                }
            )
        }

        table
            .bulkCreate(
                updatedItems,
                { 
                    updateOnDuplicate: Object.keys(table.getAttributes()).map(attr => attr)
                }
            )
            .then(items => {
                const message = `Les ${tableName} ci-dessous ont bien été modifiés ou ajoutés s'ils n\'existaient pas auparavant`;    
                res.json(success(message, {items}));
            })
            .catch(err => res.send(err));
    }) 

    app.delete(`/api/${tableName}/`, (req, res) => {
        var itemsIdToDelete = req.body[tableName].map(student => student.id)
        
        table
            .destroy(
                {
                    where: {
                        id: {
                            [Op.or]: itemsIdToDelete
                        }
                    }
                }
            )
            .then(nbDestroyed => {
                const message = `${nbDestroyed === 0 ? `Aucun ${tableName.substring(0, tableName.length - 1)} n'a été supprimé car non trouvé(s)` : `${nbDestroyed} ${tableName.substring(0, tableName.length - 1)} a été supprimé${nbDestroyed > 1 ? 's' : ''}` }`;
                res.json(success(message, itemsIdToDelete));
            })
            .catch(err => {res.send(err)})
    })
}