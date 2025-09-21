import React from "react";
import "../Scss/Login.scss";
function Login() {
  return (
    <div className="Login">
      <div>
        <h2>Welcome Back</h2>
        <p>Login to your account</p>
        <input type="text" name="" id="" placeholder="Email" />
        <input type="password" placeholder="password" />
        <p>Forgot Password?</p>
        <button>Login</button>
        <button>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
            alt=""
          />
          Continue with google
        </button>
      </div>
    </div>
  );
}

export default Login;
