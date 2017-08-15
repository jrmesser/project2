module.exports = function(sequelize, DataTypes) {
    const Password = sequelize.define('password', {
        userid: {
            type: DataTypes.INTEGER
        },
        pass_obj: {
            type: DataTypes.STRING
        }
    });

    return Password;
};
