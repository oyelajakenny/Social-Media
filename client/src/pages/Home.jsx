import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import CreatePost from '../components/CreatePost'
import axios from 'axios'


const Home = () => {

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const token = useSelector((state)=>state?.user?.currentUser?.token)

  const createPost = async(data)=>{
    setError("")
    try {const response = await axios.post(`${import.meta.env.VITE_API_URL}/posts`, data, {
    withCredentials: true, headers:{Authorization: `Bearer ${token}`}})
    const newPost = response?.data;
    setPosts([newPost, ...posts])
      
    } catch (error) {
      setError(error?.response?.data?.message)
    }
  }
  return (
    <div>
      <CreatePost onCreatePost={createPost} error={error}/>
    </div>
  )
}

export default Home