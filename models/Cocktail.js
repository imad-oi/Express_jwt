const { DataTypes } = require("sequelize");
const DB = require("../db.config");

const Cocktail = DB.define(
  "Cocktail",
  {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "",
    },
    desription: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "",
      unique: true,
    },
    recette: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "",
    },
  },
  { paranoid: true }
);

module.exports = Cocktail;
