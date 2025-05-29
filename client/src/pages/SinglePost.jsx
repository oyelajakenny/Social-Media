import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProfileImage from '../components/ProfileImage';
import { useSelector } from 'react-redux';
import axios from 'axios';
import TimeAgo from 'react-timeago';
import LIkeDislikePost from '../components/LikeDislikePost';
import { IoMdSend, IoMdShare } from 'react-icons/io';
import { FaRegCommentDots } from 'react-icons/fa';
import BookmarkPosts from '../components/BookmarkPosts';
import PostComments from '../components/PostComments';




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

 

//Function to delete a comment
const deleteComment = async (commentId) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/comments/${commentId}`,
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    setComments(comments.filter(c => c?._id !== commentId));
  } catch (error) {
    console.log(error);
  }
}

//Function to create comment
const createComment=async ()=>{
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/comments/${id}`,{comment}, {withCredentials: true, headers:{Authorization: `Bearer ${token}`}})
    const newComment = response?.data;
    setComments([newComment, ...newComment]);
  } catch (error) {
    console.log(error)
  }
}
useEffect(() => {
  getPost();
}, [deleteComment]);
  return (
    <section className=" p-4 max-w-[700px] min-w-[700px] bg-white rounded-lg shadow-md">
      <header className="flex items-center gap-3 mb-4">
        <ProfileImage image={post?.creator?.profilePhoto} />
        <div className="flex flex-col gap-1">
          <h4 className="text-xl font-semibold">{post?.creator?.fullName}</h4>
          <small>
            <TimeAgo date={post?.createdAt} className="text-lg font-normal" />
          </small>{" "}
        </div>
      </header>
      <div>
        <p>{post?.body}</p>
        <div>
          <img
            src={post?.image}
            alt={post?.body}
            className="w-full h-auto rounded-lg mt-2"
          />
        </div>
      </div>
      <footer className="mt-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {post?.likes && <LIkeDislikePost post={post} />}
          <button>
            <FaRegCommentDots />
          </button>
          <button>
            <IoMdShare />
          </button>
        </div>
        <BookmarkPosts post={post} />
      </footer>
      <ul>
        <form
          onSubmit={createComment}
          className="flex items-center gap-3 mt-4 border p-4 rounded-lg bg-white shadow-sm"
        >
          <ProfileImage image={post?.currentUser?.profilePhoto} />
          <textarea
            value={comment}
            placeholder="Add a comment..."
            className="border p-2 rounded-lg w-full bg-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setComment(e.target.value)}
          >
            {comment}
          </textarea>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            <IoMdSend className="text-lg" />
          </button>
        </form>
        {post?.comments?.map((comment) => (
          <PostComments
            key={comment?._id}
            comment={comment}
            onDeleteComment={deleteComment}
          />
        ))}
      </ul>
    </section>
  );
}

export default SinglePost