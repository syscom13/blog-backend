const totalLikes = require('../utils/list_helper').totalLikes
const favoriteBlog = require('../utils/list_helper').favoriteBlog
const mostBlogs = require('../utils/list_helper').mostBlogs
const mostLikes = require('../utils/list_helper').mostLikes

const oneBlog = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    }
]

const blogs = [ 
    { 
        title: "React patterns", 
        author: "Michael Chan", 
        likes: 7, 
    },
    { 
        title: "Go To Statement Considered Harmful", 
        author: "Edsger W. Dijkstra", 
        likes: 5, 
    }, 
    { 
        title: "Canonical string reduction", 
        author: "Edsger W. Dijkstra", 
        likes: 12, 
    }, 
    { 
        title: "First class tests", 
        author: "Robert C. Martin",
        likes: 10, 
    }, 
    { 
        title: "TDD harms architecture", 
        author: "Robert C. Martin", 
        likes: 0, 
    }, 
    { 
        title: "Type wars", 
        author: "Robert C. Martin", 
        likes: 2, 
    }
]


describe('total likes', () => {
    test('of an empty list is zero', () => {
        const result = totalLikes([])
        expect(result).toBe(0)
    })

    test('when the list has only one blog equals the likes of that', () => {
        const result = totalLikes(oneBlog)
        expect(result).toBe(5)
    })

    test('of a bigger list is correctly calculated', () => {
        const result = totalLikes(blogs)
        expect(result).toBe(36)
    })
})

describe('favorite blog', () => {
    test('of an empty list is undefined', () => {
        const result = favoriteBlog([])
        expect(result).toEqual(undefined)
    })
    
    test('when a list has only one blog equals to that blog', () => {
        const popular = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
          }
        const result = favoriteBlog(oneBlog)
        expect(result).toEqual(popular)
    })
    
    test('of a bigger list is the blog with the highest number of likes', () => {
        const popular = { 
            title: "Canonical string reduction", 
            author: "Edsger W. Dijkstra", 
            likes: 12, 
        }
        const result = favoriteBlog(blogs)
        expect(result).toEqual(popular)
    })
})

describe('The top author by blogs published', () => {
    test('of an empty list is undefined', () => {
        const result = mostBlogs([])
        expect(result).toEqual(undefined)
    })
    
    test('when a list has only one blog equals to the author of that blog', () => {
        const author = {
            author: 'Edsger W. Dijkstra',
            blogs: 1
        }
        const result = mostBlogs(oneBlog)
        expect(result).toEqual(author)
    })
    
    test('of a bigger list is the author with the highest number of blogs published', () => {
        const author = {
            author: 'Robert C. Martin',
            blogs: 3
        }
        const result = mostBlogs(blogs)
        expect(result).toEqual(author)
    })
})

describe('The top author by total likes', () => {
    test('of an empty list is undefined', () => {
        const result = mostLikes([])
        expect(result).toEqual(undefined)
    })
    
    test('when a list has only one blog equals to the likes of that blog', () => {
        const author = {
            author: 'Edsger W. Dijkstra',
            likes: 5,
        }
        const result = mostLikes(oneBlog)
        expect(result).toEqual(author)
    })
    
    test('of a bigger list is the author with the highest number of combined likes', () => {
        const author = {
            author: 'Edsger W. Dijkstra',
            likes: 17
        }
        const result = mostLikes(blogs)
        expect(result).toEqual(author)
    })
})