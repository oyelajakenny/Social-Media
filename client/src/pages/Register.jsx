import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import axios from 'axios'

const Register = () => {  const [userData, setUserData]=useState({fullName:"", email:"", password:"", confirmPassword:""})
  const [error, setError]=useState("")
  const [showPassword, setShowPassword]=useState(false)
  const navigate = useNavigate()

  const changeInputHandler = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const registerUser = async (e)=>{
    e.preventDefault()
    setError("")  // Clear any previous errors
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/register`, userData)
      if(response?.data) {
        // Registration successful
        navigate("/login")
      }
    } catch (err) {
      setError(err.response.data.message || "Registration failed")
    }
  }
    return (
      <div className="container mx-auto h-screen flex justify-center items-center">
        <div className="flex flex-col justify-center items-center  space-y-3 bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-3xl font-semibold mb-6">Create An Account</h2>
          <form
            onSubmit={registerUser}
            className="flex flex-col space-y-5 text-left w-full "
          >
            {error && (
              <p className="text-red-800 px-5 py-3 bg-red-200 border-l-4 border-l-red-600">
                {error}
              </p>
            )}
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              onChange={changeInputHandler}
              autoFocus
              className="w-full p-2 border border-gray-200 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 hover:border-gray-300"
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={changeInputHandler}
              autoFocus
              className="w-full p-2 border border-gray-200 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 hover:border-gray-300"
            />
            <div className="flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={changeInputHandler}
                autoFocus
                className="w-full p-2 border border-gray-200 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 hover:border-gray-300"
              />
              <span
                className="absolute left-"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
              </span>
            </div>
            <div className="flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={changeInputHandler}
                autoFocus
                className="w-full p-2 border border-gray-200 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 hover:border-gray-300"
              />
              <span
                className="absolute right-52"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
              </span>
            </div>
            <p>
              Already have an account?{" "}
              <Link className="text-blue-600 font-semibold" to={"/login"}>
                Login
              </Link>
            </p>
            <button
              className="bg-slate-800 text-white py-3 rounded-md font-semibold text-lg hover:bg-slate-700"
              type="submit"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    );
}

export default Register