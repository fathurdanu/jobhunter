import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// import AfterLoginRoutes from "./AfterLoginRoutes";

import Login from "../pages/Login";
import { RegisterUser, Home, Search, Job } from "../pages/user";
import { RegisterCompany } from "../pages/company";
const MainRoute = () => {
  return (
    <Routes>
      <Route path="" element={< Home />} />
      <Route path="home" element={<Navigate replace to="/" />} />
      <Route path="login" element={<Login />} />
      <Route path="register">
        <Route path="user" element={<RegisterUser />}></Route>
        <Route path="company" element={<RegisterCompany />}></Route>
      </Route>

      <Route path="main">
        <Route path="" element={<Search />}></Route>
        <Route path=":query" element={<Search />}></Route>
        <Route path="jobs/:id" element={<Job />}></Route>
      </Route>

      {/* <Route path="main" element={<Search />}></Route>
      <Route path="main/:query" element={<Search />}></Route>
      <Route path="main/jobs/:id" element={< Job />}></Route> */}
      {/* <Route path="/cms/*" element={<SideBarCMS />}></Route> */}
    </Routes>
  );
};

export default MainRoute;
