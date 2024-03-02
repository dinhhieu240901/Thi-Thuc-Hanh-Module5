import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ProductList from "../components/ProductList";
import ProductAdd from "../components/ProductAdd";
import ProductEdit from "../components/ProductEdit";
import ProductDetail from "../components/ProductDetail";
import Loading from "../components/Loading";

function ProductRouter() {
  const [isLoading, setLoading] = useState(false);
  const getLoadingFromChild = (data) => {
    setLoading(data);
  };
  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <h1>Products Manager</h1>
      <Routes>
        <Route
          path="/"
          element={<ProductList sendLoadingStatus={getLoadingFromChild} />}
        ></Route>
        <Route path="/add" element={<ProductAdd />}></Route>
        <Route
          path="/edit/:productId"
          element={<ProductEdit sendLoadingStatus={getLoadingFromChild} />}
        ></Route>
        <Route
          path="/:productId"
          element={<ProductDetail sendLoadingStatus={getLoadingFromChild} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default ProductRouter;
