const express = require('express')
const routerDetailUser = express.Router()
const DetailUserController = require('../controllers/DetailUserController')

routerDetailUser.get('/:detailuserId', DetailUserController.showDetailUser)
routerDetailUser.get('/:detailuserId/add', DetailUserController.formAddDetailUser)
routerDetailUser.post('/:detailuserId/add', DetailUserController.addDetailUser)
routerDetailUser.get('/:detailuserId/edit', DetailUserController.detailUserForm)
routerDetailUser.post('/:detailuserId/edit', DetailUserController.editDetailUser)

module.exports = routerDetailUser