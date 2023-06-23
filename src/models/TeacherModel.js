const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('teacher',
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
            },
            discipline: {
                type: DataTypes.STRING,
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