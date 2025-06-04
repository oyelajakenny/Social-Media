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
    <li className="flex items-start justify-between gap-4 py-2 px-3 border-b border-gray-200 bg-white rounded-lg shadow-sm my-2">
        <div className="flex items-start gap-4">
            <div>
                <img src={comment?.creator?.creatorPhoto} alt="profile" className="w-10 h-10 rounded-full" />
            </div>
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <h5 className='text-lg font-semibold'>{comment?.creator?.creatorName}</h5>
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