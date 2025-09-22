import React from "react";
import { useForm } from "react-hook-form";
import "../Scss/Login.scss";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:5000/emailandpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const result = await res.json();
      console.log(result);
      // Handle successful login (e.g., redirect user)
    } catch (error) {
      console.error("Error during login:", error.message);
      // Display error message to the user
      alert(error.message);
    }
  };

  return (
    <div className="Login">
      <div>
        <h2>Welcome Back</h2>
        <p>Login to your account</p>
        <form onSubmit={handleSubmit(onSubmit)} method="post">
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

          <p>Forgot Password?</p>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
          <button>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
              alt=""
            />
            Continue with google
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
