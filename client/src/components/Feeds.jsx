import React from 'react'
import Feed from './Feed'

const Feeds = ({posts}) => {
  return (
    <div>
        {posts.length < 1 ? <p>No posts found</p>: posts?.map(post=><Feed key={post?._id} post={post}/>)}
    </div>
  )
}

export default Feeds