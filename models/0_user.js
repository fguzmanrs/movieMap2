module.exports = function(sequelize, Sequelize) {
  var User = sequelize.define(
    "user",
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      firstName: { type: Sequelize.STRING, allowNull: false },
      lastName: { type: Sequelize.STRING, allowNull: false },
      username: { type: Sequelize.STRING, allowNull: false, unique: true },
      email: { type: Sequelize.STRING, allowNull: false },
      password: { type: Sequelize.STRING, allowNull: false },
      photo: { type: Sequelize.STRING, defaultValue: "default.png" },
      passwordResetToken: { type: Sequelize.STRING, allowNull: true }
    },
    {
      freezeTableName: true
    }
  );
  console.info("Sequelize: ./models/user.js");
  return User;
};
