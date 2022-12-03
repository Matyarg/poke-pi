
const { DataTypes } = require ("sequelize");


module.exports = (Sequelize) => {
    Sequelize.define("type",{
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        createdb: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

    })
    {
        timestamps: false;
    }

}