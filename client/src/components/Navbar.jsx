import React from 'react'
import { Link } from 'react-router-dom'
import { CiSearch } from 'react-icons/ci'
import { useSelector } from 'react-redux'
import ProfileImage from "../components/ProfileImage"
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'



const Navbar = () => {
  const userId = useSelector((state) => state?.user?.currentUser?.id)
  const token = useSelector((state) => state?.user?.currentUser?.token)
  const profilePhoto = useSelector((state) => state?.user?.currentUser?.profilePhoto)
  const navigate = useNavigate()

  // Check if the user is logged in
  useEffect(()=>{
    if(!token){
      navigate("/login") 
    }
  }, [])

  // LOGOUT AFTER AN HOUR
  useEffect(() => {
     setTimeout(() => {
        navigate("/login")
    }, 3600000) // 1 hour in milliseconds

    
  }, [])
  return (
    <div className="w-screen">
      <div className=" px-8 flex justify-between items-center p-2 bg-white shadow-md ">
        <Link className="font-bold text-2xl" to="/">
          Tiri Social
        </Link>
        <form className="flex items-center relative ">
          <input
            className="border w-[500px] py-2 pl-3 pr-9 rounded-lg"
            type="text"
            placeholder="Search"
          />
          <button type="submit" className='absolute right-0 top-0 bg-blue-400 w-11 h-full rounded-r-lg p-2 text-white hover:bg-blue-500'> 
            <CiSearch className="absolute right-3 top-3" size={20}  />
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