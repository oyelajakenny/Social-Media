import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProfileImage from "./ProfileImage";
import axios from "axios";
import TimeAgo from "react-timeago";
import { Link } from "react-router-dom";

const Feed = ({ post }) => {
  const [creator, setCreator] = useState({});
  const token = useSelector((state) => state?.user?.currentUser?.token);
  const [showFeedHeaderMenu, setShowFeedHeaderMenu] = useState(false);

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
    <article className="border p-5 flex flex-col gap-3 rounded-lg shadow-sm">
      <header >
        <Link to={`/users/${post?.creator}`} className="flex items-center gap-3">
          <ProfileImage image={creator?.profilePhoto} />
          <div className="">
            <h4>{creator?.fullName}</h4>
            <small>
              <TimeAgo date={post?.createdAt} />
            </small>
          </div>
        </Link>
        {showFeedHeaderMenu &&
          userId == post?.creator &&
          location.pathname.includes("users") && 
            <menu>
              <button onClick={showEditPostModal}>Edit</button>
              <button onClick={deletePost}>Delete</button>
            </menu>
          }
      </header>
    </article>
  );
};

export default Feed;
