import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Toggable'
import LoginForm from './components/LoginForm'
import FormBlog from './components/FormBlog'
import UserList from './components/UserList'
import User from './components/User'
import { setAllUsers } from './reducers/allUsersReducer'

import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'
import { useSelector } from 'react-redux'

import {
  Switch, Route
} from "react-router-dom"

const App = () => {

  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const user = useSelector((state) => state.user)

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
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])


  useEffect(() => {
    async function getData() {
      dispatch(setAllUsers())
    }
    getData()
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
      console.log(user)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('Wrong credentials', 5000))
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(setUser(''))
    window.localStorage.removeItem('loggedUser')
  }

  const addBlog = async (blogObject) => {
    const ret = await blogService.create(blogObject)

    setBlogs(blogs.concat({ ...ret, user: { ...user } }))
  }

  const deleteBlog = async (id) => {
    try {
      const bl = blogs.filter((blog) => blog.id === id)

      if (window.confirm(`Remove ${bl[0].title}?`)) {
        await blogService.deleteBlog(id)

        setBlogs(blogs.filter((blog) => blog.id !== id))
      }
    } catch (err) {
      console.error(err)
      dispatch(setNotification('error'), 5000)
    }
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
      dispatch(setNotification('error!!', 5000))
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
      <Notification />

      {user ? <div><p>{user.name} logged in</p><button onClick={handleLogout}>logout</button><div><span></span></div>
        {formBlog()}
      </div>

        : loginForm()}

      <Switch>
        <Route exact path="/users">
          <UserList />
        </Route>
        <Route exact path="/users/:id">
          <User />
        </Route>
        <Route exact path="/blogs/:id">
          <User />
        </Route>
        <Route exact path="/">
          {blogs.sort((a, b) => (b.likes - a.likes)).map(blog => {
            return (<Blog
              actualuser={user}
              removeBlog={deleteBlog}
              doLike={doLike}
              key={blog.id}
              blog={blog}
            />)
          }
          )}
        </Route>


      </Switch>

    </div>
  )
}

export default App