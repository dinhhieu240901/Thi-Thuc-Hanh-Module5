import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PRODUCTS_API_PREFIX } from "../constants/AppConstant";
const ProductList = ({ sendLoadingStatus }) => {
  // const { productId } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setLoading] = useState();

  useEffect(() => {
    
    axios
      .get(`${PRODUCTS_API_PREFIX}/products`)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        throw err;
      });
  }, []);
  useEffect(() => {
    sendLoadingStatus(isLoading);
    console.log(isLoading);
  }, [isLoading, sendLoadingStatus]);

  function handleCreate() {
    navigate("/products/add");
  }
  const handleDelete = (productId) => {
    axios
      .delete(`${PRODUCTS_API_PREFIX}/products/${productId}`)
      .then(() => {
        const updatedProducts = products.filter(
          (item) => item.id !== productId
        );
        setProducts(updatedProducts);
        setShowModal(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleOpenModal = (productId) => {
    console.log(productId);
    setDeleteProductId(productId);
    setShowModal(true);
  };
  return (
    !isLoading && (
      <div className="container mt-4">
        <div className="card shadow-lg p-3 mb-5 bg-white rounded">
          <div className="card-header bg-info text-white">
            <h2 className="card-title text-center">List of Products</h2>
          </div>
          <div className="card-body">
            <div className="text-end mb-3">
              <button
                className="btn btn-outline-success"
                onClick={handleCreate}
              >
                <i className="bi bi-plus-lg"></i> Add New Product
              </button>
            </div>
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, index) => (
                  <tr key={item.id}>
                    <th scope="row">{index + 1}</th>

                    <td>
                      <a
                        href={`/products/${item.id}`}
                        className="text-dark text-decoration-none"
                        title={item.name}
                      >
                        {item.name}
                      </a>
                    </td>
                    <td>${item.price}</td>
                    <td>{item.stock}</td>
                    <td>
                      <a
                        href={`/products/edit/${item.id}`}
                        className="btn btn-outline-success me-2"
                      >
                        <i className="bi bi-pencil-square"></i> Edit
                      </a>
                      <button
                        className="btn btn-outline-danger me-2"
                        onClick={() => handleOpenModal(item.id)}
                      >
                        <i className="bi bi-trash-fill"></i> Remove
                      </button>
                      <a
                        href={`/products/${item.id}`}
                        className="btn btn-outline-primary"
                      >
                        <i className="bi bi-info-circle-fill"></i> Details
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
    )
  );
};

export default ProductList;
