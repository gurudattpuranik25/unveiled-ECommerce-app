import React from "react";
import google from "../images/google.png";
import "./Login.css";

function Login() {
  return (
    <div className="login__container">
      <button className="login__btn">
        <img className="google__logo" src={google} alt="" />
        <span>Sign in with Google</span>
      </button>
    </div>
  );
}

export default Login;
