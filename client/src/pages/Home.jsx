import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CreatePost from "../components/CreatePost";
import axios from "axios";
import Feeds from "../components/Feeds";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const token = useSelector((state) => state?.user?.currentUser?.token);

  //Functio to create a new post
  // and add it to the posts state
  const createPost = async (data) => {
    setError("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/posts`,
        data,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const newPost = response?.data;
      setPosts([newPost, ...posts]);
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  //Function to get all posts
  const getPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axios(`${import.meta.env.VITE_API_URL}/posts`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, [setPosts]);

  return (
    <div className=" p-5 border h-fit rounded-lg shadow-md ">
      <CreatePost onCreatePost={createPost} error={error} />
      <Feeds posts={posts} onSetPosts={setPosts} />
    </div>
  );
};

export default Home;
