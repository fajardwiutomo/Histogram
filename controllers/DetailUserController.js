const { User, DetailUser, Post } = require('../models')
const time = require('../helpers')

class DetailUserController {
  static detailUserForm (req, res) {
    let currentUser = req.session.userId
    let error = req.query.error
    DetailUser.findAll({
      where: { UserId: currentUser }
    })
      .then(data => {
        data = data[0]
        res.render('formDetailUser', { data, currentUser, error })
      })
      .catch(err => res.send(err))
  }

  static formAddDetailUser(req, res){
    res.render('formDetailUser')
  }

  static addDetailUser(req, res) {
    let currentUser = req.session.userId
    let { firstName, lastName, dateOfBirth, gender} = req.body
    DetailUser.create ({ firstName, lastName, dateOfBirth, gender }, {
      where: { UserId: currentUser }
    })
      .then(data => {
        res.redirect(`/detailuser/${currentUser}`)
      })
      .catch(err => {
        if (err.name === 'SequelizeValidationError') {
          err = err.errors.map(el => el.message)
          res.redirect(`/detailuser/${currentUser}/form?error=${err}`)
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
  static editDetailUser(req, res) {
    let currentUser = req.session.userId
    let { firstName, lastName, dateOfBirth, gender, address, phoneNumber } = req.body
    DetailUser.update({ firstName, lastName, dateOfBirth, gender, address, phoneNumber }, {
      where: { UserId: currentUser }
    })
      .then(data => {
        res.redirect(`/detailuser/${currentUser}`)
      })
      .catch(err => res.send(err))
  }
}

module.exports = DetailUserController