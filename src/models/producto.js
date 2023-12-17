const { DataTypes } = require("sequelize");
const sequelize = require("./connection");

const Producto = sequelize.define();

module.exports = Producto;
