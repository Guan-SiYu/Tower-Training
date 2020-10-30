export default function xhrAjax (page,method,responseTip){
	new Promise((resolve,reject)=>{
		const url= `http://localhost:5000${page}`
		const xhr = new XMLHttpRequest()
		xhr.withCredentials = true;
		xhr.open(method,url)
		xhr.setRequestHeader("Content-type", "application/json")
		xhr.onreadystatechange = () => {
			if (xhr.readyState !== 4) return;
			xhr.readyState === 4 && xhr.status === 200
				? resolve(xhr.responseText)
				: reject(xhr.responseText);
		}
		xhr.send(JSON.stringify(this.state.data));
	})
	.then((resSend) =>this.setState({ response: resSend }))
    .catch((ex) => this.setState({ response: ex }));
} 