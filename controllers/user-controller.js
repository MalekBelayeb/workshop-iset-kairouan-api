const req = require("express/lib/request");
const userModel = require("../models/user-model");
const User = require("../models/user-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    console.log(req.body);
    let { email, password, firstname, lastname } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(404)
        .send({ success: false, message: "User already exist" });
    }
    const newUser = new User({ email, password, firstname, lastname });
    const createUser = await newUser.save();
    return res.status(200).send({ success: true, user: createUser });
  } catch (err) {
    console.log(err);
    return res.status(404).send({ err });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel
    .findOne({ email })
    .select("+isActive")
    .select("+password");

  if (!user)
    return res.status(404).json({ message: "no user with such email !" });
  console.log(user);
  if (!user.isActive)
    return res.status(404).json({ message: "account is banned ! " });

  // compare password with hash
  if (bcrypt.compareSync(password, user.password)) {
    // sign jwt token
    const token = jwt.sign(
      { userID: user._id, role: user.role },
      process.env.JWT_SECRET_TOKEN,
      { expiresIn: "6h" }
    );

    delete user._doc.password;
    delete user._doc.isActive;

    return res.status(200).json({ token, user });
  } else {
    return res.status(404).json({ message: "wrong password !" });
  }
};

module.exports = { register, signin };
