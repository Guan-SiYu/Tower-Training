const app = require('../app')
const supertest = require('supertest')
const request = supertest(app)

describe('判断大小',()=>{
	let flag; 
	it('应返回ok',async done=>{
		const response = await request.get('/start')
		flag = response.body.flag //访问/start同时把flag记录下来
		expect(response.body.message).toBe('ok')
		done()
	})
	it('返回smaller',async done=>{
		const response = await (await request.get(`/${flag-1}`))
		expect(response.body.message).toBe('smaller')
		done()
	})
	it('返回bigger',async done=>{
		const response = await request.get(`/${flag+1}`)
		expect(response.body.message).toBe('bigger')
		done()
	})
	it('返回equal',async done=>{
		const response = await request.get(`/${flag}`)
		expect(response.body.message).toBe('equal')
		done()
	})
})