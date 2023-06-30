const morgan = require('morgan');
const serveFavicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = (app) => {
    // App middleware
    /* app.use((req, res, next) => {
        console.log(`URL : ${req.url}`)
        next()
    }) */

    // External middlewares
    process.env.NODE_ENV === 'developement' ?
        app.use(morgan('dev'))
            : ''

    app
        .use(serveFavicon(__dirname + '/assets/favicon-brasil-mini.png'))
        .use(bodyParser.json())
        .use(cors())

}