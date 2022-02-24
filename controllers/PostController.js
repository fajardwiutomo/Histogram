const{Post, Tag, PostHasTag, User} = require('../models')
const posthastag = require('../models/posthastag')
const time = require('../helpers/index')

class PostController {
  static landingPage(req, res) {
    res.render('landingpage')
  }

  static register(req, res){
    res.render('Registration')
  }

  static post(req,res) {
    Post.findAll({
      include: Tag
    })
     .then(data=> {
       // res.send(data)
       res.render('post', {data})
     })
     .catch(err=> {
       res.send(err)
     })
   }

   static postDetail(req,res){
     const {id} = req.params
    let currentUser = req.session.userId
    Post.findAll({
      include : User,
      where: {
        id: +id
      }
    })
    .then(data => {
      res.render('postDetail', {data, currentUser})
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
    let error = req.query.error
    res.render('addPost', { currentUser, error })
  }
  static postAddPost(req, res) {
    let { title, content, imageURL } = req.body
    let UserId = req.session.userId
  
    Post.create({ UserId, title, content, imageURL })
      .then(_ => {
        res.redirect('/post')
      })
      .catch(err => {
        res.send(err)
      })
  }

  static editPost(req, res) {
    let {id} = req.params
    Post.findByPk(id)
    .then(data => {
      res.render('editPost', {data})
    })
    .catch(err => {
      res.send(err)
    })
  }

  static postEditPost(req, res) {
    let {id} = req.params
    let {title, content, imageURL} = req.body
    Post.update({title, content, imageURL},{
      where: {
        id: +id
      }
    })
    .then(()=> {
      res.redirect('/post')
    })
    .catch((err=> {
      res.send(err)
    }))
  }


   
}

module.exports = PostController