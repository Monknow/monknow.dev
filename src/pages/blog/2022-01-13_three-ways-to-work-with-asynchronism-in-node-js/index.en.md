---
tipo: blog
slug: Three ways to work with asynchronism in Node.js
fecha: 2022-01-13T00:00:36.661Z
titulo: Three ways to work with asynchronism in Node.js
subtitulo: Callbacks, Promises, async/await
portada: 2fac496.jpg
descripcionImagen: uwu
descripcion: "Async JS: Three ways to work with asynchronism in Node.js and
  JavaScript. Using callbacks, ES6 Promises and E6+ async/await with examples"
---
# Introduction

Even though we can do several tasks on a computer simultaneously, on its insides, a single-core computer can only execute one operation, blocking other operations' execution. So to achieve multitasking, a computer must run a program when necessary and pause it to make space for another program on a constant loop, which is so fast that it creates the illusion of simultaneity.

Like many other programming languages, JavaScript was born as a synchronous language used for user interaction. However, to respond asynchronously to a user's clicks, scrolls, or taps events, JavaScript uses specific browser APIs that allow it to declare a function, keep it on memory (on a queue) and trigger it when the event occurs. 

In the same way, the Node.js environment allows JavaScript to run in a non-blocking way, which makes it feel like it is an asynchronous language. To do this, JavaScript gives the developer three main options to manipulate asynchronism, i.e., to declare code and execute when needed: callbacks, promises, and async/await.  

# Callbacks

A callback is a function passed as an argument inside another function to execute it there. One of its principal uses is to run code after an asynchronous operation finishes. These types of callbacks are called asynchronous callbacks. They are helpful to schedule a function to run after an event or some time, while non-blocking JavaScript's single execution thread, allowing other functions to run.  The following is an example of a callback, that will be called after 2000ms:

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

As you can see, even though the *Third asynchronous log* is declared before the *Second log*, the third log will wait 2000ms to execute, but during that time it will not block the thread, allowing the second log to run.

# Promises

Even though callbacks are very useful, if we want to run several asynchronous operations in order, i.e., to emulate synchronism, we would have to nest a callback inside a callback and so on, making your code messy and less readable in what's known as *callback hell*. The following is an example of nesting callbacks on four levels:

```javascript
setTimeout(() => {
	console.log("First log");
	setTimeout(() => {
		console.log("Second log");
		setTimeout(() => {
			console.log("Third log");
			setTimeout(() => {
				console.log("Fourth log");
			}, 2000);
		}, 2000);
	}, 2000);
}, 2000);
```

Messy, right? That's why ES6 brought a new way to work with asynchronous operations: promises. A promise is an object that represents the eventual fulfillment or rejection (commonly due to an error) of an asynchronous operation. Besides being fulfilled or rejected, a promise can have a third state: pending; when it still hasn't acquired one of the other two states.

The beauty of promises is that we can attach a callback to the promise object instead of passing callbacks inside a function. The way we do this is by using the [`.then`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) and [`.catch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) methods. `.then` allows attaching a callback to handle the fulfillment of an operation, while `.catch` does the same but for the rejection. 

If we wanted to execute several asynchronous operations with callbacks in order, we would have to nest them (creating *callback hell*). But with promises, we can make `.then` return another promise, to which we can attach another `.then` and chain them together. Let's see that by fetching data from the [random user API](https://randomuser.me/api).

In Node.js, we would have to use the [HTTP module](https://nodejs.dev/learn/the-nodejs-http-module) to make an API call. However, it is a low-level module and is not very developer-friendly. Therefore, we will be using [node-fetch](https://www.npmjs.com/package/node-fetch), which emulates the [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) browser global method, and—what's more important—it returns a promise.

```shell
npm install node-fetch@2
```

Note: it's necessary to install `node-fetch` v2 since v3 is an ESM-only module, so you can't import it with `require()`. Although, in recent versions of Node.js, you can use ESM modules by changing the .js extension to .mjs.

Then we can import the `fetch` function from `node-fetch` and call the fetch function with the random user data endpoint as its only argument:

```javascript
const fetch = require("node-fetch");
const responsePromise = fetch("https://randomuser.me/api");
```

Before continuing, let's analyze the `responsePromise` promise by logging it to the console

```java
const fetch = require("node-fetch");
const responsePromise = fetch("https://randomuser.me/api");

console.log(responsePromise);
```

Output: 

```powershell
Promise { <pending> }
```

As you can see, at the moment of logging the state of the promise it is pending. No matter how fast the fetch call was, logging the promise will always return a pending status because  Node.js will see the `fetch` function is an asynchronous operation, thus it won't block JavaScript's thread and will let the `console.log()` be executed. To avoid this, we must use `.then` to wait for the promise fulfillment:

```javascript
const fetch = require("node-fetch");
const responsePromise = fetch("https://randomuser.me/api");

const jsonPromise = responsePromise.then((response) => {
	return response.json();
});

const dataPromise = jsonPromise.then((data) => {
	console.log(data);
})
```

Let's break down what's happening here: the `fetch` function returns the `responsePromise` promise, which can be fulfilled and return a response. To handle the response, we attach a `.then` with a callback that returns the result of `response.json()` to parse the response to JSON format. `response.json()` returns a promise as well, to which we can attach another `.then` to handle its fulfillment by logging the received data to the console. 

However, all the promises can be rejected du to an error, and to handle them we can use an only `.catch` since if there is an error,  Node.js will look down the chain for `.catch` handlers:

```javascript
const fetch = require("node-fetch");
const responsePromise = fetch("https://randomuser.me/api");

const jsonPromise = responsePromise.then((response) => {
	return response.json();
});

const dataPromise = jsonPromise.then((data) => {
	console.log(data);
})

dataPromise.catch((err) => {
	console.log(err);
});
```

Chaining several `.then` and `.catch` methods can be illustrated better if we write them like this: 

```javascript
const fetch = require("node-fetch");
const responsePromise = fetch("https://randomuser.me/api");

responsePromise
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		console.log(data);
	})
	.catch((err) => {
		console.log(err);
	});
```

# async/await

The last way to work with asynchronism in Node.js is with async functions. An async function is a function declared with the `async` keyword at the beginning, allowing the use of the `await` keyword inside. The `await` keyword can be used with functions that return a promise to stop execution until the returned promise is fulfilled or rejected, avoiding the use of `.then` and `.catch` chains. In the following example, we transform the previous example using the async/await pattern: 

```javascript
const fetch = require("node-fetch");

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

Here, the value returned from the promise fulfillment is treated as the return value of the `await` expression, so `response` will always be the fulfilled value of the promise but in case of rejection due to an error, `try/catch` will handle it.

# Adding promises to callback-based functions

Even though promises are considered the best way to work with asynchronism with Node.js, a major part of the integrated methods still use callbacks since they were released before ES6. However, we can implement promise-based behavior in non-promise functions using the `Promise` constructor. 

> When called via `new`, the \[Promise] constructor takes a function, called the "executor function", as its parameter. This function should take two functions as parameters. The first of these functions (resolve) is called when the asynchronous task completes successfully and returns the results of the task as a value. The second (reject) is called when the task fails and returns the reason for failure, which is typically an error object.
>
> [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise)

New promises tend to have the following structure:

```javascript
const myPromise = new Promise((resolve, reject)=>{
	asyncProcess.on("data", (data)=>{
		resolve(data);
	})

	asyncProcess.on("error", (error)=>{
		reject(error);
	})
})
```

Knowing this, we can create a `new Promise` around a function that doesn't support promises, and call the `resolve` function inside its callback. We will see how to do it by making a `setTimeout` method support promises chains and async/await.

## To Promise

In this case, we create a `new Promise`, which will be resolved after 2000ms elapses and won't block JavaScript single-thread, so the other console logs will be executed. 

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

Here, we create a new promise around the `setTimeout` method, declare the `resolve` function inside the callback, and after 2000ms it will be executed, returning "Third asynchronous log" as the fulfilled value. To wait for the `resolve` execution, we attach a `.then` to the promise with a callback that will log the fulfilled value to the console.

## To async/await

On this occasion, we also create a `new Promise` but we use the `await` keyword to wait for the promise to be resolved after 2000ms. Although, in this case, we do block JavaScript single-thread, so the other console logs won't be executed until the promise is resolved. 

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

	console.log("Third log");
};

getLogs(myPromise);
```

# Conclusion

Even though promises are lifesavers, asynchronous callbacks are still very useful if we don't want to do several asynchronous operations in order. On the other hand, consuming promises with `.then` and `.catch` make your code more readable and are better for error handling than callbacks, besides they don't suspend execution. Lastly, the async/await pattern has the same advantages of `.then` and `.catch`, but they block the thread, which can be useful depending on the situation. 

I hope you found this post helpful and until the next time!