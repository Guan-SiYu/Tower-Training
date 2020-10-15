const expressFunc = require("express")
const app = expressFunc()
const Router = require('./router')
app.use('/', Router.router)
module.exports = app
app.listen(3000, () => console.log('正在监听3000端口'))