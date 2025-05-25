import axios from "axios";
import { useEffect, useState } from "react"
import React from "react";
import { useSelector } from "react-redux";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
const LIkeDislikePost = (props) => {
  const [post, setPost] = React.useState(props.post);
  const token = useSelector((state) => state?.user?.currentUser?.token);
  const userId = useSelector((state) => state?.user?.currentUser?._id);
  const [postLiked, setPostLiked]= useState(post?.likes?.includes.userId)

  const handleLikeDislikePost = async ()=>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${post._id}/like`, {withCredentials: true, headers: {Authorization:`Bearer ${token}`}});
    setPost(response.data);
    } catch (error) {
      console.error( error);
    }
  }

  const handleCheckIfPostLiked = () => {
    if(post?.likes?.includes(userId)){
      setPostLiked(true);
    }else{
      setPostLiked(false);
    }
  }

  useEffect(() => {
    handleCheckIfPostLiked();
  },[post])

  return (
    <button onClick={handleLikeDislikePost} className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors duration-200">
      {postLiked ? <FcLike/> : <FaRegHeart/>}
      <small>{post?.likes?.length}</small>
    </button>
  );
}

export default LIkeDislikePost