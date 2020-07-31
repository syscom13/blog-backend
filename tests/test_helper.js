const Blog = require('../models/blog')

const initialBlogs = [
    {
        'title': 'Canonical string reduction',
        'author': 'Edsger W. Dijkstra',
        'url': 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        'likes': 12,
        'id': '5ee3f350fe478d85356aa332'
    },
    {
        'title': 'First class tests',
        'author': 'Robert C. Martin',
        'url': 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
        'likes': 10,
        'id': '5ee3f37d7ca6de857ee98a15'
    },
    {
        'title': 'TDD harms architecture',
        'author': 'Robert C. Martin',
        'url': 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        'likes': 0,
        'id': '5ee3f3817ca6de857ee98a16'
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = { initialBlogs, blogsInDb, usersInDb }