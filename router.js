const express = require('express')
const router = express.Router()

let flag ;
router.get('/start', function (req, res) {
    flag = Math.floor(Math.random() * 100 + 1)
	res.send('ok')
})
router.get('/:number', function (req, res) {
	const num = Number(req.params.number)
	if(num === flag) return res.send('equal')
    res.send( num > flag ? 'bigger' : 'smaller')
})
module.exports = {
	router,
	getFlag:()=>{
		return new Promise((resolve,reject)=>{
			resolve(flag)
		})
	}
}