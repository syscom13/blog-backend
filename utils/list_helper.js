const totalLikes = blogs => blogs.reduce((sum, item) => sum + item.likes, 0)

const favoriteBlog = blogs => {
    let max
    let popular
  
    blogs.forEach((blog, index) => {
        if (index === 0) {
            max = blog.likes
        }

        if (blog.likes >= max) {
            max = blog.likes
            popular = blog
        }
    })
  
    if (popular) {
        return (
            {
                title: popular.title,
                author: popular.author,
                likes: popular.likes
            }
        )
    }
}
  
  
const mostBlogs = blogs => {
    const authors = blogs.map(blog => blog.author)
    const count = {} // count = {author1: 2, author2: 8, author3: 1} = { author: blogs }

    authors.forEach(author => {
        if (!count[author]) {
            count[author] = 1
        } else {
            count[author] = count[author] + 1
        }
    })

    let max = 0
    let bestAuthor

    for (let key in count) {
        if (count[key] > max) {
            max = count[key]
            bestAuthor = { author: key, blogs: count[key] }
        }
    }

    return bestAuthor
}
  
const mostLikes = blogs => {
    let likes = {} // {author1: 12, author2: 5, author3: 10} = { author: likes }

    blogs.forEach(blog => {
        if(!likes[blog.author]) {
            likes[blog.author] = blog.likes
        } else {
            likes[blog.author] = likes[blog.author] + blog.likes
        }
    })

    let max = 0
    let bestAuthor

    for (let key in likes) {
        if (likes[key] > max) {
            max = likes[key]
            bestAuthor = { author: key, likes: likes[key] }
        }
    }

    return bestAuthor
}

module.exports = { totalLikes, favoriteBlog, mostBlogs, mostLikes }