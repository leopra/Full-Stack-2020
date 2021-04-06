
import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const FormBlog = ({ createBlog }) => {
  const dispatch = useDispatch()


  const [sendBlog, setSendBlog] = useState({ 'title': '', 'author': '', 'url': '' })

  const handleBlogChange = (event, par) => {
    const bl = { ...sendBlog }
    bl[par] = event.target.value
    setSendBlog(bl)
  }

  const HandleAddBlog = (event) => {
    event.preventDefault()
    const blogObj = {
      title: sendBlog.title,
      author: sendBlog.author,
      url: sendBlog.url
    }
    createBlog(blogObj)
    dispatch(setNotification(`BLOG ${blogObj.title} ADDED`,5000))
    setSendBlog({ 'title': '', 'author': '', 'url': '' })
  }

  return (<form onSubmit={HandleAddBlog}>
    <h2>Create New</h2>
    <div>
      title:
      <input className='title'
        value={sendBlog.title}
        onChange={(e) => handleBlogChange(e, 'title')}
      />
    </div>
    <div>
      author:
      <input id='authorinput' className='author'
        value={sendBlog.author}
        onChange={(e) => handleBlogChange(e, 'author')}
      />
    </div>
    <div>
      url:
      <input className='url'
        value={sendBlog.url}
        onChange={(e) => handleBlogChange(e, 'url')}
      />
    </div>
    <button type="submit">save</button>
  </form>
  )
}

export default FormBlog