import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import logo from "../assets/images/logo-light.png";
import Swal from "sweetalert2";

const Header = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-darkColor h-auto">
      <div className="container grid grid-cols-2 py-3 mx-auto">
        
        <div className="w-full lg:h-20 flex justify-start items-center">
          <Link to="/user/home" className="text-2xl text-white font-semibold px-3">
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
        {/* <div className="w-4/12 flex justify-center items-center">
          <input
            className="rounded  p-2 w-3/5"
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
          ></input>
          <button
            className="ml-1 p-3 rounded bg-white text-darkColor hover:bg-midColor hover:text-white"
            onClick={() => navigate(`/user/home/${query}`)}
          >
            <FaSearch />
          </button>
        </div> */}

        {/* <div className="w-4/12 flex justify-center items-center">
          <div className="flex flex-col lg:flex-row lg:space-x-8 lg:text-sm lg:font-medium text-lightColor">
            <Link
              to="/user/"
              className="inline-block rounded hover:text-white text-lg"
              aria-current="page"
            >
              Home
            </Link>

            <Link
              to="/user/orders"
              className="inline-block border-b  hover:text-white md:border-0 text-lg"
            >
              Orders
            </Link>

            <Link
              to="/user/profile"
              className="inline-block border-b  hover:text-white md:border-0 text-lg"
            >
              User
            </Link>
          </div>
        </div> */}

        
      </div>
    </div>
  );
};

export default Header;