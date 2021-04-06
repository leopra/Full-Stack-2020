const _ = require("lodash");

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {

  return blogs.length === 0
    ? 0
    : blogs.reduce((a, b) => ({ likes: a.likes + b.likes })).likes

}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((prev, curr) => {
      return (prev.likes > curr.likes) ? prev : curr
    })
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authorBlogs = _.maxBy(_.toPairs(_.countBy(_.map(blogs, "author"))), _.last)

  const mostaut = {
    author: authorBlogs[0],
    blogs: authorBlogs[1],
  }

  return mostaut
}


const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const reducer = (acc, blog) => {
    if (!acc[blog.author]) {
      acc = { ...acc, [blog.author]: blog.likes }
    }
    else
      acc = { ...acc, [blog.author]: acc[blog.author] + blog.likes }

    return acc
  }

  const countslikes = blogs.reduce(reducer, {})
  const mostlikesauth = _.maxBy(_.toPairs(countslikes), _.last)
  return { 'author': mostlikesauth[0], 'likes': mostlikesauth[1] }

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}


