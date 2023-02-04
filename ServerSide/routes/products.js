const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const joi = require("joi");
const Product = require("../models/Product");

const productSchema = joi.object({
  name: joi.string().required().min(2),
  price: joi.number().required().min(2),
  category: joi.string().required().min(2),
  description: joi.string().required().min(6),
  image: joi.string().required(),
});

router.post("/", auth, async (req, res) => {
  try {
    if (!req.payload.isAdmin)
      return res.status(400).send("Only Admin can add Products..");
    const { error } = productSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);
    let product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    let products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send("Error in get Products");
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    if (!req.payload.isAdmin)
      return res.status(400).send("Only Admin can add Products..");
    const { error } = productSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);
    let product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!product) return res.status(404).send("No Such Product");
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    if (!req.payload.isAdmin)
      return res.status(400).send("Only Admin can add Products..");
    let product = await Product.findOneAndRemove({ _id: req.params.id });
    if (!product) return res.status(400).send("Product was not found!");
    res.status(200).send("Product Removed Successfully!");
  } catch (error) {
    res.status(400).send("Error in delete Product");
  }
});

router.get("/:id", async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id });
    if (!product) return res.status(404).send("Theres no such product");
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send("Error in get Product...");
  }
});

module.exports = router;
