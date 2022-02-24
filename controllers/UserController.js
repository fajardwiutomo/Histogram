const { User, DetailUser, Post } = require('../models')
const bcrypt = require('bcryptjs')




class UserController {
  static registForm(req, res) {
    res.render('registform')
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



  // static detailUserForm (req, res) {
  //   let currentUser = req.session.userId
  //   DetailUser.findAll({
  //     where: { UserId: currentUser }
  //   })
  //     .then(data => {
  //       data = data[0]
  //       res.render('editDetailUserForm', { data, currentUser })
  //     })
  //     .catch(err => res.send(err))
  // }

  static formAddDetailUser(req, res){
    res.render('formDetailUser')
  }

  static addDetailUser(req, res) {
    let currentUser = req.session.userId
    let { firstName, lastName, dateOfBirth, gender, address, phoneNumber } = req.body
    DetailUser.create ({ firstName, lastName, dateOfBirth, gender, address, phoneNumber }, {
      where: { UserId: currentUser }
    })
      .then(data => {
        res.redirect(`/detailUser/${currentUser}`)
      })
      .catch(err => {
        if(err){
          res.send(err)
        }
      })
  }

  static showDetailUser(req, res) {
    let currentUser = req.session.userId
    User.findAll({
      where: { id: currentUser },
      include: [{
        model: DetailUser,
        required: false
      }, {
        model: Post,
        required: false,
      }]
    })
      .then(data => {
        data = data[0]
        res.render('detailUser', { currentUser, data, time })
      })
  }


}

module.exports = UserController;