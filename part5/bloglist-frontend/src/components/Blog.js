import React, { useState } from 'react'

const Blog = ({ blog, doLike, deleteBlog, user }) => {

  const hidestyle = {
    display: 'none'
  }

  const showstyle = {
    display: 'inline'
  }
  const [show, setShow] = useState(false)
  const [postedBy, setPostedBy] = useState('')
  const [username, setUsername] = useState('')


  const toggleExpanded = () => {
    setShow(!show)
  }

  return (
    <div>
      <span>{blog.title}</span>
      <span>Author: </span>
      <span>{blog.author}</span>
      <button
        onClick={toggleExpanded} style={show ? hidestyle : showstyle}>View
        </button>
      <button
        onClick={toggleExpanded} style={!show ? hidestyle : showstyle}>Hide
      </button>

      <div style={!show ? hidestyle : showstyle}>
        <div>
          <span>{blog.url}</span>
        </div>
        <div>
          <span></span>
        </div>
        <span>Likes</span>
        <span>{blog.likes}</span>
        <button onClick={() => { }}>
          Like
        </button>
        <div>
          <span>Posted by: </span>
          <span> {blog.user?.name || postedBy}</span>
        </div>
      </div>
      {(blog.user?.username === user.username ||
        username === user.username) && (
          <button onClick={deleteBlog}>
            Remove
          </button>
        )}
    </div>
  )
}


export default Blog
