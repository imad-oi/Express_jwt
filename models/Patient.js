const {  DataTypes } = require("sequelize");
const DB = require("../db.config");
;

const Patient = DB.define('Patient', {
    id: {   
        type: DataTypes.INTEGER(10),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sexe: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pays: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateNaissance: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
});

// (async () => {
//   await DB.sync({ force: true }); // Sync the model with the database and drop the table if it exists
//   console.log("The Patient model has been synchronized with the database");
// })();

module.exports = Patient;
