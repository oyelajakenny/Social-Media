import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { LuUpload } from "react-icons/lu";
import { FaCheck } from "react-icons/fa";
import axios from "axios";

const UserProfile = () => {
  const token = useSelector((state) => state.user?.currentUser?.token);
  const loggedInUser = useSelector((state) => state?.user?.currentUser?.id);

  const [user, setUser] = React.useState({});
  const [followsuser, setFollowsUser] = useState(
    user?.followers?.includes(loggedInUser)
  );
  const [avatar, setAvatar] = useState(user?.profilePhoto);
  const { id: userId } = useParams();
  const [avatarTouched, setAvatarTouched] = useState(false);

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.ENV.VITE_API_URL}/users/${userId}`,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(response?.data);
      setFollowsUser(response?.data?.followers?.includes(loggedInUser));
      setAvatar(response?.data?.profilePhoto);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // Function to change avatar/profile photo
  const changeAvatarHandler = async () => {};
  return (
    <section className="flex justify-center items-center min-h-[40vh] bg-gray-50 py-8">
      <div className="bg-white shadow-lg rounded-xl p-8 flex flex-col items-center w-full max-w-md">
        <form
          onSubmit={changeAvatarHandler}
          encType="multipart/form-data"
          className="flex flex-col items-center gap-4 w-full"
        >
          <img
            src={user?.profilePhoto}
            alt="Profile"
            className="w-28 h-28 rounded-full mb-4 border-4 border-blue-200 shadow-md object-cover"
          />
          {!avatarTouched ? (
            <label
              htmlFor="avatar"
              className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors duration-200"
            >
              <span className="text-xl">
                <LuUpload />
              </span>
              <span className="font-medium">Change Avatar</span>
            </label>
          ) : (
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200"
            >
              <FaCheck className="text-lg" />
              <span className="font-medium">Save</span>
            </button>
          )}

          <input
            type="file"
            name="avatar"
            id="avatar"
            className="hidden"
            onChange={(e) => {
              setAvatar(e.target.files[0]);
              setAvatarTouched(true);
            }}
            accept="image/png, image/jpg, image/jpeg"
          />
        </form>
      </div>
    </section>
  );
};

export default UserProfile;
