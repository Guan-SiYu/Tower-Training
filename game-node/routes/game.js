const express = require('express')

const router = express.Router()
const { Number, validate } = require('../models/number')

router.get('/', async (req, res) => {
	// 拦截未登录用户
	if (!req.session.userId) return res.send('未登录不能玩')
	// 生成一个随机数存到Number表
	const obj = {
		number: Math.floor(Math.random() * 100 + 1),
		userId: req.session.userId,
	}
	const { error } = validate(obj) // 用Joi验证请求体
	if (error) return res.status(400).send(error.details[0].message)

	// 查询数据库Number表
	let number = await Number.findOne({ userId: obj.userId })

	if (number) number.set({ number: obj.number }) // 如果数据库中查到这个用户了，更新start的值
	if (!number) number = new Number(obj) // 如果数据库中没查到，重新给number赋值
	await number.save(obj)
	res.send('OK')
})
router.post('/play', async (req, res) => {
	// 拦截未登录用户
	if (!req.session.userId) return res.send('未登录不能玩')
	// 查询数据库Number表
	const number = await Number.findOne({ userId: req.session.userId })
	if (!number) return res.status(300).send('数据库中找不到此用户的number')
	const R = number.number
	const userIpt = req.body.userInput
	const responseStr = userIpt === R ? 'equal' : userIpt > R ? 'bigger' : 'smaller'
	res.send(responseStr)
})
module.exports = router
