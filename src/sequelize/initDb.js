const UserModel = require('../models/UserModel.js')

const ClubModel = require('../models/ClubModel.js')
const PresidentModel = require('../models/PresidentModel.js')

const CoachModel = require('../models/CoachModel.js')
const PlayerModel = require('../models/PlayerModel.js')
const genericCRUD = require('../crud/genericCRUD.js')
const login = require('../crud/login.js')

const bcrypt = require('bcrypt');

const clubsSample = require('../models/samples/clubs/clubsSample.js');
const presidentsSample = require('../models/samples/presidents/presidentsSample.js');
const coachsSample = require('../models/samples/coachs/coachsSample.js');
const playersSample = require('../models/samples/players/playersSample.js');

const createNewItems = require('../crud/actions/createNewItems.js')

module.exports = (app, sequelize) => {
    const users = UserModel(sequelize);

    const clubs = ClubModel(sequelize);
    const presidents = PresidentModel(sequelize);
    const coachs = CoachModel(sequelize);
    const players = PlayerModel(sequelize);

    clubs.hasOne(presidents, {
            foreignKey: {
                allowNull: true
            },
            onDelete: 'SET NULL'
        }
    );

    clubs.hasOne(coachs, {
            foreignKey: {
                allowNull: true
            },
            onDelete: 'SET NULL'
        }
    );

    clubs.hasMany(players, {
            foreignKey: {
                allowNull: true
            },
            onDelete: 'SET NULL'
        }
    );

/*     bcrypt.hash('jozinho', 10)
        .then(hash => {
            users.create({
                username: 'jozinho',
                password: hash,
                createdBy: 'jozinho',
            })  
        }) */
    
    genericCRUD(app, users); 
    login(app, users)

    genericCRUD(app, clubs); 
    genericCRUD(app, presidents); 
    genericCRUD(app, coachs); 
    genericCRUD(app, players); 
    

    // insert
    clubs.findAll()
        .then(items => {
            console.log("clubs.findAll()")
            console.log(items)
            console.log(clubsSample)
            items && items.length === 0 ? createNewItems(clubs, clubs.getTableName(), clubsSample) : ''
        })
    presidents.findAll()
        .then(items => {
            console.log("presidents.findAll()")
            console.log(items)
            console.log(presidentsSample)
            items && items.length === 0 ? createNewItems(presidents, presidents.getTableName(), presidentsSample) : ''
        })
    coachs.findAll()
        .then(items => {
            console.log("coachs.findAll()")
            console.log(items)
            console.log(coachsSample)
            items && items.length === 0 ? createNewItems(coachs, coachs.getTableName(), coachsSample) : ''
        })
    players.findAll()
        .then(items => {
            console.log("players.findAll()")
            console.log(items)
            console.log(playersSample) 
            items && items.length === 0 ? createNewItems(players, players.getTableName(), playersSample) : ''
        }); 
   
    /* sudo -i -u postgres  */
    /* psql  */ 
    /* \c school  */

    /* ou psql -d school -U jozinho */
 

}
