const ApiError = require('../exeption/api-error')
const userModel = require('../models/user-model')
const tokenService = require('./token-service')
const bcrypt = require('bcrypt')

class UserService {
	async registration(body) {
		const { email, password } = body
		const candidate = await userModel.findOne({ email })
		if (candidate) {
			throw ApiError.BadRequest(
				`Пользователь с почтовым адресом ${email} уже существует`
			)
		}
		let admin = false
		if (
			email === process.env.ADMIN_EMAIL &&
			password === process.env.ADMIN_PASWORD
		) {
			const findAdmin = await userModel.findOne({ email })
			if (findAdmin.roles === 'admin') {
				admin = false
			} else {
				admin = true
			}
		}

		const hashPassword = await bcrypt.hash(password, 3)
		const user = await userModel.create({
			...body,
			password: hashPassword,
			roles: admin ? 'admin' : 'user'
		})

		const tokens = tokenService.generateToken(user)

		return { token: tokens.accessToken, user }
	}

	async updatePassword(body) {
		const { newPass, prevPass, thisPassword } = body
		const isMatch = await bcrypt.compare(prevPass, thisPassword)
		if (!isMatch) {
			throw ApiError.BadRequest(`Previous password is incorrect`)
		}

		const salt = await bcrypt.genSalt(10)
		const newPasswords = await bcrypt.hash(newPass, salt)
		return newPasswords
	}

	async login(emailOrPhoneNumber, password) {
		let user
		if (this.validateEmail(emailOrPhoneNumber)) {
			user = await userModel.findOne({ email: emailOrPhoneNumber })
		} else {
			user = await userModel.findOne({ phoneNumber: emailOrPhoneNumber })
		}

		if (!user) {
			throw ApiError.BadRequest(
				'Пользователь с таким email или номером телефона не найден'
			)
		}

		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) {
			throw ApiError.BadRequest('Неверный пароль')
		}

		const tokens = tokenService.generateToken(user)

		return { token: tokens.accessToken, user }
	}

	validateEmail(email) {
		return /\S+@\S+\.\S+/.test(email)
	}

	async getAllUsers() {
		const users = await userModel.find()
		return users
	}

	async deletUser(token) {
		if (!token) {
			throw ApiError.UnauthorizedError()
		}
		const userData = tokenService.validateToken(token)
		if (!userData) {
			throw ApiError.UnauthorizedError()
		}
		const user = await userModel.findByIdAndDelete(userData.id)
		return { user }
	}

	async getUserById(token) {
		const userById = tokenService.validateToken(token)
		return userById
	}
}

module.exports = new UserService()
