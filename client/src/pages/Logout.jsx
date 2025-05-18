import React from 'react'
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import {useEffect} from "react"
import {userActions} from "../store/user-slice"

const Logout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(userActions.changeCurrentUser({}))
    localStorage.setItem("currentUser", null);
    navigate("/login")
  },[])

  //Log user out after an hour of inactivity
  // useEffect(() => {
  //  setTimeout(()=>{
  //   navigate("/logout")
  //  },1000)
  // }, []);

  return (
    <div>Logout</div>
  )
}

export default Logout