import React, { use } from 'react'
import { FaRegBookmark } from 'react-icons/fa';
import { FaBookmark } from 'react-icons/fa';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';


const BookmarkPosts = () => {
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
  return (
    <button>{postBookmarked? <FaBookmark/> : <FaRegBookmark/>}</button>
  )
}

export default BookmarkPosts