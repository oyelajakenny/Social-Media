import React from 'react'
import Feed from './Feed'

const Feeds = ({posts}) => {
  return (
    <div className='flex flex-col gap-4 mt-10'>
        {posts.length < 1 ? <p>No posts found</p>: posts?.map(post=><Feed key={post?._id} post={post}/>)}
    </div>
  )
}

export default Feeds