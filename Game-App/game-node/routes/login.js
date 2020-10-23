const { User } = require('../models/user')
const mongoose = require('mongoose')
const express = require('express')

const router = express.Router()
const bcrypt = require('bcrypt')
const session = require('express-session')
const Joi = require('joi')
const ses = require('../app')

function validate(req) {
	const schema = Joi.object({
		name: Joi.string().min(1).max(255).required(),
		password: Joi.string().min(3).max(255).required(),
	})
	return schema.validate(req)
}

// login
router.post('/', async (req, res) => {
	// 用joi验证请求内容 如果请求中的name等属性不合法就会返回400状态码
	const { error } = validate(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	// 在数据库中找这个用户
	const user = await User.findOne({ name: req.body.name })
	if (!user) return res.send('没找到给定user的用户，你还没有注册')

	// 用bcrypt验证密码是否匹配：明文密码在req.body.password中 哈希密码是存在数据库中user.password
	const validPassword = await bcrypt.compare(
		req.body.password,
		user.password,
	)
	if (!validPassword) return res.send('用户密码不匹配 请重新输入密码')

	// 在session中保存用户信息
	req.session.userId = user._id
	// await req.session.save();
	console.log(req.session)

	// 客户端显示
	res.send(req.body.name)
})

module.exports = router
