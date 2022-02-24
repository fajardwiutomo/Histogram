const{Post, Tag, User} = require('../models')
const posthastag = require('../models/posthastag')
const time = require('../helpers/index')
const {Op} = require('express')

class PostController {
  static landingPage(req, res) {
    let currentUser = req.session.userId
    res.render('landingpage', { currentUser })
  }

  static post(req,res) {
    let { search } = req.query
    // let obj = {
    //   include: [{
    //     model: User
    //   }],
    //   order: [['createdAt', 'DESC']]
    // }
    let obj = {}
    if (search) {
      obj = {
        where: {
          title: {
            [Op.ilike]: `${search}`
          }
        }
      }
      // obj.where = {}
      // obj.where.title = { [Op.iLike]: `%${search}%` }
    }
    Post.findAll(obj, {
      include: Tag
    })
     .then(data=> {
      let currentUser = req.session.userId
      let role = req.session.role
       // res.send(data)
       res.render('post', {data, currentUser, role, time })
     })
     .catch(err=> {
       res.send(err)
     })
   }

   static postDetail(req,res){
    //  const {id} = req.params
    // let currentUser = req.session.userId
    // console.log(currentUser)
    // console.log(id)
    let { postId } = req.params
    let currentUser = req.session.userId
    let { error } = req.query
    let role = req.session.role
    Post.findAll({
      where: { id: postId },
      include: [{
        model: User,
        attributes: ["userName", "id"],
        required: false,
      }]
    })
    .then(data => {
      
      res.render('postDetail', { currentUser, data, time, error, role })
    })
    .catch(err => {
      res.send(err)
    })
   }

   static likePost(req, res) {
    let { postId } = req.params
    Post.increment('like', { where: { id: postId }, by: 1 })
      .then(() => {
        res.redirect(`/post/detail/${postId}`)
      })
      .catch(err => {
        res.send(err)
      })
  }

  static Delete(req, res) {
    const {postId} = req.params
    Post.destroy({
      where: {
        id: +postId
      }
    })
    .then(() => {
      res.redirect(`/post`)
    })
    .catch(err => {
      res.send(err)
    })
  }

  static addPost(req, res) {
    let currentUser = req.session.userId
    let errors = req.query.error
    res.render('addPost', { currentUser, errors })
  }
  static postAddPost(req, res) {
    let { title, content, imageURL } = req.body
    let UserId = req.session.userId
    let image = ''
    if (req.file) {
      image = req.file.path
      image = image.replace('/upload', '/upload/w_300')
    }
    Post.create({ UserId, title, content, imageURL })
      .then(_ => {
        res.redirect('/post')
      })
      .catch(err => {
        if(err.name === 'SequelizeValidationError') {
          const errors = err.errors.map((el) => el.message)
          res.redirect(`/post/add?error=${errors}`)
        } else {
          res.send(err)
        }
      })
  }

  static editPost(req, res) {
    let errors = req.query.error
    let {postId} = req.params
    Post.findByPk(postId)
    .then(data => {
      res.render('editPost', {data, errors})
    })
    .catch(err => {
      res.send(err)
    })
  }

  static postEditPost(req, res) {
    let {postId} = req.params
    let {title, content, imageURL} = req.body
    Post.update({title, content, imageURL},{
      where: {
        id: +postId
      }
    })
    .then(()=> {
      res.redirect(`/post/detail/${postId}`)
    })
    .catch((err=> {
      if(err.name === 'SequelizeValidationError') {
        const errors = err.errors.map((el) => el.message)
        res.redirect(`/post/detail/${postId}/edit?error=${errors}`)
      } else {
        res.send(err)
      }
    }))
  }


   
}

module.exports = PostController