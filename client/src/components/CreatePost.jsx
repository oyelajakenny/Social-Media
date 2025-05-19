import React from 'react'
import { useSelector } from 'react-redux'
import ProfileImage from './ProfileImage'

const CreatePost = ({onCreatePost, error}) => {
const [body, setBody] = React.useState("")
const [image, setImage] = React.useState("")
const profilePhoto = useSelector((state)=>state?.user?.currentUser?.profilePhoto)


   const createPost=(e)=>{
    e.preventDefault()
    }
  return (
    <form encType='multipart/form-data' onSubmit={createPost}>
{error && <p>{error}</p>}
<div className='flex gap-2  w-[600px]'>
    <ProfileImage image={profilePhoto}/>
    <textarea
        value={body}
        onChange={(e)=>setBody(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full h-32 p-2 border border-gray-300 rounded-lg"
        />
</div>
<div className='flex gap-7 justify-end items-center mt-2'>
    <span></span>
    <div>
        <label htmlFor='image'></label>
        <input
            type="text"
            name="image"
            id="image"
            accept="image/*"
            onChange={(e)=>setImage(e.target.files[0])}
              
            />
            <button type='submit' className='bg-blue-400 text-white px-6 py-2 rounded-md'>Post</button>
    </div>
</div>

    </form>
  )
}

export default CreatePost