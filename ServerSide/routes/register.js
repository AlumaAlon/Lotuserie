const express = require("express");
const router = express.Router();
const joi = require("joi");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Cart = require("../models/Cart");

const regsiterSchema = joi.object({
  name: joi.string().required().min(2),
  email: joi.string().required().min(6).email(),
  password: joi.string().required().min(8),
  isAdmin: joi.boolean().required(),
});

router.post("/", async (req, res) => {
  try {
    const { error } = regsiterSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);
    let user = await User.findOne({
      email: req.body.email,
    });
    if (user) return res.status(400).send("User Already Exist");
    user = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    let cart = new Cart({
      userId: user._id,
      products: [],
      active: true,
    });
    await cart.save();

    const generatedToken = jwt.sign(
      {
        _id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.secretKey
    );
    await user.save();
    res.status(201).send({ token: generatedToken });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
