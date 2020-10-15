const express = require('express')
const router = express.Router()

let flag = {randomNumber:0}
router.get('/start', function (req, res) {
    flag.randomNumber = Math.floor(Math.random() * 100 + 1)
	res.send('ok')
})
router.get('/:number', function (req, res) {
	const num = Number(req.params.number)
	if(num === flag.randomNumber) return res.send('equal')
    res.send( num > flag.randomNumber ? 'bigger' : 'smaller')
})
module.exports = {router,flag}