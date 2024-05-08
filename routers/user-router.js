const Router = require('express').Router
const userController = require('../controllers/user-controller')
const router = Router()
const { body } = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware')

router.post(
	'/registration',
	body('email').isEmail(),
	body('password').isLength({ min: 3, max: 32 }),
	body('firstName').isLength({ min: 3, max: 32 }),
	userController.registration
)
router.get('/refresh', userController.refresh)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/users/getAll', userController.getUsers)
router.get('/user/get', authMiddleware, userController.getUser)
router.delete('/user/delete', authMiddleware, userController.deleteUser)

module.exports = router
