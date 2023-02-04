const express = require("express");
const router = express.Router();
const Recipes = require("../models/Recipe");

router.get("/", async (req, res) => {
  try {
    let recipes = await Recipes.find();
    res.status(200).send(recipes);
  } catch (error) {
    res.status(400).send("Error in get Recipes");
  }
});

router.get("/:id", async (req, res) => {
  try {
    let recipes = await Recipes.findOne({ _id: req.params.id });
    if (!recipes) return res.status(404).send("Theres no such Recipe");
    res.status(200).send(recipes);
  } catch (error) {
    res.status(400).send("Error in get Recipe...");
  }
});

module.exports = router;
