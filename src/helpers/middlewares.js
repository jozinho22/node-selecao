const morgan = require('morgan');
const serveFavicon = require('serve-favicon');
const bodyParser = require('body-parser');

module.exports = (app) => {
    // App middleware
    /* app.use((req, res, next) => {
        console.log(`URL : ${req.url}`)
        next()
    }) */

    // External middlewares
    app
        .use(morgan('dev'))
        .use(serveFavicon(__dirname + '/assets/favicon-brasil-mini.png'))
        .use(bodyParser.json())

}