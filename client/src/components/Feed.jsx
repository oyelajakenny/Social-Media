import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProfileImage from "./ProfileImage";
import axios from "axios";
import TimeAgo from "react-timeago";
import { Link, useLocation } from "react-router-dom";
import { FaRegCommentDots } from "react-icons/fa";
import LikeDislikePost from "./LikeDislikePost";
import { IoMdShare } from "react-icons/io";
import TrimText from "../helpers/TrimText";
import BookmarkPosts from "./BookmarkPosts";

const Feed = ({ post }) => {
  const [creator, setCreator] = useState({});
  const token = useSelector((state) => state?.user?.currentUser?.token);
  const userId = useSelector((state) => state?.user?.currentUser?.id);
  const [showFeedHeaderMenu, setShowFeedHeaderMenu] = useState(false);
  const location = useLocation();
  const getPostCreator = async () => {
    try {
      const response = await axios(
        `${import.meta.env.VITE_API_URL}/users/${post?.creator}`,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      setCreator(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostCreator();
  }, []);
  return (
    <article className="border p-2 flex flex-col gap-3 rounded-lg shadow-sm bg-white max-w-[700px]">
      <header>
        <Link
          to={`/users/${post?.creator}`}
          className="flex items-center gap-3"
        >
          <ProfileImage image={creator?.profilePhoto} />
          <div className="">
            <h4 className="text-xl font-semibold">{creator?.fullName}</h4>
            <small>
              <TimeAgo date={post?.createdAt} className="text-lg font-normal" />
            </small>
          </div>
        </Link>
        {showFeedHeaderMenu &&
          userId == post?.creator &&
          location.pathname.includes("users") && (
            <menu>
              <button onClick={showEditPostModal}>Edit</button>
              <button onClick={deletePost}>Delete</button>
            </menu>
          )}
      </header>
      <Link to={`/posts/${post?._id}`}>
        <p className="pb-2 text-gray-600"><TrimText item={post?.body} maxLength={160}/> </p>
        <div>
          <img
            src={post?.image}
            alt={post?.body}
            className="w-full h-[500px] object-cover rounded-lg"
          />
        </div>
      </Link>
      <footer>
        <div className="flex items-center gap-3">
          <LikeDislikePost post={post} />
          <button >
            <Link
              to={`/posts/${post?._id}`}
              className="text-blue-400 flex items-center gap-1"
            >
              <FaRegCommentDots />
              <small>{post?.comments?.length}</small>
            </Link>
          </button>
          <button>
            <IoMdShare />
          </button>
        </div>
        <BookmarkPosts post={post} />
      </footer>
    </article>
  );
};

export default Feed;
