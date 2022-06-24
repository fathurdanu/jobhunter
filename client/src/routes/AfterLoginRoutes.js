import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Search
} from "../pages/user";

function AfterLoginRoutes() {
  return (
    // semua yang pakai navbar dan shoppingCart
    <Routes>
      <Route path="/:query" element={<Search/>}></Route>
    </Routes>
  );
}

export default AfterLoginRoutes;
