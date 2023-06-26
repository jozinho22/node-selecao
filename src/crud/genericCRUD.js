const {success, tableNameOnSingular} = require('../helpers/helpers.js');
const dbConfig = require("../../config.json")[process.env.NODE_ENV];
const { Op, ValidationError, UniqueConstraintError, AggregateError } = require("sequelize");
const auth = require('../auth/auth.js');

module.exports = (app, table) => {

    var tableName = table.getTableName(); 
    var tableNameSingular = tableNameOnSingular(tableName);
    
    // GET récupérer tous les éléments
    app.get(`/api/${tableName}`, auth, (req, res) => {
        const request = {}
        req.query.name ? request.where = {name: req.query.name} : '';
        request.order = [['id', 'DESC']] 
        table
            .findAll(
                request
            )
            .then(items => {
                const message = `Voici la liste des ${tableName}`;
                return res.json(success(message, items));
            })
            .catch(err => {
                const message = `La liste des ${tableName} n'a pas pu être récupéré.`;
                return res.status(500).json(success(message, err));
            })
    })

    // GET récupérer un élément par son Id
    app.get(`/api/${tableName}/:id`, auth, (req, res) => {
        table
            .findByPk(req.params.id)
            .then(item => {
                if(item === null) {
                    const message = `Le ${tableNameSingular} avec l\'id ${req.params.id} n'existe pas`;
                    return res.status(404).json(success(message, item));
                }
                const message = `Le ${tableNameSingular} avec l\'id ${item.id} existe bien`;
                return res.json(success(message, item));
            })
            .catch(err => {
                console.log(err)
                const message = `Le ${tableNameSingular} n'a pas pu être récupéré.`;
                return res.status(500).json(success(message, err));
            })
    })

    // POST créer un élément
    app.post(`/api/${tableName}/new`, auth, (req, res) => {
        var newItem = {
                ...req.body[tableNameSingular],
                ...{createdAt: new Date(), createdBy: dbConfig.username}
                };
               
        console.log(newItem)
        table
            .create(newItem)
            .then(item => {
                const message = `Le ${tableNameSingular} a bien été créé !`;
                return res.json(success(message, item));
            })
            .catch(err => {
                                console.log(err)

                if(err instanceof ValidationError) {
                    return res.status(400).json(success(err.message, err))
                } 
                if(err instanceof UniqueConstraintError) {
                    return res.status(400).json(success(err.message, err))
                }
                
                const message = `Le ${tableNameSingular} n'a pu être créé.`;
                return res.status(500).json(success(message, err));
          
            })
    })

    // POST créer un ou plusieurs éléments à partir d'un tableau
    app.post(`/api/${tableName}`, auth, (req, res) => {
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
            .bulkCreate(newItems, {validate: true })
            .then(items => {
                const message = `Les ${tableName} ont bien été créés !`;
                return res.json(success(message, items));
            })
            .catch(err => {
                if(err instanceof AggregateError) {
                    return res.status(400).json(success(err.message, err))
                } 
                if(err instanceof UniqueConstraintError) {
                    return res.status(400).json(success(err.message, err))
                }
                console.log('---------------------------');
                console.log('ERREUR LORS DE l INSERTION: ' + tableName);
                console.log(err);
                console.log('---------------------------');
                
                const message = `Les ${tableName} n'ont pas pu être créés.`;
                return res.status(500).json(success(message, err));
          
            })
    })

    // PUT modifier un ou plusieurs éléments à partir d'un tableau
    app.put(`/api/${tableName}`, auth, (req, res) => {
        var updatedItems = [];
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
                return res.json(success(message, {items}));
            })
            .catch(err => {
                if(err instanceof AggregateError) { 
                    return res.status(400).json(success(err.message, err))
                } 
                if(err instanceof UniqueConstraintError) {
                    return res.status(400).json(success(err.message, err))
                }
                const message = `Les ${tableName} n'ont pas pu être mis à jour.`;
                return res.status(500).json(success(message, err));
            })
    }) 

    // DELETE supprimer un élément par son id
    app.delete(`/api/${tableName}/:id`, auth, (req, res) => {    

        table
            .findByPk(req.params.id)
            .then(student => {
                let studentToReturn = student;

                table
                    .destroy({where: {id: req.params.id}})
                    .then(nbDestroyed => {
                        if(nbDestroyed === 0) {
                            const message = `Aucun ${tableNameSingular} n'a été supprimé car non trouvé` ;
                            return res.status(404).json(success(message, {})); 
                        }
                        const message = `Un ${tableNameSingular} a été supprimé`;
                        return res.json(success(message, {student: studentToReturn}));
                    })
                    .catch(err => {
                        console.log(err)
                        const message = `Le ${tableNameSingular} n'a pas pu être supprimé.`;
                        return res.status(500).json(success(message, err));
                    }) 
             });
    })

    // DELETE supprimer un ou plusieurs éléments à partir d'un tableau d'Id
    app.delete(`/api/${tableName}`, auth, (req, res) => {
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
                if(nbDestroyed === 0) {
                    const message = `Aucun ${tableNameSingular} n'a été supprimé car non trouvé(s)` ;
                    return res.status(404).json(success(message, {}));
                }
                const message = `${nbDestroyed} ${nbDestroyed === 1 ? `${tableNameSingular} a été supprimé` : `${tableName} ont été supprimés`}`;
                return res.json(success(message, itemsIdToDelete));
            })
            .catch(err => {
                const message = `Les ${tableName} n'ont pas pu être supprimés.`;
                return res.status(500).json(success(message, err));
            })
    })
}