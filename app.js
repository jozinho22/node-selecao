const express = require('express');
const middlewares = require('./src/helpers/middlewares.js')

const authenticate = require('./src/sequelize/authenticate.js')
const initDb = require('./src/sequelize/initDb.js')

const app = express();
const port = 3000;

middlewares(app)
initDb(app, authenticate());

app.use(({res}) => {
    const message = "Impossible de trouver la ressource demandée, veuillez essayer une autre URL";
    res.status(404).json(message)
})

app.listen(port, () => {console.log(`listening on port : ${port}`)});