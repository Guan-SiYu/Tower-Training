/* eslint-disable consistent-return */
const rp = require('request-promise')
const request = require('request')

/* --------------------- CallBack ---------------------- */

function toFind(left, right, callBack) {
	const mid = Math.floor((left + right) / 2)
	request(`http://localhost:3000/${mid}`, (error, response, body) => {
		if (error) callBack(error)
		if (response && response.statusCode === 200) {
			if (body === 'smaller') return toFind(mid, right, callBack)
			if (body === 'bigger') return toFind(left, mid, callBack)
			callBack(null, mid) // body === 'equal'
		}
	})
}

/* --------------------- Promise ---------------------- */

function toFind_pm(left, right) {
	const mid = Math.floor((left + right) / 2)
	return rp(`http://localhost:3000/${mid}`)
		.then((responseText) => {
			if (responseText === 'smaller') return toFind_pm(mid, right)
			if (responseText === 'bigger') return toFind_pm(left, mid) // return a promiseObj
			return mid // responseText === 'equal'
		})
}

/* --------------------- Async & Await ---------------------- */

async function toFind_await(left, right) {
	const mid = Math.floor((left + right) / 2)
	const responseText = await rp(`http://localhost:3000/${mid}`)
	if (responseText === 'smaller') return toFind_await(mid, right)
	if (responseText === 'bigger') return toFind_await(left, mid) // return a promiseObj
	return mid // responseText === 'equal'=> return a promiseObj(<value> = foundNum)
}

// test:
async function main(left, right) {
	try {
		// promise
		await rp('http://localhost:3000/start')
		const numPm = await toFind_pm(left, right)
		console.log(`Promise:The foundNum is ${numPm}`)
		// async & await
		await rp('http://localhost:3000/start')
		const numAwait = await toFind_await(left, right)
		console.log(`AsyncAwait:The foundNum is ${numAwait}`)
		// callback
		request('http://localhost:3000/start', (err, response) => {
			if ((response && response.statusCode === 200)) {
				toFind(left, right, (error, foundNum) => console.log(error || `CallBack:The foundNum is ${foundNum}`))
			}
		})
	} catch (err) {
		console.log(err)
	}
}
main(1, 101)
