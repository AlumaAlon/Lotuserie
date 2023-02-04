const mongoose = require("mongoose");

const recipiesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  directions: {
    type: String,
    required: true,
    minlength: 2,
  },
  img: {
    type: String,
    required: true,
    minlength: 2,
  },
  ing: [
    {
      type: String,
    },
  ],
});

const Recipes = mongoose.model("recipes", recipiesSchema);
module.exports = Recipes;
