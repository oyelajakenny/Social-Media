import React from 'react'

const ProfileImage = ({image}) => {
  return (
    <div>
        <img src={image} alt="profile" className="w-10 h-10 rounded-full"  /> 

    </div>
  )
}

export default ProfileImage