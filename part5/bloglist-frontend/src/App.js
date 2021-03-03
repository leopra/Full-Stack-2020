import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [sendBlog, setSendBlog] = useState({ 'title': '', 'author': '', 'url': '' })


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('Wrong credentials')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setUser('')
    window.localStorage.removeItem('loggedUser')
  }

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

    blogService
      .create(blogObj)
      .then(ret => {
        setBlogs(blogs.concat(ret))
        setSendBlog({ 'title': '', 'author': '', 'url': '' })
        setNotification(ret)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }

  const loginForm = () => (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div >
  )

  const formBlog = () => (
    <form onSubmit={addBlog}>
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

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={notification} />

      {user ? <div><p>{user.name} logged in</p><button onClick={handleLogout}>logout</button>{formBlog()}
      </div>

        : loginForm()}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />)}
    </div>
  )
}

export default App