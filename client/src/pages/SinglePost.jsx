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
        <form>
          <div className="flex items-center gap-3 mt-4">
            <ProfileImage image={post?.creator?.profilePhoto} />
            <textarea
              type="text"
              placeholder="Add a comment..."
              className="border p-2 rounded-lg w-full"
              onChange={(e) => setComment(e.target.value)}
            >{comment}</textarea>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={(e) => {
                e.preventDefault();
                // Add comment submission logic here
                setComment("");
              }}
            >
              <IoMdSend className="text-lg" />
            </button>
          </div>
        </form>
      </ul>
    </section>
  );
}

export default SinglePost