const supertest = require('supertest')
const app = require('../app')
const Router = require('../router')

const { expect } = global
const request = supertest(app)

describe('完整玩一遍游戏', () => {
	let flag // 访问/start同时把flag记录下来
	/* ----- 第一题 ---- */
	it('开始游戏应返回ok', async (done) => {
		const response = await request.get('/start')
		flag = await Router.getFlag() // 获取服务器生成的随机数
		expect(response.text).toBe('ok')
		done()
	})

	/* ----- 第二题 ---- */
	it('返回smaller', async () => {
		const response = await (await request.get(`/${flag - 1}`))
		expect(response.text).toBe('smaller')
	})
	it('返回bigger', async () => {
		const response = await request.get(`/${flag + 1}`)
		expect(response.text).toBe('bigger')
	})
	it('返回equal', async () => {
		const response = await request.get(`/${flag}`)
		expect(response.text).toBe('equal')
	})

	/* ----- 第三题 ---- */
	it('服务器回复equal结束', (done) => {
		async function toFind(left, right) {
			const mid = Math.floor((left + right) / 2)
			const response = await request.get(`/${mid}`)
			const responseText = response.text
			if (responseText === 'equal') {
				expect(responseText).toBe('equal')
				done()
			} else if (responseText === 'smaller') { // 目标在左边
				await toFind(mid, right)
			} else if (responseText === 'bigger') { // 目标在右边
				await toFind(left, mid)
			}
		}
		toFind(0, 101)
	})
})
