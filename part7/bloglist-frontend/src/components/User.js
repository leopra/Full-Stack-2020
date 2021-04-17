import { useRouteMatch } from 'react-router-dom'
import React from 'react'
import { useSelector } from 'react-redux'

const User = () => {
  const users = useSelector((state) => state.allUsers)
  const userid = useRouteMatch('/users/:id')

  console.log('ggg', users)
  console.log(userid)

  const user = users.find(u => u.id === userid.params.id)

  if (!user) {
    return null
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>Added blogs</h2>
      { user.blogs.length > 0 ? user.blogs.map((b) => <li key={b.id}>
        {b.title}
      </li>) : <p>No Blogs Added</p>}
    </div>
  )
}


export default User