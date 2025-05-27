import React, { use } from 'react'
import { FaRegBookmark } from 'react-icons/fa';
import { FaBookmark } from 'react-icons/fa';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';


const BookmarkPosts = ({post}) => {
    const [user, setUser] = React.useState({});
    const [postBookmarked, setPostBookmarked] = React.useState(user?.bookmarks?.includes(post?._id));
    const token = useSelector((state) => state?.user?.currentUser?.token);
    const userId = useSelector((state) => state?.user?.currentUser?._id);

   const getUser = async () => {
        try {
            const response = await axios(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(response?.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getUser();
    }, [user, postBookmarked]);

    //Function to create bookmark
    const createBookmark = async () =>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${post?._id}/bookmark`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}` }});
                if(response?.data?.bookmarks?.includes(post?._id)){
                    setPostBookmarked(true)
                }else{
                    setPostBookmarked(false)
                }
           
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <button onClick={createBookmark}>{postBookmarked? <FaBookmark/> : <FaRegBookmark/>}</button>
  )
}

export default BookmarkPosts