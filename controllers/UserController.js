const { User } = require('../models')
const bcrypt = require('bcryptjs')
const time = require('../helpers')

class UserController {
  static registForm(req, res) {
    let error = req.query.error
    res.render('registform', {error})
  }
  static postRegist(req, res) {
    const { userName, email, password, role } = req.body;
    // console.log(req.body);
    User.create({ userName, email, password, role })
      .then(_ => {
        res.redirect('/login')
      })
      .catch(err => {
        res.send(err);
      })
  }
  static loginForm(req, res) {
    const { error } = req.query
    res.render('loginform', { error })
  }
  static postLogin(req, res) {
    const { email, password } = req.body
    User.findOne({ where: { email } })
      .then(user => {
        if (user) {
          const isValidPassword = bcrypt.compareSync(password, user.password)
          if (isValidPassword) {
            req.session.userId = user.id
            req.session.role = user.role
            return res.redirect('/')
          } else {
            const error = 'invalid email/password'
            return res.redirect(`/login?error=${error}`)
          }
        } else {
          const error = 'invalid email/password'
          return res.redirect(`/login?error=${error}`)
        }
      })
      .catch(err => {
        res.send(err);
      })
  }
  static logOut(req, res) {
    req.session.destroy((err) => {
      if (err){
        res.send(err)
      } else {
        res.redirect('login')
      }
    })
  }
  
  static deleteUser(req, res) {
    const { id } = req.params
    User.destroy({
      where: { id: +id }
    })
      .then(_ => {
        res.redirect('/login')
      })
      .catch(err => {
        res.send(err)
      })
  }
}

module.exports = UserController;