import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PRODUCTS_API_PREFIX } from "../constants/AppConstant";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (productId) {
      axios
        .get(`${PRODUCTS_API_PREFIX}/products/${productId}`)
        .then((res) => {
          setProduct(res.data);
        })
        .catch((err) => {
          console.log(err);
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

  function getProducts() {
    navigate("/products");
  }

  function handleDelete() {
    if (productId) {
      axios
    
        .delete(`${PRODUCTS_API_PREFIX}/products/${productId}`)
        .then(() => {
          setShowModal(false);
          navigate("/");
        })
        .catch((err) => {
          throw err;
        });
    }
  }
  const handleOpenModal = (productId) => {
    setDeleteProductId(productId);
    setShowModal(true);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card">
      <div className="card-body">
        <h1 className="card-title">{product.name}</h1>
        <h6 className="card-subtitle mb-2 text-muted">Details</h6>
        <p className="card-text">
          <b>Price:</b> ${product.price}
        </p>
        <p className="card-text">
          <b>Stock:</b> {product.stock} units
        </p>
        <p className="card-text">
          <b>Description:</b> {product.description}
        </p>

        <div className="row mt-3">
          <div className="col-md-6">
            <button
              type="button"
              className="btn btn-outline-primary btn-block"
              onClick={getProducts}
            >
              Back
            </button>
          </div>
          <div className="col-md-6">
            <button
              type="button"
              className="btn btn-danger btn-block"
              onClick={() => handleOpenModal(product.id)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <div
          className="modal fade show"
          id="deleteModal"
          tabIndex="-1"
          aria-labelledby="deleteModalLabel"
          aria-hidden="true"
          style={{ display: showModal ? "block" : "none" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteModalLabel">
                  Delete Product
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this product?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete(deleteProductId)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
          display: showModal ? "block" : "none",
        }}
      ></div>
    </div>
  );
}

export default ProductDetail;
