const jwt = require('jsonwebtoken');
const privateKey = require('./privateKey.js')

module.exports = (req, res, next) => {

    const authorizationHeader = req.headers.authorization;
    if(!authorizationHeader) {
        const message = 'Veuillez fournir un jeton valide d\'authentification';
        return res.status(401).json({message})
    }

    const token = authorizationHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, privateKey, (err, decodedToken) => {
        if(err) {
            const message = 'Vous n\'avez pas les accès à cette ressource';
            return res.status(401).json({message})
        }

        const userId = decodedToken.userId;
        if(!req.body.userId) {
            const message = 'Vous devez envoyer votre userId dans le corps de la requête';
            return res.status(401).json({message})
        }
        if(req.body.userId !== userId) {
            const message = 'L\'identifiant de l\'utilisateur est invalide';
            return res.status(401).json({message})
        } else {
            next()
        }
    })

}