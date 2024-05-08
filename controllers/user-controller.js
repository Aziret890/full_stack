const { validationResult } = require('express-validator')
const userModel = require('../models/user-model')
const userService = require('../services/user-service')
const ApiError = require('../exeption/api-error')
class UserController {
	async registration(req, res, next) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
			}
			const { email, password, fullName } = req.body
			const userData = await userService.registration(email, password, fullName)

			return res.json(userData)
		} catch (e) {
			next(e)
		}
	}

	async login(req, res, next) {
		try {
			const { email, phoneNumber, password } = req.body
			const userData = await userService.login(email, phoneNumber, password)
			return res.json(userData)
		} catch (e) {
			next(e)
		}
	}

	async deleteUser(req, res, next) {
		try {
			const authorizationHeader = req.headers.authorization
			const token = authorizationHeader.split(' ')[1]
			const data = await userService.deletUser(token)
			return res.json(data)
		} catch (e) {
			next(e)
		}
	}

	async getUsers(req, res, next) {
		try {
			const users = await userService.getAllUsers()
			return res.json({ users })
		} catch (e) {
			next(e)
		}
	}

	async getUser(req, res, next) {
		const authorizationHeader = req.headers.authorization
		const tokens = authorizationHeader.split(' ')[1]

		try {
			const { id } = await userService.getUserById(tokens)
			const user = await userModel.findById(id).select('-password')
			if (!user) {
				return ApiError.BadRequest('Ползователь не существует')
			}

			return res.json({ user })
		} catch (e) {
			next(e)
		}
	}
	async updateUser(req, res, next) {
		const authorizationHeader = req.headers.authorization
		const token = authorizationHeader.split(' ')[1]

		try {
			const { id } = await userService.getUserById(token)
			const updatedUserData = req.body 
			const updatedUser = await userModel
				.findByIdAndUpdate(id, updatedUserData, { new: true })
				.select('-password')
			if (!updatedUser) {
				return next(ApiError.BadRequest('Пользователь не существует'))
			}

			return res.json({ user: updatedUser })
		} catch (e) {
			next(e)
		}
	}
}

module.exports = new UserController()
