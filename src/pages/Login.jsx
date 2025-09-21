import React from "react";
import "../Scss/Login.scss";
import image from "../assets/Capture.png";
function Login() {
  return (
    <div className="Login">
      <div>
        <img src={image} alt="" />
      </div>
      <div>
        <h2>Welcome Back</h2>
        <p>Login to your account</p>
        <input type="text" name="" id="" />
        <input type="password" />
        <p>Forgot Password?</p>
        <button>Login</button>
        <button>Continue with google</button>
      </div>
    </div>
  );
}

export default Login;
