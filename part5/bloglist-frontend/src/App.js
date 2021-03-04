import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Toggable'
import LoginForm from './components/LoginForm'
import FormBlog from './components/FormBlog'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)


  useEffect(() => {
    async function getData() {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    getData()
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

  const addBlog = async (blogObject) => {
    const ret = await blogService.create(blogObject)

    setBlogs(blogs.concat(ret))
    console.log(ret)
    setNotification(JSON.stringify(ret) + ' ADDED')
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const doLike = async (id, blogObject) => {
    try {
      await blogService.update(id, blogObject)
      const updatedBlog = {
        ...blogObject,
        id,
      }
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)))
    } catch (err) {
      console.error(err)
      setNotification({
        error: 'error!!',
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const formBlog = () => (
    <div>
      <Togglable buttonLabel='create new blog'>
        <FormBlog
          createBlog={addBlog}
        />
      </Togglable>
    </div>
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={notification} />

      {user ? <div><p>{user.name} logged in</p><button onClick={handleLogout}>logout</button><div><span></span></div>
        {formBlog()}
      </div>

        : loginForm()}

      {blogs.sort((a,b) => (b.likes - a.likes)).map(blog => {
        return (<Blog
          user={blog.user}
          removeBlog={() => { }}
          doLike={doLike}
          key={blog.id}
          blog={blog}
        />)
      }
      )}
    </div>
  )
}

export default App