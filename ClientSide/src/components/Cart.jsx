import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  getProductsInCart,
  deleteProducts,
  deleteProductFromCart,
} from "../services/cartService";
import { errorMsg, successMsg } from "../services/feedbackService";
import "../css/cart.css";

function Cart() {
  const [products, setProducts] = useState([]);
  const isLogged = sessionStorage.getItem("token");
  const [isChanged, setIsChanged] = useState(false);
  const [cart, setCart] = useState("");
  const sum = cart ? cart.reduce((total, item) => total + item.price, 0) : null;

  const handleDelete = () => {
    deleteProducts(cart)
      .then(() => {
        successMsg("Thank you for buying Lotuserie! ");
        setIsChanged(!isChanged);
      })
      .catch((err) => errorMsg("Please try agian."));
  };

  const handleDeleteProductFromCart = (product) => {
    deleteProductFromCart(product)
      .then(() => {
        successMsg(`Product deleted Successfully!`);
        setIsChanged(!isChanged);
      })
      .catch((err) => {
        errorMsg("Please Try Again.");
      });
  };

  React.useEffect(() => {
    if (isLogged) {
      getProductsInCart()
        .then((result) => {
          setCart(result.data);
        })
        .catch((err) => {
          errorMsg("Please Try Again.");
        });
    }
  }, [isChanged]);

  return (
    <>
      <Navbar cartRender={isChanged} />
      {cart.length ? <div className="_imgCart "></div> : null}
      <div className="container _contaDiv ">
        {cart.length ? (
          <div className="px-4 px-lg-0">
            <div className="pb-3">
              <div className="container">
                <div className="row p-4 bg-white cartContainer rounded shadow-sm mt-3">
                  <div className="col-lg-12 ">
                    <div className="container cart-page mb-4">
                      <table className="w-100">
                        <tbody>
                          <tr className="text-center bg-dark text-white text-uppercase cartContainer2">
                            <th className="w-50 th">Product Details</th>
                            <th className="th">Quantity</th>
                            <th className="th">Price</th>
                            <th className="th">Actions</th>
                          </tr>
                          {cart.map((product) => {
                            return (
                              <tr className="fw-bold" key={product._id}>
                                <td>
                                  <div className="cart-info">
                                    <img
                                      className="rounded"
                                      src={product.image}
                                      alt="Product"
                                    />

                                    <div className="prodName">
                                      <h6 className="dots">{product.name}</h6>
                                    </div>
                                  </div>
                                </td>
                                <td className="text-center">
                                  {product.quantity}
                                </td>
                                <td className="text-center ">
                                  {product.price} ₪
                                </td>
                                <td
                                  className="text-center"
                                  onClick={() =>
                                    handleDeleteProductFromCart(product)
                                  }
                                >
                                  <i className="fa-solid fa-trash-can text-danger fa-lg"></i>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <hr />
                    <div className="bg-dark text-white px-4 py-2 mt-5 text-uppercase fw-bold cartContainer2">
                      Order Details{" "}
                    </div>
                    <div>
                      <ul className="list-unstyled mb-4">
                        <li className="d-flex justify-content-between py-3 border-bottom">
                          <strong className="text-muted">SubTotal</strong>
                          <h5 className="fw-bold cartItemName">{sum}.00 ₪</h5>
                        </li>
                      </ul>
                      <div id="payNow">
                        <button
                          className="btn _customBtn"
                          onClick={() => handleDelete(products)}
                        >
                          Complete Purchase
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="cartMessage text-center">
            <h4 className="text-center mt-5">Whoops.. Your Cart is Empty.</h4>
            <h5 className="text-center mt-3">
              Looks like you have not added anything to your cart.
            </h5>
            <img
              className="cartImg img-fluid mb-4"
              src="emptyCart.png"
              alt="emptyCart"
            />
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Cart;
