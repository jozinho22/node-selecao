const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('coach',
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
            createdBy:{
                type: DataTypes.STRING,
                allowNull: true
            },
            createdAt:{
                type: DataTypes.DATE,
                allowNull: true
            },
            updatedBy:{
                type: DataTypes.STRING,
                allowNull: true
            },
            updatedAt:{
                type: DataTypes.DATE,
                allowNull: true
            }
        },{
            tableName: 'coachs'
        },{
            /* createdAt: true, */
           /*  updatedAt: true, */
            timestamps: true
        }
    )
}