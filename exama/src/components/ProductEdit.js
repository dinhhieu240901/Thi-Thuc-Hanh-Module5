import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PRODUCTS_API_PREFIX } from "../constants/AppConstant";

function ProductEdit() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const [error, setError] = useState({});

  useEffect(() => {
    setError({});
    if (productId) {
      axios
        .get(`${PRODUCTS_API_PREFIX}/products/${productId}`)
        .then((res) => {
          setProduct(res.data);
        })
        .catch((err) => {
          if (err) {
            navigate("/error", {
              state: {
                code: err.response.status,
                message: err.response.data.message,
              },
            });
          }
        });
    }
  }, [productId, navigate]);

  async function handleChange(event) {
    const { name, value } = event.target;
    let error = "";

    if (name === "price" || name === "stock") {
      if (!value) {
        error = "This field is required";
      } else if (value <= 0) {
        error = "Invalid number";
      }
    } else if (name === "name") {
      error = value ? "" : "This field is required";
      if (value) {
        console.log(value);
        const lowerCaseValue = value.trim().toLowerCase();

        await axios.get(`${PRODUCTS_API_PREFIX}/products/names`).then((res) => {
          const existingNames = res.data.map((existingName) =>
            existingName.toLowerCase()
          );
          if (existingNames.includes(lowerCaseValue)) {
            error = "Product name already exists.";
          }
          setError((preverror) => ({
            ...preverror,
            [name]: error,
          }));
        });
      }
    }

    setError((preverror) => ({
      ...preverror,
      [name]: error,
    }));

    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  }
  function handleSubmit(event) {
    event.preventDefault();

    const isFilled =
      product.name && product.price && product.stock && product.description;

    if (isFilled) {
      axios
        .put(`${PRODUCTS_API_PREFIX}/products/${productId}`, product)
        .then((res) => {
          alert(`Edit product ${JSON.stringify(res.data)} successfully!!!`);
          navigate("/");
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to edit product.");
        });
    } else {
      alert("Please enter valid values for price and stock.");
    }
  }

  function getProducts() {
    navigate("/");
  }
  return (
    <div className="container mt-5">
      <div>
        <h1 className="text-center mb-5">Edit Product</h1>
        <form
          onSubmit={handleSubmit}
          className="row g-2"
          style={{ width: "80%", margin: "auto" }}
        >
          <div className="col-md-12 mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              name="name"
              value={product.name || ""}
              onChange={handleChange}
              className={`form-control ${
                product.name === undefined
                  ? ""
                  : error.name
                  ? "is-invalid"
                  : "is-valid"
              }`}
            />
            {error.name && <div className="invalid-feedback">{error.name}</div>}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={product.price || ""}
              onChange={handleChange}
              className={`form-control ${
                product.price === undefined
                  ? ""
                  : error.price
                  ? "is-invalid"
                  : "is-valid"
              }`}
            />
            {error.price && (
              <div className="invalid-feedback">{error.price}</div>
            )}
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="stock" className="form-label">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={product.stock || ""}
              onChange={handleChange}
              className={`form-control ${
                product.stock === undefined
                  ? ""
                  : error.stock
                  ? "is-invalid"
                  : "is-valid"
              }`}
              required
            />
            {error.stock && (
              <div className="invalid-feedback">{error.stock}</div>
            )}
          </div>

          <div className="col-md-12 mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              name="description"
              value={product.description || ""}
              onChange={handleChange}
              className={`form-control ${
                product.description ? "is-valid" : ""
              }`}
              rows="4"
            />
          </div>
          <div className="col-12 d-flex justify-content-between">
            <button
              type="button"
              onClick={getProducts}
              className="btn btn-outline-secondary"
            >
              Back
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary"
            >
              Submit Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductEdit;
