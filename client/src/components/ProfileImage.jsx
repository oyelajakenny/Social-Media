import React, { useState } from "react";

const ProfileImage = ({ image }) => {
  const [imgError, setImgError] = useState(false);
  const defaultImage =
    "https://res.cloudinary.com/dyfskvja8/image/upload/v1746445145/avatar-default_zm90n6.svg";

  const handleImageError = () => {
    setImgError(true);
  };

  return (
    <div>
      <img
        src={imgError || !image ? defaultImage : image}
        alt="profile"
        className="w-10 h-10 rounded-full object-cover"
        onError={handleImageError}
      />
    </div>
  );
};

export default ProfileImage;
