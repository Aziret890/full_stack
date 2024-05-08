const jwt = require('jsonwebtoken')

class TokenService {
	generateToken(payload) {
		const accessToken = jwt.sign(
			{
				fullName: payload.fullName,
				email: payload.email,
				id: payload._id
			},
			process.env.JWT_SECRET,
			{
				expiresIn: '30d'
			}
		)
		return {
			accessToken
		}
	}

	validateToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_SECRET)
			return userData
		} catch (e) {
			return null
		}
	}
}

module.exports = new TokenService()
