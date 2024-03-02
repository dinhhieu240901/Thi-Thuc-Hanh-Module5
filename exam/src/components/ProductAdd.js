import axios from "axios";
import React, {useState } from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCTS_API_PREFIX } from "../constants/AppConstant";

function ProductAdd() {
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  //   axios call api bất đồng bộ
  async function handleChange(event) {
    const { name, value } = event.target;
    let error = "";

    if (name === "name") {
      if (!value) {
        error = "This field is required";
      } else {
        const lowerCaseValue = value.trim().toLowerCase();
        await axios.get(`${PRODUCTS_API_PREFIX}/products/names`).then((res) => {
          const existingNames = res.data.map((existingName) =>
            existingName.toLowerCase()
          );
          if (existingNames.includes(lowerCaseValue)) {
            error = "Product name already exists.";
          }
        });
      }
    } else if (name === "price" || name === "stock") {
      if (!value) {
        error = "This field is required";
      } else if (value <= 0) {
        error = "Invalid number";
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  }

  //   async function handleChange(event) {
  //     const { name, value } = event.target;
  //     let error = "";

  //     if (name === "name") {
  //       if (!value) {
  //         error = "This field is required";
  //       } else {
  //         const res = await axios.get(`${PRODUCTS_API_PREFIX}/products/names`);
  //         if (res.data.includes(value.trim())) {
  //           error = "Product name already exists.";
  //         }
  //       }
  //     } else if (name === "description") {
  //       error = value ? "" : "This field is required";
  //     } else if (name === "price" || name === "stock") {
  //       if (!value) {
  //         error = "This field is required";
  //       } else if (value <= 0) {
  //         error = "Invalid number";
  //       }
  //     }

  //     setProduct((prevProduct) => ({
  //       ...prevProduct,
  //       [name]: { value, error },
  //     }));
  //   }

  function handleSubmit(event) {
    event.preventDefault();
    const isFilled =
      product.name && product.price && product.stock && product.description;

    if (isFilled) {
      axios
        .post(`${PRODUCTS_API_PREFIX}/products`, product)
        .then((res) => {
          alert(`Create Product ${JSON.stringify(res.data)} successfully!!!`);

          navigate("/");
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to create product.");
        });
    } else {
      alert("Please enter ");
    }
  }

  return (
    <div className="container">
      <h2>Add Product</h2>
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
            type="text"
            name="name"
            // value={product.name || ""}
            onChange={handleChange}
            className={`form-control ${
              product.name === undefined
                ? ""
                : errors.name
                ? "is-invalid"
                : "is-valid"
            }`}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
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
                : errors.price
                ? "is-invalid"
                : "is-valid"
            }`}
          />
          {errors.price && (
            <div className="invalid-feedback">{errors.price}</div>
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
                : errors.stock
                ? "is-invalid"
                : "is-valid"
            }`}
            required
          />
          {errors.stock && (
            <div className="invalid-feedback">{errors.stock}</div>
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
            className={`form-control ${product.description ? "is-valid" : ""}`}
            rows="4"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default ProductAdd;
