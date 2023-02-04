import { Link } from "react-router-dom";
import "../css/footer.css";

function Footer() {
  return (
    <>
      <footer className="mainfooter footer-section" role="contentinfo">
        <div className="footer-middle">
          <div className="container">
            <div className="row">
              <div className="col-md-3 col-sm-6">
                <div className="footer-pad">
                  <h4>Quick Links</h4>
                  <ul className="list-unstyled">
                    <li>
                      <Link to="/signin">SignIn</Link>
                    </li>
                    <li>
                      <Link to="/signup">SignUp</Link>
                    </li>
                    <li>
                      <Link to="/products">Products</Link>
                    </li>
                    <li>
                      <Link to="/cakes">Cakes</Link>
                    </li>
                    <li>
                      <Link to="/recipes">Recipes</Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-md-3 col-sm-6">
                <div className="footer-pad">
                  <h4>Get In Touch</h4>
                  <ul className="list-unstyled">
                    <li>
                      <i className="fa-solid fa-location-dot"></i>{" "}
                      <span>523 Sylvan Ave, CA 94041 USA</span>
                    </li>
                    <li>
                      <i className="fa-solid fa-phone"></i>{" "}
                      <span>+1 (844) 123 456 78</span>
                    </li>
                    <li>
                      <i className="fa-solid fa-mobile-screen"></i>{" "}
                      <span>+1 (844) 123 456 78</span>
                    </li>
                    <li>
                      <i className="fa-solid fa-envelope"></i>{" "}
                      <span>info@Lotuserie.com</span>
                    </li>
                    <li>
                      <i className="fa-solid fa-envelope"></i>{" "}
                      <span>CustomerService@Lotuserie.com</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="footer-pad">
                  <h4>Follow Us</h4>
                  <ul className="list-unstyled">
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-facebook"></i> Facebook
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-instagram"></i> Instagram
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-twitter"></i> Twitter
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-tiktok"></i> Tiktok
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-youtube"></i> Youtube
                      </a>
                    </li>
                    <li>
                      <a href="#"></a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="">
                  <h4>Subscribe</h4>
                  <p>
                    Feel free to subscribe to our mailing list and get the most
                    updated news about Cakes, Recipes and Products!
                  </p>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name@Email.com"
                      aria-label="Recipient's username"
                      aria-describedby="button-addon2"
                    />
                    <button
                      className="btn btn-secondary"
                      type="button"
                      id="button-addon2"
                    >
                      Subscribe!
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 copy">
                <h6 className="text-center">
                  &copy; Copyright 2023 - Aluma Alon & Lotuserie. All rights
                  reserved.
                </h6>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
