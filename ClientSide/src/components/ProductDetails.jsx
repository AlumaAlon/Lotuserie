import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { errorMsg, successMsg } from "../services/feedbackService";
import { addToUserCart } from "../services/cartService";
import { UserContext } from "../App";
import "../css/productDetails.css";
import DeleteModal from "../components/DeleteModal";
import { deleteProduct } from "../services/productsService";

function ProductDetails() {
  const { id } = useParams();
  const userDetails = useContext(UserContext);
  const api = import.meta.env.VITE_API_BASE_URL || "";
  const [products] = useFetch(`${api}products/${id}`);
  const [cartChange, setCartChange] = useState(false);
  const isLogged = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const HandleAddToCart = (product) => {
    product.quantity = 1;
    product.productId = products._id;
    addToUserCart(product)
      .then(() => {
        successMsg("Product added to cart successfully!");
        setCartChange(!cartChange);
      })
      .catch((err) => errorMsg("Please try agian!"));
  };

  const handleDeleteProduct = (product) => {
    deleteProduct(product)
      .then(() => {
        successMsg(`Product deleted Successfully!`);
        navigate(-1);
      })
      .catch((err) => {
        errorMsg("Please Try Again.");
      });
  };

  return (
    <>
      <Navbar cartChange={cartChange} />
      <>
        <div className="container">
          <div className="row content my-4 mt-5">
            <div className="col-6">
              <img
                className="img-fluid productImage_  mb-4"
                src={products.image}
                alt={products.name}
              />
            </div>

            <div className="rightDiv col-xl-6 col-md-12 col-sm-12 mb-5">
              <h1 className="productDetailsTxt _coloredSubTitle">
                {products.name}
              </h1>
              <h3 className="productDetailsTxt">{products.price} ₪ </h3>

              <span className="descClass">{products.description}</span>
              <hr />
              <div className="alert alert-dark mt-3 descClass" role="alert">
                <i className="fa-solid fa-truck-arrow-right fa-lg"></i>
                <span className="fw-bold "> Free Shipping</span>
                <p>
                  Shipping is free if your order includes at least the stated
                  minimum threshold of eligible items. Any item with "FREE
                  Shipping" on the product detail page that is fulfilled and
                  shipped by Amazon is eligible and contributes to your free
                  shipping order minimum.
                </p>
                <i className="fa-solid fa-shield fa-lg"></i>{" "}
                <span className="fw-bold">Delivery Guarantees</span>
                <p>
                  We offer guaranteed delivery on certain delivery speeds and
                  select products. When guaranteed delivery is available on an
                  order, we'll state this on the checkout page, with the
                  associated delivery date and cost.
                </p>
                <i className="fa-solid fa-plane-departure"></i>{" "}
                <span className="fw-bold">
                  Domestic Expedited Shipping Options
                </span>
                <p>
                  Expedited Shipping is our express delivery option for shipping
                  to domestic addresses.
                </p>
              </div>

              {isLogged ? (
                <a
                  onClick={() => HandleAddToCart(products)}
                  className="btn _customBtn btn-lg w-100"
                >
                  <i className="fa-solid fa-cart-shopping"> </i> Add To Cart
                </a>
              ) : (
                <Link to="/signin" className="btn btn-dark btn-lg w-100 ">
                  Login To Purchase
                </Link>
              )}
              {userDetails.isAdmin ? (
                <>
                  <hr />
                  <div className="row mt-3 mx-auto">
                    <div className="col-6">
                      <Link
                        to={`/edit/${products._id}`}
                        className="btn btn-secondary w-100"
                      >
                        <i className="fa-solid fa-pen-to-square"></i> Edit
                        Product
                      </Link>
                    </div>
                    <div className="col-6">
                      {" "}
                      <DeleteModal
                        handleDeleteProduct={handleDeleteProduct}
                        product={products}
                      />
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </>
      <Footer />
    </>
  );
}

export default ProductDetails;
