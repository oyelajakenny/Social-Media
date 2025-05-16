import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import axios from 'axios'

const Register = () => {
  const [userData, setUserData]=useState({fullname:"", email:"", password:"", confirmPassword:""})
  const [error, setError]=useState("")
  const [showPassword, setShowPassword]=useState(false)
  const navigate = useNavigate()

  const changeInputHandler = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const registerUser = async (e)=>{
    e.preventDefault()
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/users/register`, userData)
      
    } catch (err) {
      setError(err.response?.data.message)
    }
  }
    return (
    <div className="register">
      <div className="container register_container">
        <h2>Sign Up</h2>
        <form onSubmit={registerUser}>
          {error && <p>{error}</p>}
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            onChange={changeInputHandler}
            autoFocus
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={changeInputHandler}
            autoFocus
          />
          <div className="password_controller">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={changeInputHandler}
              autoFocus
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
            </span>
          </div>
          <div className="password_controller">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={changeInputHandler}
              autoFocus
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
            </span>
          </div>
          <p>
            Already have an account? <Link to={"/login"}></Link>{" "}
          </p>
          <button type='submit'>Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register