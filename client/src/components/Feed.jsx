import React from 'react'
import { useSelector } from 'react-redux'
import ProfileImage from './ProfileImage'
import axios from 'axios'
import TimeAgo from "react-timeago"

const Feed = ({post}) => {
    const [creator, setCreator] = useState({})
    const token = useSelector((state)=>state?.user?.currentUser?.token)

    const getPostCreator = async ()=>{
        try {
            const response = await axios(`${import.meta.env.VITE_API_URL}/users/${post?.creator}`, {withCredentials: true, headers: {Authoriation: `Bearer ${token}`}})
            setCreator(response?.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getPostCreator()
    }, [])
  return (
    <article>
        <header className="feed">
            <Link to={`/users/${post?.creator}`}>
            <ProfileImage image={creator?.profilePhoto}/>
            <div>
                <h4>{creator?.fullName}</h4>
                <small><TimeAgo date={post?.createdAt}/></small>
            </div>
            </Link>
        </header>
    </article>
  )
}

export default Feed