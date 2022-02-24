const{Post, Tag, PostHasTag} = require('../models')
const posthastag = require('../models/posthastag')

class Controller {

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

}

module.exports = Controller