const { User, validate } = require('../models/user')
const mongoose = require('mongoose')
const express = require('express')

const router = express.Router()
// const _ = require('lodash')
const bcrypt = require('bcrypt')

// 注册新用户：
router.post('/', async (req, res) => {
	// 用Joi验证请求体 如果请求中的name等属性不合法就会返回400状态码
	const { error } = validate(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	// 查询数据库看用户是否已经注册过了
	let user = await User.findOne({ name: req.body.name })
	if (user) return res.status(400).send('用户已经注册') // 如果数据库中查到这个用户了，向客户端返回非法请求状态

	/// 如果数据库中没查到，创建新的给user对象赋值
	user = new User({
		name: req.body.name,
		password: req.body.password,
	})
	// 存入数据库之前用bcrypt哈希密码
	const salt = await bcrypt.genSalt(10)
	user.password = await bcrypt.hash(user.password, salt)
	// 将user对象保存到数据库
	await user.save(user)
	// 返回客户端结果
	res.send(user.name)
})

module.exports = router
