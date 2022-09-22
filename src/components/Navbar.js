import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CommerceContext } from "./Context";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { setActiveUser, setUserLogoutState } from "../features/UserSlice";
import "./Navbar.css";

function MenuDialog() {
  const cartCount = useSelector((state) => state.cart.cartArray.length);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const handleLogin = () => {
    signInWithPopup(auth, provider).then((result) => {
      dispatch(
        setActiveUser({
          userName: result.user.displayName,
          userEmail: result.user.email,
          userImage: result.user.photoURL,
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
    <div className="menu__dialog">
      <div className="nav__links">
        {user.userName === null ? (
          <button onClick={handleLogin}>Login</button>
        ) : (
          <div className="user__details">
            <p>{user.userName} </p>
            <img referrerPolicy="no-referrer" src={user.userImage} alt="" />
          </div>
        )}
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>

        <Link to="/cart" className=" cart__icon">
          <i className="fa-solid fa-cart-shopping"></i>
          <span className=" cart__count w-[1.5rem] h-[1.5rem] bg-rose-500 text-white flex justify-center items-center rounded-full ">
            {cartCount}
          </span>
        </Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

function Navbar() {
  const { searchItem, searchHandler } = useContext(CommerceContext);

  const [isMenu, setIsMenu] = useState(false);

  const cartCount = useSelector((state) => state.cart.cartArray.length);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  // useEffect(() => {
  //   auth.onAuthStateChanged((authUser) => {
  //     if (authUser) {
  //       dispatch(
  //         setActiveUser({
  //           userName: authUser.displayName,
  //           userEmail: authUser.email,
  //         })
  //       );
  //     } else {
  //       dispatch(setUserLogoutState());
  //     }
  //   });
  // }, []);

  const handleLogin = () => {
    signInWithPopup(auth, provider).then((result) => {
      dispatch(
        setActiveUser({
          userName: result.user.displayName,
          userEmail: result.user.email,
          userImage: result.user.photoURL,
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

  const menuHandler = () => {
    setIsMenu((prev) => !prev);
  };

  return (
    <div>
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

          {user.userName === null ? (
            <button onClick={handleLogin}>Login</button>
          ) : (
            <div className="user__details">
              <p>{user.userName} </p>
              <img referrerPolicy="no-referrer" src={user.userImage} alt="" />
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}

          <Link to="/cart" className=" cart__icon">
            <i className="fa-solid fa-cart-shopping"></i>
            <span className=" cart__count w-[1.5rem] h-[1.5rem] bg-rose-500 text-white flex justify-center items-center rounded-full ">
              {cartCount}
            </span>
          </Link>
        </div>

        <button className="menu__btn" onClick={menuHandler}>
          <i className="fas fa-bars" />
        </button>
      </div>{" "}
      {isMenu ? <MenuDialog /> : ""}
    </div>
  );
}

export default Navbar;
