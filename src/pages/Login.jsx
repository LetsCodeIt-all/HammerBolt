import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import "../Scss/Login.scss";
import { supabase } from "../SupabaseClient.js";
import { MyContext } from "../Components/ProductContext";
function Login() {
  const [issignUp, setsignUp] = useState(false);
  const { setToken, setUser } = useContext(MyContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // form submit (email + password)
  const onSubmit = async (formData) => {
    try {
      const res = await fetch(
        `http://localhost:5000/auth/${issignUp ? "signup" : "login"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        setsignUp(true);
        alert("Pls SignUp first");
      }

      const result = await res.json();
      setToken(result.token);
    } catch (error) {
      console.error("Error during login:", error.message);
      alert(error.message);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    setUser(data);
    if (error) {
      console.error("Error logging in with Google:", error.message);
    } else {
      console.log("Redirecting to Google…", data);
    }
  };

  return (
    <div className="Login">
      <div>
        {issignUp ? <h2>Happy to see You</h2> : <h2>Welcome Back</h2>}
        {issignUp ? <p>Don't Forget Password</p> : <p>Login to your account</p>}
        <form onSubmit={handleSubmit(onSubmit)} method="post">
          {issignUp && (
            <input
              type="text"
              placeholder="Name"
              {...register("name", { required: "Name is required." })}
            />
          )}

          <input
            type="text"
            placeholder="Email"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address.",
              },
            })}
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required.",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                message:
                  "Password must be at least 8 characters and include uppercase, lowercase, number, and a special character.",
              },
            })}
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}

          <button type="submit" disabled={isSubmitting}>
            {issignUp
              ? isSubmitting
                ? "We are storing your data..."
                : "Register"
              : isSubmitting
              ? "Logging in..."
              : "Let me in"}
          </button>
        </form>
        <button onClick={handleGoogleLogin} className="GoogleBtn">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
            alt="Google Logo"
          />
          Continue with Google
        </button>
        {issignUp ? "Already Registered?" : "Don't have an account?"}

        <p onClick={() => setsignUp(!issignUp)} style={{ cursor: "pointer" }}>
          {issignUp ? "Login" : "signUp"}
        </p>
      </div>
    </div>
  );
}

export default Login;
