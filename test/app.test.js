const app = require('../app')
const supertest = require('supertest')
const Router = require('../router')
const request = supertest(app)

describe('判断大小',()=>{
	let flag = Router.flag //访问/start同时把flag记录下来
	it('应返回ok',async  done=>{
		const response = await request.get('/start')
		expect(response.text).toBe('ok')
		done()
	})
	it('返回smaller',async done=>{
		const response = await (await request.get(`/${flag.randomNumber-1}`))
		expect(response.text).toBe('smaller')
		done()
	})
	it('返回bigger',async done=>{
		const response = await request.get(`/${flag.randomNumber+1}`)
		expect(response.text).toBe('bigger')
		done()
	})
	it('返回equal',async done=>{
		const response = await request.get(`/${flag.randomNumber}`)
		expect(response.text).toBe('equal')
		done()
	})
})