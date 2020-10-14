const expressFunc = require("express")
const app = expressFunc()
const router = require('./router')
app.use('/', router)
module.exports = app
app.listen(3000, () => console.log('正在监听3000端口'))