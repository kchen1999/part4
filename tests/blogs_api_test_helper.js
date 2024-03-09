const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: "blog1",
        author: "author1",
        url: "www.blog1.com",
        likes: 34
    }, 
    {
        title: "blog2",
        author: "author3",
        url: "www.blog2.com",
        likes: 56
    },
]

const nonExistingId = async () => {
    const blog = newBlog({
        title: "willRemoveBlog",
        author: "authorX",
        url: "www.willRemoveBlog.com",
        likes: 121
    })
    await blog.save()
    await blog.deleteOne()
    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb
}