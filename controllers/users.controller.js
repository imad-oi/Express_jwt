const User = require("../models/User.js");
const bcrypt = require("bcrypt");

// get all users
const getUsers = async (req, res) => {
  try {
    let users = await User.findAll();

    if (!users.length) {
      return res.status(404).json({ success: false, error: "no data found" });
    }

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(400).json({ success: false, error: err });
  }
};

//  create user
const createUser = async (req, res) => {
  const body = req.body;
  const { nom, prenom, email, pseudo, password } = req.body;

  if (!nom || !prenom || !email || !pseudo || !password) {
    return res.status(400).json({
      success: false,
      error: " Missing data ,You must provide a full data",
    });
  }

  try {
    let user = await User.findOne({ where: { email: email } });

    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(password, salt);

      user = await User.create(body);
      res
        .status(201)
        .json({ success: true, id: user.id, message: "User created!" });
    
  } catch (error) {
    res.status(500).json({ err, message: "Database error ", error: err });
  }
};

// get user by id
const getUser = async (req, res) => {
  const userId = parseInt(req.params.id);

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, error: "You must provide a user id" });
  }
  try {
    let user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ success: false, error: `User not found` });
    }
    return res.status(200).json({ success: true, data: user });

  } catch (error) {
    res.status(400).json({ success: false, error: err });
  }
};


// update user
const updateUser = async (req, res) => {
  const userId = parseInt(req.params.id);
  const { nom, prenom, email, password } = req.body;

  if (!nom || !prenom || !email || !password) {
    return res.status(400).json({ success: false, error: "Missing data ! " });
  }

  try {
    let user = await User.findOne({ where: { id: userId }});
    
    if (!user) {
      throw new Error("User not found!");
    }
    user.nom = nom;
    user.email = email;
    user.prenom = prenom;
  
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
   
      user = await user.save();
      res.status(200).json({ success: true, id: user._id, message: "User updated!" });
    
  } catch (error) {
    res.status(500).json({ message: "Database error: "+error, });
  }
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
