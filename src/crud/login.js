const bcrypt = require('bcrypt');
const UserModel = require('../models/UserModel');
const { success, tableNameOnSingular } = require('../helpers/helpers');
const jwt = require('jsonwebtoken');
const privateKey = require('../auth/privateKey.js');

module.exports = (app, users) => {

    var tableNameSingular = tableNameOnSingular(users.getTableName());
    app.post('/api/login', (req, res) => {
        users.findOne( {where: {username: req.body.login.username}})
            .then(user => {
                bcrypt.compare(req.body.login.password, user.password)
                    .then(isValid => {
                        if(isValid) {
                            //JWT
                            const token = jwt.sign(
                                {userId: user.username},
                                privateKey,
                                {expiresIn: '24h'}
                            )
                            const message = "Vous avez été connecté avec succès";
                            return res.json(success(message, isValid, token))
                        } else {
                            const message = `Le password n'est pas le bon.`;
                            return res.status(401).json(success(message, isValid));
                        }
                    })
            })
            .catch(err => {
                                console.log(err)
                
                const message = `Le ${tableNameSingular} n'a pu se connecter. \n Vérifiez qu'il existe bien`;
                return res.status(500).json(success(message, err));
          
            })
    })
    

}