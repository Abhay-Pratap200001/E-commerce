//Sidebar component 

import React from "react";
import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setshowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => {
    setshowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setshowSidebar(false);
  };

  return (
    <div style={{ xIndex: 999 }} className={`${ showSidebar ? "hidden" : "flex" } xl:flex lg:flex md:hidden flex-col justify-baseline p-4 text-white bg-slate-700 w-[4%] hover:w-[17%] h-[100vh] fixed`} id="navigation-container">

        <div className="flex flex-col justify-center space-y-4">
          <Link to="/" className="flex items-center transition-transform transform hover:translate-x-2">
          <AiOutlineHome className="mr-2 mt-[3rem]" size={25}/>
          <span className="hidden nav-item-name mt-[3rem]">HOME</span>{" "}
          </Link>

           <Link to="/shop" className="flex items-center transition-transform transform hover:translate-x-2">
          <AiOutlineShopping className="mr-2 mt-[3rem]" size={25}/>
          <span className="hidden nav-item-name mt-[3rem]">SHOP</span>{" "}
          </Link>

           <Link to="/cart" className="flex items-center transition-transform transform hover:translate-x-2">
          <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={25}/>
          <span className="hidden nav-item-name mt-[3rem]">CARD</span>{" "}
          </Link>


           <Link to="/favorite" className="flex items-center transition-transform transform hover:translate-x-2">
          <FaHeart className="mr-2 mt-[3rem]" size={25}/>
          <span className="hidden nav-item-name mt-[3rem]">FAVIOURTE</span>{" "}
          </Link>
        </div>

        <ul className="bottom-0 mt-200">
          <li>
             <Link to="/login" className="flex items-center transition-transform transform hover:translate-x-2">
          <AiOutlineLogin className="mr-2 mt-[3rem]" size={25}/>
          <span className="hidden nav-item-name mt-[3rem]">LOGIN</span>{" "}
          </Link>
          </li>

           <li>
             <Link to="/register" className="flex items-center transition-transform transform hover:translate-x-2">
          <AiOutlineUserAdd className="mr-2 mt-[3rem]" size={25}/>
          <span className="hidden nav-item-name mt-[3rem]">REGISTER</span>{" "}
          </Link>
          </li>
        </ul>
    </div>
  );
};

export default Navigation;
