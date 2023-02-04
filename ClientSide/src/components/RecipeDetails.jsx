import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import "../css/recipes.css";
import Footer from "./Footer";
import Navbar from "./Navbar";

function RecipeDetails() {
  const { id } = useParams();
  const api = import.meta.env.VITE_API_BASE_URL || "";
  const [recipe] = useFetch(`${api}recipes/${id}`);

  return (
    <>
      <Navbar />
      <div className="_imgRecipe"></div>
      <div className="container infoBox">
        <div className="_content mt-4 mb-4 ">
          <h1 className="text-center mt-3 _coloredSubTitle">{recipe.name}</h1>
          <hr />
          <div className="row ">
            <div className="col-4">
              <img
                className="img-fluid recipeImg mx-3 mb-3"
                src={recipe.img}
                alt=""
              />
            </div>

            <div className="col-8 column">
              <h4 className="_coloredSubTitle2">Ingredients</h4>
              <p>{recipe.ing}</p>
              <hr />
              <h4 className="_coloredSubTitle2">Instructions:</h4>
              <p>{recipe.directions}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default RecipeDetails;
