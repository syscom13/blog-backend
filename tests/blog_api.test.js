const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
    jest.setTimeout(30000)
    
    await Blog.deleteMany({})
    
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('all blogs have a unique identifier named id', async () => {
    const blogs = await helper.blogsInDb()
    blogs.forEach(blog => {
        expect(blog.id).toBeDefined()
    })
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'How I manipulated the stock market with twitter',
        author: 'Elon Musk',
        url: 'tesla.com',
        likes: 10
    }
    
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const lastBlogs = await helper.blogsInDb()
    expect(lastBlogs).toHaveLength(helper.initialBlogs.length + 1)
    
    const contents = lastBlogs.map(r => r.title)
    expect(contents).toContain('How I manipulated the stock market with twitter')
})

test('if likes is missing in the request, likes default to zero', async () => {
    const newBlog = {
        title: 'How I manipulated the stock market with twitter',
        author: 'Elon Musk',
        url: 'tesla.com'
    }
    
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const lastBlogs = await helper.blogsInDb()
    expect(lastBlogs[lastBlogs.length -1].likes).toBe(0)
})

test('blog without title and url is not added and response has status 400', async () => {
    const newBlog = {
        author: 'Elon Musk',
        likes: 10
    }
    
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    
    const lastBlogs = await helper.blogsInDb()
    expect(lastBlogs).toHaveLength(helper.initialBlogs.length)
})
/*

test('deletion of a blog succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    
    await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    
    const contents = blogsAtEnd.map(r => r.title)
    expect(contents).not.toContain(blogToDelete.title)
})
*/

afterAll(() => {
    mongoose.connection.close()
})