const UserModel = require('../models/UserModel.js')

const TeacherModel = require('../models/TeacherModel.js')
const StudentModel = require('../models/StudentModel.js')
const genericCRUD = require('../crud/genericCRUD.js')
const login = require('../crud/login.js')

const bcrypt = require('bcrypt');

module.exports = (app, sequelize) => {
    const users = UserModel(sequelize);

    const teachers = TeacherModel(sequelize);
    const students = StudentModel(sequelize);

    teachers.hasMany(students, {
            foreignKey: {
                allowNull: true
            },
            onUpdate: 'CASCADE'
        }
    );
    students.belongsTo(teachers);

/*     bcrypt.hash('jozinho', 10)
        .then(hash => {
            users.create({
                username: 'jozinho',
                password: hash,
                createdBy: 'jozinho',
            })  
        }) */
    
    genericCRUD(app, students); 
    genericCRUD(app, teachers); 
    genericCRUD(app, users); 
    login(app, users)

    /* sudo -i -u postgres  */
    /* psql  */
    /* \c school  */

    /* ou psql -d school -U jozinho */


}
