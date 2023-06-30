const { UniqueConstraintError, AggregateError } = require("sequelize");

module.exports = (table, tableName, newItems) => {
    table
        .bulkCreate(newItems[tableName], {validate: true })
        .then(items => {
            const message = `Les ${tableName} ont bien été créés !`;
            console.log("---------------")
            console.log(message)
            console.log(items)
            console.log("---------------")
        })
        .catch(err => {
            if(err instanceof AggregateError) {
                console.log(err)
            } 
            if(err instanceof UniqueConstraintError) {
                console.log(err)
            }
            console.log('---------------------------');
            console.log('ERREUR LORS DE l INSERTION: ' + tableName);
            console.log(err); 
            console.log('---------------------------');
        })
}