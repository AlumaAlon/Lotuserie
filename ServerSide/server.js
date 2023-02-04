const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 6000;
const logger = require("./middlewares/logger");
const register = require("./routes/register");
const login = require("./routes/login");
const profile = require("./routes/profile");
const users = require("./routes/users");
const products = require("./routes/products");
const cart = require("./routes/cart");
const recipes = require("./routes/recipes");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(logger);

mongoose
  .connect(process.env.db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(() => console.log("Cannot connect to server"));

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/profile", profile);
app.use("/api/all-users", users);
app.use("/api/products", products);
app.use("/api/recipes", recipes);
app.use("/api/carts", cart);
app.use("/api/carts/delete-product", cart);

app.listen(PORT, () => console.log("Server connected to port", PORT));
