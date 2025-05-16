import React from 'react'
import { Link } from 'react-router-dom'
import { CiSearch } from 'react-icons/ci'
import { useSelector } from 'react-redux'
import ProfileImage from "../components/ProfileImage"
import { useEffect } from 'react'



const Navbar = () => {
  const userId = useSelector((state) => state?.user?.currentUser?.id)
  const token = useSelector((state) => state?.user?.currentUser?.token)
  const profilePhoto = useSelector((state) => state?.user?.currentUser?.profilePhoto)

  // Check if the user is logged in
  useEffect(()=>{
    if(!token){
      navigate("/login") 
    }
  })
  return (
    <div className="w-screen">
      <div className=" px-8 flex justify-between items-center p-4 bg-white shadow-md ">
        <Link className="font-bold text-2xl" to="/">
          Tiri Social
        </Link>
        <form className="flex items-center relative ">
          <input
            className="border w-[500px] py-2 pl-3 pr-9 rounded-lg"
            type="text"
            placeholder="Search"
          />
          <button type="submit">
            <CiSearch className="absolute right-3 top-3" size={20} />
          </button>
        </form>
        <div className="flex items-center gap-7">
          <Link to={`/users/${userId}`}>
            <ProfileImage image={profilePhoto} />
          </Link>
          {token ? (
            <Link to={"/logout"}>Logout</Link>
          ) : (
            <Link to={"/login"}>Login</Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar