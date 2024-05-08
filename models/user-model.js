const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	fullName: { type: String, required: true },
	avatar: { type: String, required: false },
	phoneNumber: { type: Number, required: false, unique: true },
	dateOfBirth: { type: String, required: false },
	roles: { type: String, required: true, enum: ['user', 'admin'] },
	peencode: { type: Number, required: false }
})

module.exports = model('User', UserSchema)
