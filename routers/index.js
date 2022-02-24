const express = require('express')
const router = express.Router()
const routerDetailUser = require('../routers/detailuser')
const routerPost = require('../routers/post')

router.use('/detailuser', routerDetailUser)
router.use('/post', routerPost)

module.exports = router