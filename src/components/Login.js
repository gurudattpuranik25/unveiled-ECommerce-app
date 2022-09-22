import React from "react";
import google from "../images/google.png";
import "./Login.css";
import { setActiveUser } from "../features/UserSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase-config";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch(
          setActiveUser({
            userName: result.user.displayName,
            userEmail: result.user.email,
            userImage: result.user.photoURL,
          })
        );
      })
      .then(navigate("/"));
  };

  return (
    <div className="login__container">
      <button className="login__btn" onClick={handleLogin}>
        <img className="google__logo" src={google} alt="" />
        <span>Sign in with Google</span>
      </button>
    </div>
  );
}

export default Login;
