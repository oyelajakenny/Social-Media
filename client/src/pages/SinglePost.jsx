import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProfileImage from '../components/ProfileImage';
import { useSelector } from 'react-redux';
import axios from 'axios';
import TimeAgo from 'react-timeago';
import LIkeDislikePost from '../components/LikeDislikePost';



const SinglePost = () => {
  let {id} = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const token = useSelector(state => state?.user?.currentUser?.token);


  //Get post from database
  const getPost = async ()=>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${id}`, {
        withCredentials: true, headers: { Authorization: `Bearer ${token}` }
      });
      setPost(response?.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
   <section className="max-w-3xl p-4">
    <header className='flex items-center gap-3 mb-4'>
      <ProfileImage image={post?.creator?.profilePhoto} />
      <div className="flex flex-col gap-1">
        <h4 className="text-xl font-semibold">{post?.creator?.fullName}</h4>
        <small>
          <TimeAgo date={post?.createdAt} className="text-lg font-normal" />
        </small>  </div>
    </header>
    <div>
      <p>{post?.body}</p>
      <div>
        <img src={post?.image} alt={post?.body} className="w-full h-auto rounded-lg mt-2" />
      </div>
      <LIkeDislikePost post={post}  />
    </div>
    </section>
  )
}

export default SinglePost