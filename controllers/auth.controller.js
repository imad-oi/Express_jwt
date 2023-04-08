
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User.js");

const login = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: " Missing data ,You must provide an email and a password",
      });
    }
  
    User.findOne({ where: { email: email }, raw: true })
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            success: false,
            error: "User not found",
          });
        }
  
        bcrypt
          .compare(password, user.password)
          .then((test) => {
            if (!test) {
              return res.status(400).json({
                success: false,
                error: "Password is incorrect",
              });
            }
  
            const token = jwt.sign(
              { id: user.id, nom: user.nom, prenom: user.prenom },
              process.env.JWT_SECRET,
              {
                expiresIn: process.env.JWT_DURATION,
              });
              return res.status(200).json({   
                  access_token: token});
                  
          })
          .catch((err) => {
            return res.status(500).json({
              success: false,
              error: err,
              Message: "Login process failed",
            });
          });
      })
      .catch((err) => {
        return res.status(500).json({
          success: false,
          error: err,
          Message: "Database error",
        });
      });
  }

module.exports = { login };