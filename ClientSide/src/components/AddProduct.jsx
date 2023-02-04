import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { errorMsg, successMsg } from "../services/feedbackService";
import { addProduct } from "../services/productsService";
import { getAllProducts } from "../services/productsService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/addEdit.css";

function AddProduct() {
  const [products, setProducts] = useState([]);

  React.useEffect(() => {
    getAllProducts()
      .then((result) => {
        setProducts(result.data);
      })
      .catch((err) => {
        errorMsg("Please Try Again!");
      });
  }, []);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      category: "",
      description: "",
      image: "",
    },
    validationSchema: yup.object({
      name: yup.string().required().min(2),
      price: yup.number().required().min(2),
      category: yup.string().required().min(2),
      description: yup.string().required().min(6),
      image: yup.string().required(),
    }),
    onSubmit: (values) => {
      addProduct(values)
        .then((result) => {
          successMsg("Product added successfully!");
          navigate(-1);
        })
        .catch((err) => {
          errorMsg("Please Try Again.");
        });
    },
  });
  return (
    <>
      <Navbar />
      <div className="container main">
        <h1
          className="_coloredSubTitle2 text-center _addEditTittle"
          style={{ fontWeight: "bold" }}
        >
          Horray! we're Adding a{" "}
          <span className="_coloredSubTitle">New Product.</span>
        </h1>
        <div className="row">
          <div className="sideImg text-center col-lg-5 col-sm-12 mt-4 mb-5">
            <img
              className="newProductImg img-fluid mt-4"
              src="../../add.png"
              alt="Edit"
            />
          </div>
          <div className="col-lg-7 col-sm-12 _form mb-5">
            <form className="mt-4" onSubmit={formik.handleSubmit}>
              <div className="form-floating mb-3 mt-1 mx-auto">
                <input
                  id="name"
                  type="name"
                  className="form-control"
                  placeholder="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? (
                  <p className="text-danger">{formik.errors.name}</p>
                ) : null}
                <label htmlFor="floatingInput">Product Name</label>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-floating mb-3 mt-1 mx-auto">
                    <input
                      id="price"
                      type="number"
                      className="form-control"
                      placeholder="price"
                      name="price"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.price && formik.errors.price ? (
                      <p className="text-danger">{formik.errors.price}</p>
                    ) : null}
                    <label htmlFor="floatingInput">Price</label>
                  </div>
                </div>
                <div className="col">
                  <div className="form-floating mb-3 mt-1 mx-auto">
                    <select
                      className="form-select form-select-sm"
                      aria-label=".form-select-sm example"
                      name="category"
                      id="category"
                      value={formik.values.category}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option>Choose Category:</option>
                      <option value="Cakes">Cakes</option>
                      <option value="Products">Products</option>
                    </select>
                    <label htmlFor="floatingInput">Category</label>
                  </div>
                </div>
              </div>

              <div className="mb-3 mt-1 mx-auto">
                <textarea
                  id="description"
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  cols="20"
                  rows="5"
                ></textarea>

                {formik.touched.description && formik.errors.description ? (
                  <p className="text-danger">{formik.errors.description}</p>
                ) : null}
              </div>

              <div className="form-floating mb-3 mt-1 mx-auto">
                <input
                  id="image"
                  type="text"
                  className="form-control"
                  placeholder="image"
                  name="image"
                  value={formik.values.image}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.image && formik.errors.image ? (
                  <p className="text-danger">{formik.errors.image}</p>
                ) : null}
                <label htmlFor="floatingInput">Image Link</label>
              </div>

              <div className="form-group mt-4 text-center">
                <button
                  className="btn _customBtn w-100 adminBtn"
                  type="submit"
                  disabled={!(formik.isValid && formik.dirty)}
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AddProduct;
