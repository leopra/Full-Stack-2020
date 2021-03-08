import React, { useState } from 'react'
import './Blog.css';

const Blog = ({ blog, doLike, removeBlog, actualuser }) => {

  console.log(blog)
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
    const { id, author, url, title, user, likes } = blog
    const updatedBlog = {
      user: user,
      likes: likes + 1,
      title,
      author,
      url,
    }
    setPostedBy(postedBy || blog.user.name)
    setUsername(username || blog.user.username)
    doLike(id, updatedBlog)
  }

  const HandleDeleteBlog = () => {
    removeBlog(blog.id)
  }

  const renderDeleteButton = () => {
    if (blog.user.username === actualuser?.username) {
        return (
          <button onClick={HandleDeleteBlog}>
            Remove
          </button>)
    }
  }

  return (
    <div>
      <span className='titlediv'>{blog.title}</span>
      <span>Author: </span>
      <span className='authordiv'>{blog.author}</span>
      <button
        onClick={toggleExpanded} style={show ? hidestyle : showstyle}>View
      </button>
      <button
        onClick={toggleExpanded} style={!show ? hidestyle : showstyle}>Hide
      </button>

      <div data-testid='behidden' style={!show ? hidestyle : showstyle}>
        <div>
          <span>{blog.url}</span>
        </div>
        <div>
        </div>
        <span>Likes</span>
        <span>{blog.likes}</span>
        <button id='likebutton' onClick={updateLikes}>
          Like
        </button>
        <div>
          <span>Posted by: </span>
          <span> {blog.user.username}</span>
        </div>
      </div>
      {renderDeleteButton()}
    </div>
  )
}


export default Blog
