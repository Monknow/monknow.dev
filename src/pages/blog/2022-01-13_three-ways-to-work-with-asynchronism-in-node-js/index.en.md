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

A callback is a function passed as an argument inside another function to execute it there. One of its principal uses is to run code after an asynchronous operation finish. These types of callbacks are called asynchronous callbacks. They are helpful to schedule a function to run after an event or some time while it doesn't block JavaScript's single thread, allowing other functions to run.  

```javascript
console.log("First log");

setTimeout(() => {
	console.log("Third asynchronous log");
}, 2000);

console.log("Second log");
```

The previous code outputs the following logs:

```shell
First log
Second log
Third asynchronous log
```

## Promises

Even though callbacks are very useful, if we want to run several callbacks in order, we would have to nest a callback inside a callback and so on, making your code messy and less readable in what's known as *callback hell*. The following is an example of nesting callbacks on four levels.

```javascript
setTimeout(() => {
	console.log("First asynchronous log");
	setTimeout(() => {
		console.log("Second asynchronous log");
		setTimeout(() => {
			console.log("Third asynchronous log");
			setTimeout(() => {
				console.log("Fourth asynchronous log");
			}, 2000);
		}, 2000);
	}, 2000);
}, 2000);

```

\
Even though callbacks are very useful, if we want to run several callbacks in order, we would have to nest a callback inside a callback and so on, making your code messy and less readable in what's known as *callback hell*. The following is an example of nesting callbacks on four levels.

Messy, right? That's why ES6 brought a new way to work with asynchronous operations: promises. A promise is an object that represents the fulfillment or rejection of an asynchronous operation. And to the promise object, we can attach a callback instead of passing callbacks into a function. The way we do this is by using the [`.then`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) and [`.catch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) methods. `.then` allows attaching a callback for the fulfillment of an operation, while `.catch` does the same but for the rejection. 

If we wanted to execute several asynchronous operations with callbacks in order, we would have to nest them (creating *callback hell*). But with promises, we can make .then return another promise, to which we can attach another .then and chain them together. Let's see that by fetching data from the [random user API](https://randomuser.me/api).

In Node.js, we would have to use the [HTTP module](https://nodejs.dev/learn/the-nodejs-http-module) to make an API call. Although, it is a low-level module and is not very developer-friendly. Therefore, we will be using [node-fetch](https://www.npmjs.com/package/node-fetch), which emulates the [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) browser function, and returns a promise.

```shell
npm install node-fetch@2
```

Note: it is necessary to install node-fetch v2 since v3 is an ESM-only module, so you can't import it with `require()`. Although, in recent versions of Node.js, you can use ESM modules by changing the .js extension to .mjs.

```javascript
const fetch = require("node-fetch");
const responsePromise = fetch("https://randomuser.me/api");

const jsonPromise = responsePromise.then((response) => {
	return response.json();
});

const dataPromise = jsonPromise.then((data) => {
	console.log(data);
});

dataPromise.catch((err) => {
	console.log(err);
});

```



Let's break down what's happening here: we import node-fetch and make an API call to the random user data endpoint. The fetch function returns the `responsePromise` promise, which can be fulfilled and return a response. To handle the response, we attach `.then` to call `response.json()` to parse the response to JSON format. `response.json()` returns a promise as well, to which we can attach another `.then` to handle its fullfilment by logging the received data. All the promises can return an error, and to handle them we can use an only `.catch` since if there is an error,  Node.js will look down the chain for `.catch()` handlers. Chaining several `then` and `catch` methods can be illustrated better if we write them like this: 

```javascript
const fetch = require("node-fetch");
const responsePromise = fetch("https://randomuser.me/api");

responsePromise
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