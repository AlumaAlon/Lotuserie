const express = require("express");
const router = express.Router();
const joi = require("joi");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginSchema = joi.object({
  email: joi.string().required().min(6).email(),
  password: joi.string().required().min(8),
});

router.post("/", async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);
    let user = await User.findOne({
      email: req.body.email,
    });
    if (!user) return res.status(400).send("Invalid email or password...");
    const result = await bcrypt.compare(req.body.password, user.password);
    if (!result) return res.status(400).send("Invalid email or password...");
    const generatedToken = jwt.sign(
      { _id: user._id, isAdmin: user.isAdmin },
      process.env.secretKey
    );
    res.status(200).send({ token: generatedToken });
  } catch (error) {
    res.status(400).send("Error in post login!");
  }
});

module.exports = router;
