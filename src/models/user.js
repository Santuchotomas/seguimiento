const sequelize = require("./connection");

const User = sequelize.define("User", {
  e_mail: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataType.STRING,
    allowNull: false,
  },
});
(async () => {
await sequelize.sync();
})();

module.exports = User;
