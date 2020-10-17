const rp = require('request-promise')
const request = require('request')

/* --------------------- CallBack ---------------------- */
// start
request(`http://localhost:3000/start`,(error, response, body)=> {
	try{
		if((response && response.statusCode === 200))console.log(`Promise方法开始游戏 *${body}`)
	}catch {
		return console.error('error:', error)
	}
  })
// play:
function toFind_cb(left,right) {
	const mid = Math.floor((left + right) / 2)
	request(`http://localhost:3000/${mid}`, (error, response, body)=> {
	try{
		if(response && response.statusCode === 200){
			console.log('body:', body)
			if (body === 'equal') {
				return console.log(`猜中数字${mid}`)
			} else if (body === 'smaller') { 
				toFind_cb(mid, right)
			} else if(body === 'bigger') { 
				toFind_cb(left, mid)
			}
		}
	}catch{
		return console.error('error:', error)
	}
  })
}
// 调用:
// toFind_cb(0,100)

/* --------------------- Promise ---------------------- */
// start:
rp(`http://localhost:3000/start`)
.then(responseText=>console.log(`Promise方法开始游戏 *${responseText}`))
// Play:
function toFind_pm(left, right) {
	const mid = Math.floor((left + right) / 2)
	rp(`http://localhost:3000/${mid}`)
    	.then((responseText)=>{
			console.log('mid = '+ mid)
			console.log(responseText)
			if (responseText === 'equal') {
				return console.log(`猜中数字${mid}`)
			} else if (responseText === 'smaller') { 
				toFind_pm(mid, right)
			} else if(responseText === 'bigger') { 
			}
		})
    	.catch((err)=>console.log(err))
}
// 调用:
// toFind_pm(1,100)

/* --------------------- Async & Await ---------------------- */
// start:
rp(`http://localhost:3000/start`)
.then(responseText=>console.log(`Async & Await方法开始游戏 *${responseText}`))

async function toFind_await(left, right) {
	const mid = Math.floor((left + right) / 2)
	const responseText = await rp(`http://localhost:3000/${mid}`)
	console.log('mid = '+ mid)
	if (responseText === 'equal') {
		return console.log(`猜中数字${mid}`)
	} else if (responseText === 'smaller') { 
		await toFind_await(mid, right)
	} else if (responseText === 'bigger') { 
		await toFind_await(left, mid)
	}
}
//调用：
toFind_await(1,101)

