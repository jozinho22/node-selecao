const dbConfig = require("../../config.json")[process.env.NODE_ENV];
const {Sequelize} = require('sequelize');

module.exports = () => {
    const sequelize = new Sequelize(
        dbConfig.database,
        dbConfig.username,
        dbConfig.password,
        {
            dialect: dbConfig.dialect,
        }
    )

    sequelize
        .authenticate()
        .then(() => console.log(`Connexion réussie à la base ${dbConfig.database}!`))
        .catch(err => console.error(`Erreur de connexion à la base... ${err} : `));

    sequelize
        .sync({alter: true})
        .then(() => console.log(`Synchronisation réussie pour la base ${dbConfig.database}!`))

    return sequelize;

}
