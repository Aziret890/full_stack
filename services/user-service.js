const ApiError = require('../exeption/api-error')
const userModel = require('../models/user-model')
const tokenService = require('./token-service')
const bcrypt = require('bcrypt')

class UserService {
	async registration(email, password, firstName, lastName) {
		const candidate = await userModel.findOne({ email })
		if (candidate) {
			throw ApiError.BadRequest(
				`Пользователь с почтовым адресом ${email} уже существует`
			)
		}
		let admin = false
		if (email === process.env.ADMIN_EMAIL && password === 'ADMIN_PASWORD') {
			const findAdmin = await userModel.findOne({ email })
			if (findAdmin.roles === 'admin') {
				admin = false
			} else {
				admin = true
			}
		}

		const hashPassword = await bcrypt.hash(password, 3)
		const user = await userModel.create({
			email,
			password: hashPassword,
			firstName,
			lastName,
			roles: admin ? 'admin' : 'user'
		})

		const tokens = tokenService.generateTokens(user)
		await tokenService.saveToken(user._id, tokens.refreshToken)

		return { ...tokens, user }
	}

	async updatePassword(newPass, prevPass, thisPassword) {
		const isMatch = await bcrypt.compare(prevPass, thisPassword)
		if (!isMatch) {
			throw ApiError.BadRequest(`Previous password is incorrect`)
		}

		const salt = await bcrypt.genSalt(10)
		const newPasswords = await bcrypt.hash(newPass, salt)
		return newPasswords
	}

	async login(email, password) {
		const user = await userModel.findOne({ email })
		if (!user) {
			throw ApiError.BadRequest('Пользователь с таким email не найден')
		}

		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) {
			throw ApiError.BadRequest('Неверный пароль')
		}

		const tokens = tokenService.generateTokens(user)
		await tokenService.saveToken(user._id, tokens.refreshToken)

		return { ...tokens, user }
	}

	async logout(refreshToken) {
		const token = await tokenService.removeToken(refreshToken)
		return token
	}

	async getAllUsers() {
		const users = await userModel.find()
		return users
	}

	async deletUser(refreshToken) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError()
		}
		const userData = tokenService.validateRefreshToken(refreshToken)
		const tokenFromDb = await tokenService.findToken(refreshToken)
		if (!userData || !tokenFromDb) {
			throw ApiError.UnauthorizedError()
		}
		const user = await userModel.findByIdAndDelete(userData.id)
		return { user }
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError()
		}
		const userData = tokenService.validateRefreshToken(refreshToken)
		const tokenFromDb = await tokenService.findToken(refreshToken)
		if (!userData || !tokenFromDb) {
			throw ApiError.UnauthorizedError()
		}
		const user = await userModel.findById(userData.id)
		const userDto = new UserDto(user)
		const tokens = tokenService.generateTokens({ ...userDto })

		await tokenService.saveToken(userDto.id, tokens.refreshToken)
		return { ...tokens, user: userDto }
	}

	async getUserById(token) {
		const userById = tokenService.validateAccessToken(token)
		return userById
	}
}

module.exports = new UserService()
