import React from 'react'
import { FaRegTrashAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import TimeAgo from 'react-timeago';

const PostComments = ({comment, onDeleteComment}) => {
    const token = useSelector(state => state?.user?.currentUser?.token);
    const userId = useSelector(state => state?.user?.currentUser?.id);

    const deleteComment = async () => {
        onDeleteComment(comment?._id);
    }
  return (
    <li>
        <div>
            <div>
                <img src={comment?.creator?.creatorPhtoto} alt="profile" className="w-10 h-10 rounded-full" />
            </div>
            <div>
                <div>
                    <h5>{comment?.creator?.creatorname}</h5>
                    <small><TimeAgo date={comment?.createdAt}/></small>
                </div>
                <p>{comment?.comment}</p>
            </div>
        </div>
        {userId === comment?.creator?.creatorId && (
            <button onClick={deleteComment} className="text-red-500 hover:underline">
                <FaRegTrashAlt className="inline-block mr-1" />
            </button>
        )}  
    </li>
  )
}

export default PostComments