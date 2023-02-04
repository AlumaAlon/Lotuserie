import React, { useState, useContext } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { getAllProducts } from "../services/productsService";
import Card from "./Card";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

function Product({ category }) {
  const userDetails = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const productsApiRequest = async (productCategory) => {
    const request = await getAllProducts();
    if (request.status === 200) {
      const productsList = request.data.filter((item) => {
        return item.category === productCategory;
      });
      setProducts(productsList);
    }
  };

  React.useEffect(() => {
    productsApiRequest(category);
  }, [category]);

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
            {userDetails.isAdmin && category == category ? (
              <Link to="/add-product" className="btn btn-success">
                Add Product
              </Link>
            ) : null}
          </div>
        </div>

        {products ? (
          <div className="products mt-3">
            {products
              .filter((item) => {
                return search.toLowerCase() == ""
                  ? item
                  : item.name.toLowerCase().includes(search);
              })
              .map((product) => {
                return (
                  <Card
                    _id={product._id}
                    image={product.image}
                    hot={product.hot}
                    category={product.category}
                    description={product.description}
                    rate={product.rate}
                    name={product.name}
                    price={product.price}
                    inStock={product.inStock}
                    key={product._id}
                  />
                );
              })}
          </div>
        ) : null}
      </div>
      <Footer />
    </>
  );
}

export default Product;
