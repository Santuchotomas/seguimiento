const { Sequelize } = require("sequelize");
const mysql2 = require("mysql2"); //vercel

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,

  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectModule: mysql2, // vercel
  }
);

module.exports = sequelize;
