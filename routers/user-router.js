const Router = require('express').Router
const userController = require('../controllers/user-controller')
const router = Router()
const { body } = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/users/getAll', userController.getUsers)
router.get('/user/get', authMiddleware, userController.getUser)
router.delete('/user/delete', authMiddleware, userController.deleteUser)

module.exports = router
