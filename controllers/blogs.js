const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
    const body = req.body

    const decodedToken = await jwt.verify(req.token, process.env.SECRET)
    if (!req.token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (req, res) => {
    const body = req.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    res.send(updatedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
    const decodedToken = await jwt.verify(req.token, process.env.SECRET)
    if (!req.token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(req.params.id)

    console.log(decodedToken.id.toString(), blog.user.toString())

    if (decodedToken.id.toString() === blog.user.toString()) {
        await blog.remove()
        res.status(204).end()
    } else {
        return res.status(401).json({ error: 'Unauthorized' })
    }
})

module.exports = blogsRouter