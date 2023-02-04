import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../css/navbar.css";
import "../css/home.css";
import { getProductsInCart } from "../services/cartService";
import { successMsg, errorMsg } from "../services/feedbackService";
import { TokenContext, UserContext } from "../App";

function Navbar(props) {
  const setToken = useContext(TokenContext);
  const userDetails = useContext(UserContext);
  const [isChanged, setIsChanged] = useState(false);
  const [cart, setCart] = useState("");
  const navigate = useNavigate();
  const isLogged = sessionStorage.getItem("token");
  const cartChange = props.cartChange;
  const cartRender = props.cartRender;

  // logout
  const handleLogout = () => {
    setIsChanged(!isChanged);
    sessionStorage.removeItem("token");
    setToken("");
    successMsg("You Logged Out Successfully!");
    navigate("/");
  };

  React.useEffect(() => {
    if (isLogged) {
      // Get Products From Cart
      getProductsInCart()
        .then((result) => {
          setCart(result.data);
        })
        .catch((err) => {
          errorMsg("Please Try Again!");
        });
    }
  }, [isChanged, cartChange, cartRender]);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container">
          <NavLink className="navbar-brand bakeryLogo" to="/">
            <img
              className="navLogo img-fluid"
              src="../../Logo.png"
              alt="Logo"
            />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse navLinks"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link underlineEffect" to="/products">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link underlineEffect" to="/cakes">
                  Cakes
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link underlineEffect" to="/recipes">
                  Recipes
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link underlineEffect" to="/about">
                  About Lotuserie
                </NavLink>
              </li>
            </ul>

            <div className="nav-item dropdown text-light">
              {/* CART */}
              <NavLink className="position-relative navLink" to="/cart">
                {cart.length ? (
                  <>
                    <i className="fa-solid fa-cart-shopping fa-lg hoverIcon navLink"></i>

                    <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                      <span className="visually-hidden">New alerts</span>
                    </span>
                  </>
                ) : (
                  <i className="fa-solid fa-cart-shopping fa-lg hoverIcon navLink"></i>
                )}
              </NavLink>
            </div>
            <div className="nav-item dropdown text-light">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa-solid fa-user-gear fa-lg hoverIcon"></i>{" "}
              </a>
              <ul className="dropdown-menu">
                {isLogged ? null : (
                  <>
                    <li>
                      <NavLink className="dropdown-item" to="/signin">
                        Sign in
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/signup">
                        Sign up
                      </NavLink>
                    </li>
                  </>
                )}

                {isLogged ? (
                  <>
                    <li>
                      <NavLink className="dropdown-item" to="/profile">
                        My Profile
                      </NavLink>
                    </li>
                    <li>
                      <a onClick={handleLogout} className="dropdown-item">
                        Signout
                      </a>
                    </li>
                  </>
                ) : null}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
