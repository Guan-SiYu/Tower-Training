const rp = require('request-promise')
const request = require('request')

/* --------------------- CallBack ---------------------- */

function toFind_cb(left, right, CallBack) {
	const mid = Math.floor((left + right) / 2)
	request(`http://localhost:3000/${mid}`, (error, response, body) => {
		try {
			if (response && response.statusCode === 200) {
				if (body === 'equal') {
					CallBack(mid)
				} if (body === 'smaller') {
					toFind_cb(mid, right, CallBack)
				} else if (body === 'bigger') {
					toFind_cb(left, mid, CallBack)
				}
			}
		} catch {
			return console.error('error:', error)
		}
	})
}
// play the game:
request('http://localhost:3000/start', (error, response) => {
	try {
		if ((response && response.statusCode === 200)) {
			toFind_cb(0, 101, (foundNum) => console.log(`The foundNum is ${foundNum}`))
		}
	} catch {
		console.error('error:', error)
	}
})

/* --------------------- Promise ---------------------- */

function toFind_pm(left, right) {
	const mid = Math.floor((left + right) / 2)
	return rp(`http://localhost:3000/${mid}`)
		.then((responseText) => {
			if (responseText === 'equal') {
				return mid
			} if (responseText === 'smaller') {
				return toFind_pm(mid, right)
			} if (responseText === 'bigger') {
				return toFind_pm(left, mid) // return a promiseObj
			}
		})
		.catch((err) => console.log(err))
}
// play the game:
rp('http://localhost:3000/start')
	.then(() => toFind_pm(1, 101)).then((foundNum) => console.log(`The foundNum is ${foundNum}`))

/* --------------------- Async & Await ---------------------- */

async function toFind_await(left, right) {
	const mid = Math.floor((left + right) / 2)
	const responseText = await rp(`http://localhost:3000/${mid}`)
	if (responseText === 'equal') {
		return mid // return a promiseObj(<value> = foundNum)
	} if (responseText === 'smaller') {
		return toFind_await(mid, right)
	} if (responseText === 'bigger') {
		return toFind_await(left, mid)
	}
}

// play the game:
rp('http://localhost:3000/start')
	.then(() => toFind_await(1, 101)).then((foundNum) => console.log(`The foundNum is ${foundNum}`))
