const rp = require('request-promise').defaults({ jar: true })
const { User } = require('../models/user')

const { expect } = global

let server = require('../app')

const postOption = (name, password, uri) => ({
	method: 'POST',
	uri: `http://localhost:5000/${uri}`,
	body: { name, password },
	headers: { 'content-Type': 'application/json' },
	json: true,
})

describe('注册->登录->游戏', () => {
	afterAll(async () => {
		await User.remove()
		await server.close()
	})
	describe('api:/register', () => {
		it('should save the new user', async () => {
			const options = postOption('foo', '123', 'register')
			await rp(options)
			const newUser = await User.findOne({ name: 'foo' })
			expect(newUser).not.toBeNull()
		})
	})
	describe('api:/login', () => {
		it('没注册', async () => {
			const options = postOption('zxf', '323', 'login')
			const res = await rp(options)
			expect(res).toBe('没找到给定user的用户，你还没有注册')
		})
		it('密码错误', async () => {
			const options = postOption('foo', '345', 'login')
			const res = await rp(options)
			expect(res).toBe('用户密码不匹配 请重新输入密码')
		})
		it('未登录不能玩', async () => {
			const options = {
				method: 'GET',
				uri: 'http://localhost:5000/start',
				json: true,
			}
			const res = await rp(options)
			expect(res).toBe('未登录不能玩')
		})
		it('登陆成功', async () => {
			const options = postOption('foo', '123', 'login')
			const res = await rp(options)
			expect(res).toBe('foo')
		})
	})
	describe('api:/start', () => {
		it('登录成功产生随机数', async () => {
			const options = {
				method: 'GET',
				uri: 'http://localhost:5000/start',
				json: true,
			}
			const res = await rp(options)
			expect(res).toBe('OK')
		})
	})
	describe('api:start/play', () => {
		it('服务器回复equal结束', async (done) => {
			async function play(left, right) {
				const mid = Math.floor((left + right) / 2)
				const responseText = await rp({
					method: 'POST',
					uri: 'http://localhost:5000/start/play',
					body: { userInput: String(mid) },
					json: true,
				})
				if (responseText === 'smaller') await play(mid, right)
				if (responseText === 'bigger') await play(left, mid)
				if (responseText === 'equal') {
					expect(responseText).toBe('equal')
					done()
				}
			}
			play(1, 101)
		})
	})
})
