const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
    response.json(blogs)
  })
  
blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
  
    try {
      if(request.token === null) {
        return response.status(401).json({ error: 'token invalid or missing' })
      }
      const user = request.user
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user.id
      })
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.status(201).json(savedBlog)
      }
    catch(exception) {
      next(exception)
    }
  })

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
      if(request.token === null) {
        return response.status(401).json({ error: 'token invalid or missing' })
      }
      const blog = await Blog.findById(request.params.id)
      const user = request.user
      if(!(blog.user.toString() === user.id.toString())) {
        return response.status(401).json({ error: 'token invalid' })
      }
      else {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
      } 
      }
    catch(exception) {
      next(exception)
    }
})

blogsRouter.get('/:id', async(request, response, next) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog)
    }
    else {
      response.status(404).end()
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes 
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.status(200).json(updatedBlog)
  }
  catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter