---
tipo: blog
slug: Three ways to work with asynchronism in Node.js
fecha: 2022-01-13T00:00:36.661Z
titulo: Tres maneras de trabajar con asincronismo en Node.js
subtitulo: Callbacks, Promesas y async/await
descripcion: "JS asincrono: tres maneras de trabajar con asincronismo en Node.js
  y JavaScript. Utilizando callbacks, ES6 promesas, ES6+ async/await con
  ejemplos"
---
# Introducción

A pesar de que podemos hacer varias tareas en una computadora de manera simultanea, en su interior, una computadora de un sólo nucleo solo puede ejecutar una operación a la vez, bloqueando la ejecución de otras operaciones. Así que para que una computadora realice varias tareas, debe correr un programa cuando sea necesario, y pausar su ejecución para hacer paso para otros programas en un bucle constante, el cual es tan rápido que crea la ilusión de simultaneidad.

Al igual que otros lenguajes de programación, JavaScript nació como un lenguaje sincrono utilizado para crear interacción con el usuario. No obstante, para resonder asinronamente a eventos del usuario como clicks, scrolls y toques, JavaScript utilza APIs especificas del navegador para declarar una función, guardarla en memoria (en una cola) y ejecutarlas cuando el evento ocurra.

Del mismo modo, the ambiente de ejecución de Node.js permite correr JavaScript de tal manera que no bloquee la ejecución de otras partes del codigo, lo cual lo hace parecer un lenguaje asincrono. Para lograr esto, JavaScript nos da tres principales manera de trabajar con asincronismo, o en otras palabras, para declarar un bloque de codigo y ejecutarlo cuando lo necesitemos: callbacks, proemsas y async/await.

# Callbacks

Un callback es una función pasada como un argumento en el interior de una funcion para que sea ejecutada ahí. Uno de sus principales usos es correr codigo después de que una operación asincrona termine. Este tipo de callbacks son llamados callbacks asincronos. Son utilies para planificar que una función se ejecute después de un eveneto o de cierto tiempo, mientras que no bloquean el único hilo de ejecución de JavaScript, permitiendo que otras funciones se ejecuten. El siguiente ejemplo muestra un callback, el cual será ejecutado despues de 2000ms

```javascript
console.log("Primer log");

setTimeout(() => {
	console.log("Tercer log asincrono");
}, 2000);

console.log("Segundo log");
```

El código anterior emite los siguientes logs:

```shell
Primer log
Segundo log
Tercer log asincrono
```

Como puedes observar, a pesar de que el *Tercer log asincrono* es declarado antes que el *Segundo log*, el tercer log se va a esperar 2000ms para ser ejecutado, pero durante ese tiempo no bloqueara el hilo, permitiendo que el segundo log sea ejecutado.

# Promesas

A pesar de que los callbacks son muy útiles, si queremos ejecutar varias operaciones asincronas en orden, o en otras palabras, si queremos emular sincronismos, tendríamos que anidar un callback dentro de otro callback y así sucesivamente, haciendo que to código sea enmarañado y menos legible. Esta tendencia de anidar varios callbacks es conocida como *callback hell* (el infierno de los callbacks). El siguiente ejemplo muestra el resultado de anidar cuatro niveles de callbacks:

```javascript
setTimeout(() => {
	console.log("Primer log");
	setTimeout(() => {
		console.log("Segundo log");
		setTimeout(() => {
			console.log("Tercer log");
			setTimeout(() => {
				console.log("Cuarto log");
			}, 2000);
		}, 2000);
	}, 2000);
}, 2000);
```

Verdad que es confuso? Es por eso que ES6 trajó consigo una nueva manera de trabajar con operaciones asincronas: promesas. Una promesa es un objecto que representa la completación o rechazo (comunmente debido a un error) de una operación asincrona. Además de poder ser completada o rechazada, una promesa puede tener un tercer estado: pendiente; cuando aún no ha adquirido ninguno de los dos estados anteriores.

El encanto de las promesas es que podemos adjuntar un callback al objecto de la promesa en vez de pasar un callback dentro de una función. La manera en la que ahcemos esto es utilizando los métodos [`.then`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) y [`.catch`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch).  `.then` te permite adjuntar un callback para manejar la completación de una operación, mientras que `.catch` hace lo mismo pero para el rechazo.

Si quisieramos ejecutar varias operaciones asincronas con callbacks en orden, las tendríamos que anidar (creando `callback hell`). Pero con promesas, podemos hacer que un `.then` devuelva otra promesa, a la cual podemos adjuntar otro `.then`, creando una cadena. Veamos esto al obtener data de la random user [random user API](https://randomuser.me/api).

En Node.js, tendríamos que utilizar el [módulo HTTP](https://nodejs.dev/learn/the-nodejs-http-module) para llamar a una API. No obstante, es un módulo de bajo nivel y no es muy amigable para el desarrollador. Por lo tanto, utilizaremos [node-fetch](https://www.npmjs.com/package/node-fetch), el cual emula el método global del navegador [fetch()](https://developer.mozilla.org/es/docs/Web/API/fetch), y—lo que es más importante—retorna una promisa como resultado.

```shell
npm install node-fetch@2
```

Note: es necesario instalar `node-fetch` v2 ya que v3 es sólo un módulo ESM, por lo que puedes importarlo utilizando `require()`. No obstante, en versiones más recientes de Node.js, puedes utilizar módulos ESM al cambiar la extensión .js a .mjs.

Después, podemos importar la función `fetch` de `node-fetch` y ejecutarla con el random user data endpoint como su único argumento: 

```javascript
const fetch = require("node-fetch");
const promesaDeRespuesta = fetch("https://randomuser.me/api");
```

Antes de continuar, vamos a analizar la promesa `promesaDeRespuesta` al imprimirla su estado en consola. 

```javascript
const fetch = require("node-fetch");
const promesaDeRespuesta = fetch("https://randomuser.me/api");

console.log(promesaDeRespuesta);
```

Resultado:

```powershell
Promise { <pending> }
```

Como puedes ver, al momento de imprimir el estado, la promesa está pendiente. No importa que tan rápido la función `fetch` se haya ejecutado, siempre va a retornar un estado de pendiente porque Node.js va a ver que la función `fetch` es operación asincrona, por lo que no va a bloquear el hilo de JavaScript y dejará que `console.log()` se ejecute. Para evitar esto, debemos adjutar `.then` para esperar por la completación de la promesa:

```javascript
const fetch = require("node-fetch");
const promesaDeRespuesta = fetch("https://randomuser.me/api");

const promesaDeJSON = promesaDeRespuesta.then((respuesta) => {
	return respuesta.json();
});

const promesaDeData = promesaDeJSON.then((data) => {
	console.log(data);
})
```

Vamos a desglosar qué está pasando: la función `fetch` retorna `promesaDeRespuesta`, la cual puede ser completada y retornar una respuesta. Para manejar la respuesta, adjuntamos un `.then` con un callback que retorna el resultado de `respuesta.json()` para traducir la respuesta al formato JSON. `respuesta.json()` también retorna una promesa, a la que podemos adjunat otro `.then` para manejar su completación e imrpimir los datos recevidos a la consola.

No obstante, todas las promesas puede ser rechazadas debido a un error, y para manejar esto, podemos utilizar un único `.catch`, ya que si hay un error, Node.js buscara en toda la cadena de `.then` por un `.catch`:

```javascript
const fetch = require("node-fetch");
const promesaDeRespuesta = fetch("https://randomuser.me/api");

const promesaDeJSON = promesaDeRespuesta.then((respuesta) => {
	return respuesta.json();
});

const promesaDeData = promesaDeJSON.then((data) => {
	console.log(data);
})

promesaDeData.catch((err) => {
	console.log(err);
});
```

Encadenar varios `.then` y`.catch` puede ser ilustrado mejor si lo escribimos de la siguiente manera: 

```javascript
const fetch = require("node-fetch");
const promesaDeRespuesta = fetch("https://randomuser.me/api");

promesaDeRespuesta
	.then((respuesta) => {
		return respuesta.json();
	})
	.then((data) => {
		console.log(data);
	})
	.catch((err) => {
		console.log(err);
	});
```

# async/await

La úliima forma de trabajar con asincronismo en Node.js es utilizando funciones asincronas. Una función asincrona es declarada con la palabra clave `async` al comienzo, lo que permite el uso de la palabara `await` en su interior. `await` puede ser utilizado antes de una funció que retorna una promesa para detener la ejecución del código hasta que la promesa sea completada o rechazada, evitando así el uso de las cadenas de `.then` y `.catch`. En el siguiente ejemplo, veremos como utilizar el ejemplo anteriores utilizando el patrón async/await.

```javascript
const fetch = require("node-fetch");

const obtenerUsuario = async () => {
	try {
		const respuesta = await fetch("https://randomuser.me/api/");
		const data = await response.json();
		console.log(data);
	} catch (err) {
		console.log(err);
	}
};

obtenerUsuario();
```

Aquí, el valor retornado de la completación de la promesa es tratado como el valor de retorno de `await`, por lo que `respuesta` siempre va a ser el valor esperado cuando la promesa es exitosa, pero en caso de un rechazo debido a un error, `try/catch` lo va a manejar.

# Añadiendo promesas a funciones basadas en callbacks

A pesar de que las promesas son consideradas la mejor forma de trabajar con asincronismo en Node.js, una gran parte de los métodos integrados por defecto aún utilizan callbacks ya que fueron creados antes de ES6. No obstante, aún podemos implementar un comportamiento basado en promesas a funciones con callbacks clásicos utilizando el constructor `Promise`.

> Cuando es invocado a través de `new`, el constructor de promesas utiliza una función, llamada la "función ejecutora, como su único parametro. Esta funcion toma dos funciones como parámetros. La primera de estas funciones (resolver) es llamada cuando una tarea asincrona es completada con exito y retorna el resultado de la tarea como valor. El segundo object (rechazar) es llamado cuando la tarea falla y retorna la razón del fallo, que es tipicamente un objeto de error"
>
> [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise)

Una nueva promesa suele tener la siguiente estructura:

```javascript
const myPromesa = new Promise((resolver, rechazar)=>{
	procesoAsincrono.on("data", (data)=>{
		resolver(data);
	})

	procesoAsincrono.on("error", (error)=>{
		rechazar(error);
	})
})
```

## A Promesa

## A async/await

# Conclusión