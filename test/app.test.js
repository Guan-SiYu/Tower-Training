const app = require('../app')
const supertest = require('supertest')
const Router = require('../router')
const request = supertest(app)

describe('完整玩一遍游戏',()=>{
	let flag  //访问/start同时把flag记录下来
	it('开始游戏',async  done=>{
		const response = await request.get('/start')
		flag = await Router.getFlag() //获取服务器生成的随机数
		expect(response.text).toBe('ok')
		done()
	})
	it('服务器回复equal结束',done=>{
		async function toFind (left,right) {
			mid = Math.floor((left+right)/2)
			const response = await request.get(`/${mid}`)
			const responseText = response.text
			if(responseText === 'equal'){
				expect(responseText).toBe('equal')
				return done()
			}else if(responseText === 'smaller' ){ //目标在左边
				toFind(mid,right)
			}else if(responseText === 'bigger'){ //目标在右边
				toFind(left,mid)
			} 
		}
		toFind(0,100)
	})
})