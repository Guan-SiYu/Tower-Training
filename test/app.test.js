const app = require('../app')
const supertest = require('supertest')
const request = supertest(app)


it('应返回ok',async done=>{
	const response = await request.get('/start')
	.send('ok')
	expect(response.status).toBe(200)
	done()
})

describe('判断大小',()=>{
	it('返回smaller',async done=>{
		const response = await request.get('/14')
		.send('smaller')
		expect(response.status).toBe(200)
		done()
	})
	it('返回bigger',async done=>{
		const response = await request.get('/16')
		.send('bigger')
		expect(response.status).toBe(200)
		done()
	})
	it('返回equal',async done=>{
		const response = await request.get('/15')
		.send('equal')
		expect(response.status).toBe(200)
		done()
	})
})