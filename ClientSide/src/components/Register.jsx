import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { addUser } from "../services/userService";
import "../css/signin&Signup.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { errorMsg, successMsg } from "../services/feedbackService";

function Register() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      name: yup.string().required().min(2),
      email: yup.string().required().email(),
      password: yup
        .string()
        .required(
          "Your Password MUST Contain Minimum 8 Characters, 1 Uppercase letter, 1 Lowercase letter "
        )
        .min(8)
        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d{4})(?=.*[^A-Za-z0-9]).{8,}$/),
    }),
    onSubmit: (values) => {
      let user = { ...values, isAdmin: false };
      addUser(user)
        .then((result) => {
          sessionStorage.setItem("token", result.data.token);
          successMsg("You registered successfully!");
          navigate("/");
        })
        .catch((err) => {
          errorMsg("Please try agian!");
        });
    },
  });
  return (
    <>
      <Navbar />
      <div className="container _mainContainer">
        <div className="row mainForm mt-5">
          <div className="col-sm-12">
            <div className="logo_ text-center">
              <img src="logo.png" alt="Logo" style={{ width: "10rem" }} />
            </div>
            <h1 className="boldTitle text-center pt-3">
              <span className="title fw-bold">Hello New Friend 🖐</span>
            </h1>

            <form onSubmit={formik.handleSubmit}>
              <div className="form-floating mb-3 mt-4">
                <input
                  className="form-control"
                  id="name"
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? (
                  <p className="text-danger">{formik.errors.name}</p>
                ) : null}
                <label htmlFor="floatingInput">Full Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <p className="text-danger">{formik.errors.email}</p>
                ) : null}
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating">
                <input
                  className="form-control"
                  id="password"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <p className="text-danger">
                    {
                      "* Password must contain: 1 Uppercase, 1 Lowercase, 4 Digits and 1 Special Character. "
                    }
                  </p>
                ) : null}
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="button text-center">
                <button type="submit" className="btn w-100 _customBtn mt-3">
                  SignUp
                </button>
              </div>
            </form>
            <hr className="mt-4" />
            <p className="text-center mt-3 cartItemName">
              Do you Already have an account?{" "}
              <Link className="registerLoginForm" to="/signin">
                Signin
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;
