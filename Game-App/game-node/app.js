// 依赖库
const express = require('express')

const app = express()
const mongoose = require('mongoose')
const session = require('express-session')

// 模块引入
const game = require('./routes/game')
const register = require('./routes/register')
const login = require('./routes/login')

// 连数据库
mongoose.connect(
	'mongodb://localhost:27017/game',
	{ useNewUrlParser: true, useUnifiedTopology: true },
	// () => console.log("已连接数据库")
)

// 中间件
app.use(express.json()) // 如果请求体是json类型 就设置好req.body
// 设置跨域请求
app.all('*', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
	res.header('Access-Control-Allow-Credentials', true)
	res.header(
		'Access-Control-Allow-Headers',
		'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild',
	)
	res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
	res.header('X-Powered-By', ' 3.2.1')
	res.header('Content-Type', 'application/json;charset=utf-8')
	next()
})

app.use(
	session({
		secret: 'keyboard cat',
		cookie: { maxAge: 60000 },
	}),
)
// 路由
app.use('/login', login)
app.use('/start', game)
app.use('/register', register)
const server = app.listen(5000, () => console.log('node:正在监听5000端口'))
module.exports = server
