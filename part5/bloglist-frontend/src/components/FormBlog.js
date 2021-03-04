
import React, { useState } from 'react'

const FormBlog = ({ createBlog }) => {

  const [sendBlog, setSendBlog] = useState({ 'title': '', 'author': '', 'url': '' })

  const handleBlogChange = (event, par) => {
    const bl = { ...sendBlog }
    bl[par] = event.target.value
    setSendBlog(bl)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObj = {
      title: sendBlog.title,
      author: sendBlog.author,
      url: sendBlog.url
    }
    createBlog(blogObj)
    setSendBlog({ 'title': '', 'author': '', 'url': '' })
  }

  return (<form onSubmit={addBlog}>
    <h2>Create New</h2>
    <div>
      title:
      <input
        value={sendBlog.title}
        onChange={(e) => handleBlogChange(e, 'title')}
      />
    </div>
    <div>
      author:
      <input
        value={sendBlog.author}
        onChange={(e) => handleBlogChange(e, 'author')}
      />
    </div>
    <div>
      url:
      <input
        value={sendBlog.url}
        onChange={(e) => handleBlogChange(e, 'url')}
      />
    </div>
    <button type="submit">save</button>
  </form>
  )
}

export default FormBlog