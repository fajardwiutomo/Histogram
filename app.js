const express = require('express')
const app = express()
const port = 3000
const Controller = require('./controllers/controller')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))

app.get('/', Controller.landingPage)
app.get('/post', Controller.post)
app.get('/registration', Controller.register)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})