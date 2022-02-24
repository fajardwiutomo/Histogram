const express = require('express')
const app = express()
const port = 3000
const PostController = require('./controllers/PostController')
const UserController = require('./controllers/UserController')
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))
app.use(session({
  secret: 'rahasia perusahaan',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    sameSite: true
  }
}))

app.get('/', PostController.landingPage)
app.get('/register', UserController.registForm)
app.post('/register', UserController.postRegist)
app.get('/login', UserController.loginForm)
app.post('/login', UserController.postLogin)
app.use(function (req, res, next) {
  // console.log(req.session)
  if (!req.session.userId) {
    const error = 'Please login first!'
    res.redirect(`/login?error=${error}`)
  } else {
    next()
  }
})
app.get('/post', PostController.post)
app.get('/detailUser', UserController.showDetailUser)
app.get('/detailUser/add', UserController.formAddDetailUser)
app.post('/detailUser/add', UserController.addDetailUser)
app.get('/registration', PostController.register)
app.get('/post/add', PostController.addPost)
app.post('/post/add', PostController.postAddPost)

app.get('/post/detail/:id', PostController.postDetail)
app.get('/post/detail/:id/edit', PostController.editPost)
app.post('/post/detail/:id/edit', PostController.postEditPost)
app.get('/post/detail/:postId/like', PostController.likePost)
app.get('/post/detail/:postId/delete', PostController.Delete)
app.get('/:id/delete', UserController.deleteUser)
// app.get('/:detailuserId/form', UserController.detailUserForm)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})