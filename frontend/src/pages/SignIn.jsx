import React, { useState, useEffect } from "react";
import logo from "../images/logo.png";
import LoginRight from "../images/loginRight.png";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { logInUser } from "../Api/api.jsx";
import Snackbar from "../components/Snackbar.jsx";

const SignIn = () => {
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newError = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newError.email = "Email is required";
    } else if (!emailPattern.test(formData.email)) {
      newError.email = "Invalid Email";
    }

    if (!formData.password) {
      newError.password = "Password is required";
    }

    return newError;
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    const formError = validateForm();

    if (Object.keys(formError).length === 0) {
      try {
        const result = await logInUser(formData);
        if (result.success) {
          setError({});
          setSnackbarMessage(result.message);
          setSnackbarOpen(true);
          localStorage.setItem('id' , result.data.id);
          localStorage.setItem("isloggedIn", true);
          localStorage.setItem('name' , result.data.fname);
          navigate("/home");
        }
      } catch (error) {
        if (error.response) {
          setSnackbarMessage(error.response.data.message);
        } else {
          setSnackbarMessage("An unexpected error occurred. Please try again.");
        }
        setSnackbarOpen(true);
      }
    } else {
      setError(formError);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (snackbarOpen) {
      const timer = setTimeout(() => {
        setSnackbarOpen(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [snackbarOpen]);

  return (
    <div className="flex flex-col lg:flex-row w-screen h-screen bg-[#F0F0F0]">
      <div className="left flex flex-col items-center justify-center w-full lg:w-1/2 lg:p-10 p-0">
        <img src={logo} alt="Logo" className="mb-6" />
        <form
          className="p-6 rounded w-full max-w-md"
          onSubmit={handleSubmission}
        >
          <h2 className="text-lg font-semibold mb-4">Sign In</h2>

          <div className="mb-4 inputBox">
            <label className="flex items-center mb-1" htmlFor="email">
              <MdEmail />
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`border ${
                error.email ? "border-red-500" : "border-gray-300"
              } rounded p-2 w-full`}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
            {error.email && (
              <span className="text-red-500 text-sm">{error.email}</span>
            )}
          </div>

          <div className="mb-4 inputBox">
            <label className="flex items-center mb-1" htmlFor="password">
              <RiLockPasswordFill />
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`border ${
                error.password ? "border-red-500" : "border-gray-300"
              } rounded p-2 w-full`}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            {error.password && (
              <span className="text-red-500 text-sm">{error.password}</span>
            )}
          </div>

          <p className="redirectLogin text-sm">
            New User?{" "}
            <span className="text-blue-500 hover:text-blue-900 cursor-pointer">
              <Link to="/signUp">Sign Up</Link>
            </span>
          </p>

          <button
            type="submit"
            className="bg-green-500 text-white rounded p-2 w-full hover:bg-green-600 transition"
          >
            Log In
          </button>
        </form>
      </div>

      <div className="right flex items-start justify-center lg:justify-end w-full lg:w-1/2">
        <img
          src={LoginRight}
          alt="Login Graphic"
          className="h-full w-[90%] object-cover border-0"
        />
      </div>

      <Snackbar
        snackbarOpen={snackbarOpen}
        snackbarMessage={snackbarMessage}
        handleSnackbarClose={handleSnackbarClose}
      />
    </div>
  );
};

export default SignIn;