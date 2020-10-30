const Joi = require('joi')
const mongoose = require('mongoose')

const User = mongoose.model(
	'User',
	new mongoose.Schema({
		name: {
			type: String,
			required: true,
			minlength: 1,
			maxlength: 255,
			unique: true, // 唯一字段
		},
		password: {
			type: String,
			required: true,
			minlength: 3,
			maxlength: 255,
		},
	}),
)
function validateUser(user) {
	const schema = Joi.object({
		name: Joi.string().min(1).max(8).required(),
		password: Joi.string().min(3).max(8).required(),
	})
	return schema.validate(user)
}
exports.User = User
exports.validate = validateUser
