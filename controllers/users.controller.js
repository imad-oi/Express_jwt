const User = require("../models/User.js");
const bcrypt = require("bcrypt");

// get all users
const getUsers = async (req, res) => {
  User.findAll()
    .then((users) => {
      if (!users.length) {
        return res.status(404).json({ success: false, error: "no data found" });
      }
      res.status(200).json({ success: true, data: users });
    })
    .catch((err) => res.status(400).json({ success: false, error: err }));
};

//  create user
const createUser = async (req, res) => {
  const { nom, prenom, email, pseudo, password } = req.body;
  if (!nom || !prenom || !email || !pseudo || !password) {
    return res.status(400).json({
      success: false,
      error: " Missing data ,You must provide a full data",
    });
  }

  // check if user already exists
  User.findOne({ where: { email: email } })
    .then(async (user) => {
      if (user) {
        return res
          .status(400)
          .json({ success: false, error: "User already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(password, salt);

      User.create(req.body)
        .then((user) =>
          res
            .status(201)
            .json({ success: true, id: user.id, message: "User created!" })
        )
        .catch((error) =>
          res
            .status(500)
            .json({ error, message: "Database error : User not created !" })
        );
    })
    .catch((err) =>
      res.status(500).json({ err, message: "Database error ", error: err })
    );
};

// get user by id
const getUser = async (req, res) => {
  console.log(req.params.id);
  const userId = parseInt(req.params.id);

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, error: "You must provide a user id" });
  }

  await User.findOne({ where: { id: userId } })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: `User not found` });
      }
      return res.status(200).json({ success: true, data: user });
    })
    .catch((err) => res.status(400).json({ success: false, error: err }));
};

// update user
const updateUser = async (req, res) => {
  const userId = parseInt(req.params.id);
  const { nom, prenom, email, password } = req.body;

  if (!nom || !prenom || !email || !password) {
    return res.status(400).json({ success: false, error: "Missing data ! " });
  }

  await User.findOne({ where: { id: userId } })
    .then(async (user) => {
      console.log(user);
      // if (user === null){
      //     return res.status(404).json({ err, message: "User not found!" });
      // }
      user.nom = nom;
      user.email = email;
      user.prenom = prenom;

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      user
        .save()
        .then(() =>
          res
            .status(200)
            .json({ success: true, id: user._id, message: "User updated!" })
        )
        .catch((error) =>
          res.status(404).json({ error, message: "User not updated!" })
        );
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({ error: err, message: "User not found! " });
    });
};

// delete user
const deleteUser = async (req, res) => {
  let userId = parseInt(req.params.id);
  if (!userId) {
    return res
      .status(400)
      .json({ success: false, error: "You must provide a user id" });
  }

  User.destroy({ where: { id: userId }, force: true })
    .then((data) =>
      res.status(200).json({ success: true, message: `${data} User deleted!` })
    )
    .catch((error) =>
      res
        .status(500)
        .json({ error, message: " Database error: User not deleted!" })
    );
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
