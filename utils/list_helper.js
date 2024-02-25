const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.length === 0 
        ? 0
        : blogs.reduce((sumOfLikes, blog) => sumOfLikes + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
 
    const reducer = (mostLikedBlog, blog) => {
        if(blog.likes > mostLikedBlog.likes) {
            mostLikedBlog.title = blog.title
            mostLikedBlog.author = blog.author
            mostLikedBlog.likes = blog.likes
        }
        return mostLikedBlog
    }
    
    return blogs.length === 0 
        ? {}
        : blogs.reduce(reducer, {
            title: '',
            author: '',
            likes: 0
        })
} 

const mostBlogs = (blogs) => {

    return blogs.length === 0 
    ? {}
    : _.maxBy(
        Object.entries(_.countBy(blogs, 'author')).map(element => 
        {
            return {
                'author': element[0],
                'blogs': element[1]
            }
        }), 'blogs')
}

const mostLikes = (blogs) => {
    return blogs.length === 0 
    ? {}
    : _.maxBy(
      Object.entries(_.groupBy(blogs, 'author')).map(element => 
        {
            return {
                'author': element[0],
                'likes': _.sumBy(element[1], 'likes')
            }
        }), 'likes')

}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
