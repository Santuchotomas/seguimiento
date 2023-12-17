const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "santu_db",
    "santu_user",
    "Se2722pw*",
    {
     host: "mysql-santu.alwaysdata.net",
     dialect: "mysql",
    }
);

module.exports = sequelize;
