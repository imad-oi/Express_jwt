const {  DataTypes } = require("sequelize");
const DB = require("../db.config");


const User = DB.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "",
    },
    prenom: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "",
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "",
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true,
      // validate: {
      //   is: /^[0-9a-f]{64}$/i,
      // },
    },
    pseudo: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "",
      unique: true,
    },
  },
  { paranoid: true }
);


// Hash password before saving to database
// User.beforeCreate( async (user, options) => {
//   let hashedpassword = await bcrypt.hash(user.password , 10);
//   user.password = hashedpassword;
// });



module.exports = User;
