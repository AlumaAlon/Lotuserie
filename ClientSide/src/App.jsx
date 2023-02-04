import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "../src/components/Home";
import Products from "../src/components/Products";
import ProductDetails from "../src/components/ProductDetails";
import Cart from "../src/components/Cart";
import About from "./components/About";
import Profile from "../src/components/Profile";
import Register from "../src/components/Register";
import Login from "../src/components/Login";
import EditProduct from "../src/components/EditProduct";
import AddProduct from "../src/components/AddProduct";
import Pnf from "../src/components/Pnf";
import { getUser } from "../src/services/userService";
import { errorMsg } from "../src/services/feedbackService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Recipes from "./components/Recipes";
import RecipeDetails from "./components/RecipeDetails";
export const TokenContext = React.createContext();
export const UserContext = React.createContext();

function App() {
  const [userDetails, setUserDetails] = useState("");
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  React.useEffect(() => {
    const isLogged = sessionStorage.getItem("token");

    if (isLogged) {
      getUser()
        .then((result) => {
          setUserDetails(result.data);
        })
        .catch((err) => {
          errorMsg("Please Try Again!");
        });
    } else {
      setUserDetails("");
    }
  }, [token]);

  return (
    <div className="App">
      <ToastContainer theme="dark" />
      <UserContext.Provider value={userDetails}>
        <TokenContext.Provider value={setToken}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Register />} />
              <Route path="/signin" element={<Login setToken={setToken} />} />
              <Route
                path="/products"
                element={<Products category={"Products"} />}
              />
              <Route path="/cakes" element={<Products category={"Cakes"} />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="recipeDetails/:id" element={<RecipeDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="product/:id" element={<ProductDetails />} />
              <Route path="edit/:id" element={<EditProduct />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="*" element={<Pnf />} />
            </Routes>
          </Router>
        </TokenContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
