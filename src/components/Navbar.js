import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CommerceContext } from "./Context";
import "./Navbar.css";

function Navbar() {
  const { searchItem, searchHandler } = useContext(CommerceContext);

  const cartCount = useSelector((state) => state.cart.cartArray.length);

  return (
    <div className=" navbar">
      <Link className="logo" to="/">
        [Un]veiled
      </Link>
      <input
        type="text"
        className=" search__input"
        placeholder="Search items by name"
        value={searchItem}
        onChange={searchHandler}
      />
      <div className="nav__links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart" className=" cart__icon">
          <i className="fa-solid fa-cart-shopping"></i>
          <span className=" cart__count w-[1.5rem] h-[1.5rem] bg-rose-500 text-white flex justify-center items-center rounded-full ">
            {cartCount}
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
