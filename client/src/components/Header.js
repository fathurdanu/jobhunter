import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo-light.png";
import Swal from "sweetalert2";

const Header = () => {
  return (
    <div className="bg-darkColor h-auto">
      <div className="container grid grid-cols-2 py-3 mx-auto">
        
        <div className="w-full lg:h-20 flex justify-start items-center">
          <Link to="/home" className="text-2xl text-white font-semibold px-3">
            <img alt="logo" className="h-20" src={logo} />
          </Link>
          <p className="text-2xl font-bold text-lightColor">JOBHUNTER</p>
        </div>
        <div className="justify-end flex w-full items-center">
          <div className=" flex flex-col justify-center md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium text-lightColor">
            <Link
              to="/login"
              className="text-xl hover:text-white md:inline sm:block py-2 px-3"
              onClick={() => {
                Swal.fire("Logout Success!", "See you later!", "success");
                localStorage.clear();
              }}
            >
              Logout
            </Link>
          </div>
        </div>     
      </div>
    </div>
  );
};

export default Header;