import React, { useState } from "react";
import logo from "../images/logo.png";
import SignUpRight from "../images/signUpRight.png";
import { FaUser, FaPhone, FaUserLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { RiContactsLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { SignUpUser } from "../Api/api.jsx";
import Snackbar from "../components/Snackbar.jsx";

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [formMessage, setFormMessage] = useState();
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newError = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.username) {
      newError.username = "Username is required";
    }
    if (!formData.name) {
      newError.name = "Name is required";
    }
    if (!formData.email) {
      newError.email = "Email is required";
    } else if (!emailPattern.test(formData.email)) {
      newError.email = "Invalid Email";
    }
    if (!formData.phone) {
      newError.phone = "Phone is required";
    }
    if (!formData.password) {
      newError.password = "Password is required";
    }
    if (formData.password !== formData.confirmPassword) {
      newError.confirmPassword = "Passwords do not match";
    }

    return newError;
  };

  const handleSubmission = async (e) => {
    e.preventDefault();

    const formError = validateForm();

    if (Object.keys(formError).length === 0) {
      try {
        console.log("Form data being sent:", formData);
        const result = await SignUpUser(formData);
        if (result.success) {
          console.log("User successfully signed up", result);
          setError({});
          setSnackbarMessage(result.message);
          setSnackbarOpen(true);
          setFormData({
            username: "",
            name: "",
            phone: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          navigate("/login");
        }
      } catch (error) {
        console.error("Signup error:", error);
        if (error.response) {
          console.error("Error data:", error.response.data);
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

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div className="flex flex-col lg:flex-row w-screen h-screen bg-[#F0F0F0]">
      <div className="left flex flex-col items-center justify-center w-full lg:w-1/2 lg:p-10 p-0">
        <img src={logo} alt="Logo" className="mb-6" />
        <form
          className="p-6 rounded w-full max-w-md"
          onSubmit={handleSubmission}
        >
          <h2 className="text-lg font-semibold mb-4">Sign Up</h2>

          {error.general && (
            <div className="text-red-500 text-sm mb-4">{error.general}</div>
          )}

          <div className="mb-4 inputBox">
            <label className="flex items-center mb-1" htmlFor="username">
              <FaUser />
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className={`border ${
                error.username ? "border-red-500" : "border-gray-300"
              } rounded p-2 w-full`}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
            {error.username && (
              <span className="text-red-500 text-sm">{error.username}</span>
            )}
          </div>

          <div className="mb-4 inputBox">
            <label className="flex items-center mb-1" htmlFor="name">
              <RiContactsLine />
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`border ${
                error.name ? "border-red-500" : "border-gray-300"
              } rounded p-2 w-full`}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
            {error.name && (
              <span className="text-red-500 text-sm">{error.name}</span>
            )}
          </div>

          <div className="mb-4 inputBox">
            <label className="flex items-center mb-1" htmlFor="phone">
              <FaPhone />
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={`border ${
                error.phone ? "border-red-500" : "border-gray-300"
              } rounded p-2 w-full`}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
            {error.phone && (
              <span className="text-red-500 text-sm">{error.phone}</span>
            )}
          </div>

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

          <div className="mb-4 inputBox">
            <label
              className="flex items-center mb-1"
              htmlFor="confirm_password"
            >
              <FaUserLock />
            </label>
            <input
              type="password"
              id="confirm_password"
              name="confirmPassword"
              className={`border ${
                error.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded p-2 w-full`}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
            {error.confirmPassword && (
              <span className="text-red-500 text-sm">
                {error.confirmPassword}
              </span>
            )}
          </div>

          <p className="redirectLogin text-sm">
            Already have an account?{" "}
            <span className="text-blue-500 hover:text-blue-900 cursor-pointer">
              <Link to="/signIn">Login</Link>
            </span>
          </p>

          <button
            type="submit"
            className="bg-green-500 text-white rounded p-2 w-full hover:bg-green-600 transition"
          >
            Sign Up
          </button>
        </form>
      </div>

      <div className="right flex items-start justify-center lg:justify-end w-full lg:w-1/2">
        <img
          src={SignUpRight}
          alt="Sign Up Graphic"
          className="h-full w-[80%] object-cover"
        />
      </div>

      {/* Snackbar for success message */}
      <Snackbar
        snackbarOpen={snackbarOpen}
        snackbarMessage={snackbarMessage}
        handleSnackbarClose={handleSnackbarClose}
      />
    </div>
  );
};

export default SignUp;
