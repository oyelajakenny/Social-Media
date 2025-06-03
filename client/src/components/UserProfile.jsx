import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

const UserProfile = () => {
    const token = useSelector((state) => state.user?.currentUser?.token);
    const loggedInUser = useSelector(state => state?.user?.currentUser?.id);


    const [user, setUser] = React.useState({})
    const [followsuser, setFollowsUser] = useState(user?.followers?.includes(loggedInUser))
    const [avatar, setAvatar] = useState(user?.profilePhoto)
    const {id:userId} = useParams()
    


    const getUser = async ()=>{
        try {
            const response = await axios.get(`${import.meta.ENV.VITE_API_URL}/users/${userId}`, {withCredentials: true, headers:{Authorization: `Bearer ${token}`}})
            setUser(response?.data)
            setFollowsUser(response?.data?.followers?.includes(loggedInUser))
            setAvatar(response?.data?.profilePhoto)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getUser()
    },[])

    console.log(user)
  return (
    <section>
<div>
    
</div>
    </section>
  )
}

export default UserProfile