const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('student',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name : {
                type: DataTypes.STRING,
                allowNull: false
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            timestamps: true,
            createdAt: true,
            updatedAt: true
        }
    )
}