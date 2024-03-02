import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductRouter from "./ProductRouters";
import Error from "../components/Error";

function AppRouters() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ProductRouter />}></Route>
        <Route path="/products/*" element={<ProductRouter />}></Route>
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default AppRouters;
