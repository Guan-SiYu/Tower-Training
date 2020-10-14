const express = require('express')
const router = express.Router()

let flag = 0
router.get('/start', function (req, res) {
    flag = Math.floor(Math.random() * 100 + 1)
	// console.log(`生成的随机数为 : ${flag}`)
	res.send('ok')
})
router.get('/:number', function (req, res) {
	const num = req.params.number;
	if(num==flag)res.send('equal')
	console.log(res.body)
    res.send(
        num > flag ? 'bigger' : 'smaller'
    )
})
module.exports = router