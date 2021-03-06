const express = require('express')
const routerPost = express.Router()
const PostController = require('../controllers/PostController')

routerPost.get('/', PostController.post)
routerPost.get('/add', PostController.addPost)
routerPost.post('/add', PostController.postAddPost)
routerPost.get('/detail/:postId', PostController.postDetail)
routerPost.get('/detail/:postId/edit', PostController.editPost)
routerPost.post('/detail/:postId/edit', PostController.postEditPost)
routerPost.get('/detail/:postId/like', PostController.likePost)
routerPost.get('/detail/:postId/delete', PostController.Delete)

module.exports =routerPost