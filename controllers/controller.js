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

}

module.exports = Controller