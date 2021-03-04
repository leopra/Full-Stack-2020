import React, { useState } from 'react'

const Blog = ({ blog, doLike, removeBlog, user }) => {

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

  const updateLikes = () => {
    const { id, author, url, title, user , likes} = blog
    const updatedBlog = {
      user: user,
      likes: likes + 1,
      title,
      author,
      url,
    }
    setPostedBy(postedBy || blog.user?.name)
    setUsername(username || blog.user?.username)
    doLike(id, updatedBlog)
  }

  const HandleDeleteBlog = () => {
    removeBlog(blog.id)
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
        <button onClick={updateLikes}>
          Like
        </button>
        <div>
          <span>Posted by: </span>
          <span> {blog.user.name}</span>
        </div>
      </div>
      {(blog.user?.username === user.username ||
        username === user.username) && (
          <button onClick={HandleDeleteBlog}>
            Remove
          </button>
        )}
    </div>
  )
}


export default Blog
