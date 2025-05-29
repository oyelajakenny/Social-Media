import React, { use } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Feed from "../components/Feed";
import { useEffect, useState } from "react";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector((state) => state?.user?.currentUser?.token);

  //GET Bookmarks of Logined User

  const getBookmarks = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/bookmarks`,{withCredentials: true, headers: { Authorization: `Bearer ${token}` }});
      setBookmarks(response?.data?.bookmarks);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getBookmarks();
  }, []);

  return (
    <section>
      {bookmarks?.length < 1 ? (
        <p>No posts bookmarked</p>
      ) : (
        bookmarks?.map((bookmark) => (
          <Feed key={bookmark?._id} post={bookmark} />
        ))
      )}
    </section>
  );
};

export default Bookmarks;
