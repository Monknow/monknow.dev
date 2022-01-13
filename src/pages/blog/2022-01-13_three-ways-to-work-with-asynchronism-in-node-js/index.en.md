---
tipo: blog
slug: Three ways to work with asynchronism in Node.js
fecha: 2022-01-13T00:00:36.661Z
titulo: Three ways to work with asynchronism in Node.js
subtitulo: Callbacks, Promises, async/await with examples
portada: 2fac496.jpg
descripcionImagen: uwu
descripcion: "Async JS: Three ways to work with asynchronism in Node.js and
  JavaScript. Using callbacks, ES6 Promises and E6+ async/await with examples"
---
## Introduction

Even though we can do several tasks on a computer simultaneously, on its insides, a single-core computer can only execute one program, blocking other programs' execution. So to achieve multitasking, a computer must run a program when necessary and pause it to make space for another program on a loop, which is so fast that it creates the illusion of simultaneity.

Like many other programming languages, JavaScript was born as a synchronous language used for user interaction. However, to respond asynchronously to a user's click, scrolls, and taps events, JavaScript uses specific browser APIs that allow it to declare a function, keep it on memory (on a queue) and trigger it when the event occurs. 

In the same way, the Node.js environment allows JavaScript to run in a non-blocking way, which makes it feel like it is an asynchronous language. To do this, JavaScript gives the developer three main options to manipulate asynchronism, i.e., to declare code and execute when needed: callbacks, promises, and async/await.  



## Callbacks

```javascript
console.log("First log");

setTimeout(() => {
	console.log("Third asynchronous log");
}, 2000);

console.log("Second log");

```

## Promises

```javascript
import fetch from "node-fetch";

const response = fetch("https://randomuser.me/ap");

response
	.then((res) => {
		return res.json();
	})
	.then((data) => {
		console.log(data);
	})
	.catch((err) => {
		console.log(err);
	});

```

## async/await

```javascript
import fetch from "node-fetch";

const getUser = async () => {
	try {
		const response = await fetch("https://randomuser.me/api/");
		const data = await response.json();
		console.log(data);
	} catch (err) {
		console.log(err);
	}
};

getUser();
```



## Making non-promise based functions asynchronous

### To Promise

```javascript
console.log("First log");

const myPromise = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve("Third asynchronous log");
	}, 2000);
});

myPromise.then((log) => {
	console.log(log);
});

console.log("Second log");

```

### To async/await

```javascript
const myPromise = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve("Second synchronous log");
	}, 2000);
});

const getLogs = async (promise) => {
	console.log("First log");

	await promise.then((log) => {
		console.log(log);
	});

	console.log("Thid log");
};

getLogs(myPromise);

```

## Conclusion