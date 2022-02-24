const{Post, Tag, PostHasTag} = require('../models')
const posthastag = require('../models/posthastag')
const time = require('../helpers')
const { Op } = require('sequelize')

class PostController {

  static landingPage(req, res) {
    res.render('landingpage')
  }

  static register(req, res){
    res.render('Registration')
  }

  static post(req,res) {
   Post.findAll({
      include: [
        {
          model: Tag
        }
      ]
    })
    .then(data=> {
      res.render('post', {data})
    })
    .catch(err=> {
      console.log(err)
      res.send(err)
    })
  }
  static likePost(req, res) {
    let { postId } = req.params
    Post.increment('like', { where: { id: postId }, by: 1 })
      .then(() => {
        res.redirect(`/post/${postId}`)
      })
      .catch(err => {
        res.send(err)
      })
  }
}

module.exports = PostController