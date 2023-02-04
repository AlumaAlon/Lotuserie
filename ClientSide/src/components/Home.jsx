import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getAllProducts } from "../services/productsService";
import { errorMsg } from "../services/feedbackService";
import Card from "../components/Card";
import "../css/card.css";

function Home() {
  const [products, setProducts] = useState([]);
  const productsFilter = products.filter((item) => item.category == "Products");
  const cakesFilter = products.filter((item) => item.category == "Cakes");

  React.useEffect(() => {
    getAllProducts()
      .then((result) => {
        setProducts(result.data);
      })
      .catch((err) => {
        errorMsg("Please Try Again!");
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="topDiv">
        <div className="_topTitle">
          <h1 className="text-center _topTitle" style={{ fontSize: "6rem" }}>
            Lotuserie
          </h1>
          <h1 className="text-center">
            <span className="_coloredSubTitle" style={{ fontSize: "3rem" }}>
              Indulge In a Slice Of Heaven, Anytime, Anywhere.
            </span>
          </h1>
        </div>
      </div>
      <div className="container">
        <h1 className="text-center mt-4 _coloredSubTitle2 _line2">
          Bakery Products
        </h1>
        <div className="products mt-4">
          {productsFilter
            .filter((item, index) => index < 8)
            .map((product) => {
              return (
                // CARDS
                <Card
                  key={product._id}
                  _id={product._id}
                  name={product.name}
                  category={product.category}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                />
              );
            })}
        </div>
      </div>
      <div className="container-fluid cakes mt-5 pb-5">
        <div className="container">
          <h1 className="text-center pt-4 _coloredSubTitle2 mb-4 _line2">
            Cakes
          </h1>
          <div className="products">
            {cakesFilter
              .filter((item, index) => index < 8)
              .map((product) => {
                return (
                  <Card
                    key={product._id}
                    _id={product._id}
                    name={product.name}
                    category={product.category}
                    description={product.description}
                    price={product.price}
                    image={product.image}
                  />
                );
              })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
