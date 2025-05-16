import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeInputHandler = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const loginUser = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        userData
      );
      console.log("Login response:", response.data); // Add debug log
      if (response?.status === 200) {
        // Use strict comparison
        // Login successful
        dispatch(userActions.changeCurrentUser(response?.data));
        localStorage.setItem("currentUser", JSON.stringify(response?.data));
       
        navigate("/");
      }
    } catch (err) {
      
      setError(
        err.response?.data?.message || "An error occurred while logging in"
      );
    }
  };
  return (
    <div className="container mx-auto h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center border bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-semibold mb-6">Login</h2>
        <form
          onSubmit={loginUser}
          className="flex flex-col space-y-3 text-left w-full "
        >
          {error && (
            <p className="text-red-800 px-5 py-3 bg-red-200 border-l-4 border-l-red-600">
              {error}
            </p>
          )}

          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={changeInputHandler}
            autoFocus
            className="w-full p-2 border border-gray-200 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 hover:border-gray-300"
          />
          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={changeInputHandler}
              className="w-full p-2 border border-gray-200 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 hover:border-gray-300 pr-10"
            />
            <span
              className="absolute right-3 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <p className="text-blue-600 font-semibold text-right">
            Forgot Password?
          </p>

          <button
            className="bg-slate-800 text-white py-3 rounded-md font-semibold text-lg hover:bg-slate-700"
            type="submit"
          >
            Login
          </button>
          <p className="text-gray-500 text-sm text-center">
            Don't have an account?{" "}
            <Link className="text-blue-600 font-semibold" to={"/register"}>
              Sign Up{" "}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
