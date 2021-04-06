import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserList = () => {

  const users = useSelector((state) =>  state.allUsers)
  
  return (
    <div>
      <h1>Users</h1>
      <span>username</span>
      <span>blogs created</span>
      <ul>
        {users?.map((user) => (
          <li key={user?.id}>
            <Link to={`/users/${user.id}`}>
              <span>{user?.username}</span>
              <span>
                {user?.blogs?.length}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}



export default UserList