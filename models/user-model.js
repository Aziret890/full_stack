const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	fullName: { type: String, required: true },
	avatar: { type: String, required: false },
	phoneNumber: { type: String, required: false, unique: true },
	dateOfBirth: { type: String, required: false },
	pincode: { type: [String], required: false }
})

module.exports = model('User', UserSchema)
