const Joi = require('joi')
const mongoose = require('mongoose')

const Number = mongoose.model('Number', new mongoose.Schema({
	userId: {
		type: String,
		required: true,
		unique: true, // 唯一字段
	},
	number: {
		type: String,
		required: true,
	},
}))
function validateNumber(user) {
	const schema = Joi.object({
		userId: Joi.string().required(),
		number: Joi.number().required(),
	})
	return schema.validate(user)
}
exports.Number = Number
exports.validate = validateNumber
