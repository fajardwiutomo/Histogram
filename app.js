const express = require('express')
const app = express()
const port = 3000
const PostController = require('./controllers/PostController')
const UserController = require('./controllers/UserController')
const session = require('express-session')
const router = require('./routers')

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
app.get('/:id/delete', UserController.deleteUser)
app.use('/', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})