import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import Blog from './Blog'

const BlogView = () => {
    const blogs = useSelector((state) => state.blogs)
    const user = useSelector((state) => state.login)

    const match = useRouteMatch('/blogs/:id')
    const blog = blogs.find((b) => b.id === match.params.id)

    return (<Blog actualuser={user}
        removeBlog={()=>{}}
        doLike={() => {}}
        blog={blog}></Blog>)

}