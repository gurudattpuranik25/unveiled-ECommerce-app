import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CommerceContext } from "./Context";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import {
  setActiveUser,
  setUserLogoutState,
  selectUserName,
} from "../features/UserSlice";
import "./Navbar.css";

function Navbar() {
  const { searchItem, searchHandler } = useContext(CommerceContext);

  const cartCount = useSelector((state) => state.cart.cartArray.length);

  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          setActiveUser({
            userName: authUser.displayName,
            userEmail: authUser.email,
          })
        );
      } else {
        dispatch(setUserLogoutState());
      }
    });
  }, []);

  const handleLogin = () => {
    signInWithPopup(auth, provider).then((result) => {
      dispatch(
        setActiveUser({
          userName: result.user.displayName,
          userEmail: result.user.email,
        })
      );
    });
  };
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(setUserLogoutState());
      })
      .catch((err) => alert(err.message));
  };

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
        {userName ? (
          <div className=" flex gap-5">
            <p>Hi, {userName.toUpperCase()}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
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
