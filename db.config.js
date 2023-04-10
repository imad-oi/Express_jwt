const { Sequelize } = require("sequelize");

let sequelize = new Sequelize("hospitalrun", "root", "", {
  host: process.env.DB_HOST,
  dialect: "mysql",
  logging: false,
});


// const db = {};
// db.user = require("./models/User.js")(sequelize);
// db.Cocktail = require("./models/Cocktail.js")(sequelize);


sequelize.sync({ force: false }).then(() => {
  console.log("Database & tables created!");
});

module.exports = sequelize;
