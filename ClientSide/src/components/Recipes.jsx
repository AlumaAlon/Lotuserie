import React, { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { getAllRecipes } from "../services/recipesService";
import { Link } from "react-router-dom";
import "../css/recipes.css";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  React.useEffect(() => {
    getAllRecipes()
      .then((result) => {
        setRecipes(result.data);
      })
      .catch((err) => {
        errorMsg("Please try agian.");
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mb-4">
        <div className="search pt-3">
          <div className="input-group flex-nowrap pt-5">
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              className="form-control search-Control w-75"
              placeholder="Search Here..."
              aria-label="Search"
              aria-describedby="addon-wrapping"
            />
          </div>
        </div>

        {recipes ? (
          <div className="products mt-3">
            {recipes
              .filter((item) => {
                return search.toLowerCase() == ""
                  ? item
                  : item.name.toLowerCase().includes(search);
              })
              .map((recipe) => {
                return (
                  <div className="product-card" key={recipe._id}>
                    <Link to={`/recipeDetails/${recipe._id}`}>
                      <img className="productImg" src={recipe.img} alt="Item" />
                    </Link>
                    <div className="product-details">
                      <h4>
                        <Link to={`/recipeDetails/${recipe._id}`}>
                          {recipe.name}
                        </Link>
                      </h4>
                      {/* In Stock / Out of stock Conditions */}
                      <p>{recipe.shortDirections}</p>
                      <div className="row">
                        <div className="col"> </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : null}
      </div>
      <Footer />
    </>
  );
}

export default Recipes;
