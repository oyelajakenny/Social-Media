import React from 'react'
import { useSelector } from 'react-redux'
import ProfileImage from './ProfileImage'
import { SlPicture } from 'react-icons/sl'

const CreatePost = ({onCreatePost, error}) => {
const [body, setBody] = React.useState("")
const [image, setImage] = React.useState("")
const profilePhoto = useSelector((state)=>state?.user?.currentUser?.profilePhoto)

//Function to handle the form submission
// and create a new post
   const createPost=(e)=>{
    e.preventDefault()
const postData=new FormData()
postData.set("body", body)
postData.set("image", image)
onCreatePost(postData);
setBody("")
setImage("")

    }
  return (
    <form encType="multipart/form-data" onSubmit={createPost}>
      {error && <p>{error}</p>}
      <div className="flex gap-2  w-[600px]">
        <ProfileImage image={profilePhoto} />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full h-20 p-2 border border-gray-300 rounded-lg bg-gray-200"
        />
      </div>
      <div className="flex gap-7 justify-end items-center mt-2">
        <span></span>
        <div className="flex gap-2">
          <label htmlFor="image" className='flex items-center justify-center bg-gray-400 text-white rounded-lg p-2 cursor-pointer'>
            <SlPicture size={20} />
          </label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className='hidden'
          />
          <button
            type="submit"
            className="bg-blue-400 text-white px-6 py-2 rounded-lg"
          >
            Post
          </button>
        </div>
      </div>
    </form>
  );
}

export default CreatePost