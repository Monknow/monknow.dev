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

A pesar de que podemos hacer varias tareas en una computadora de manera simultánea, en su interior, una computadora de un sólo núcleo sólo puede ejecutar una operación a la vez, bloqueando la ejecución de otras operaciones. Así que para que una computadora realice varias tareas, debe correr un programa cuando sea necesario, y pausar su ejecución para hacer paso a otros programas en un bucle constante, el cual es tan rápido que crea la ilusión de simultaneidad.

Al igual que otros lenguajes de programación, JavaScript nació como un lenguaje síncrono utilizado para crear interacción con el usuario. No obstante, para responder asíncronamente a eventos del usuario como clicks, scrolls y taps, JavaScript utiliza APIs específicas del navegador para declarar una función, guardarla en memoria (en una cola) y ejecutarlas cuando el evento ocurra.

Del mismo modo, el ambiente de ejecución de Node.js permite correr JavaScript de tal manera que no bloquee la ejecución de otras partes del código, lo cual lo hace parecer un lenguaje asíncrono. Para lograr esto, JavaScript nos da tres principales maneras de trabajar con asincronismo, o en otras palabras, para declarar un bloque de código y ejecutarlo cuando lo necesitemos: callbacks, promesas y async/await.

# Callbacks

Un callback es una función que se pasa como un argumento en el interior de una función para que sea ejecutada ahí. Uno de sus principales usos es correr código después de que una operación asíncrona termine. Este tipo de callbacks son llamados callbacks asíncronos. Son útiles para planificar que una función se ejecute después de un evento o de cierto tiempo, mientras que no bloquean el único hilo de ejecución de JavaScript, permitiendo que otras funciones se ejecuten. El siguiente ejemplo muestra un callback, el cual será ejecutado después de 2000ms:

```javascript
console.log("Primer log");

setTimeout(() => {
	console.log("Tercer log asíncrono");
}, 2000);

console.log("Segundo log");
```

El código anterior emite los siguientes logs:

```shell
Primer log
Segundo log
Tercer log asíncrono
```

Como puedes observar, a pesar de que el *Tercer log asíncrono* es declarado antes que el *Segundo log*, el tercer log va a esperar 2000ms para ser ejecutado, pero durante ese tiempo no bloqueara el hilo, permitiendo que el segundo log sea ejecutado.

# Promesas

A pesar de que los callbacks son muy útiles, si queremos ejecutar varias operaciones asíncronas en orden, o en otras palabras, si queremos emular sincronismo, tendríamos que anidar un callback dentro de otro callback y así sucesivamente, haciendo que tu código sea enmarañado y menos legible. Esta tendencia de anidar varios callbacks es conocida como callback hell (el infierno de los callbacks). El siguiente ejemplo muestra el resultado de anidar cuatro niveles de callbacks:

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

¿Verdad que es confuso? Es por eso que ES6 trajo consigo una nueva manera de trabajar con operaciones asíncronas: promesas. Una promesa es un objeto que representa la completación o rechazo (comúnmente debido a un error) de una operación asíncrona. Además de poder ser completada o rechazada, una promesa puede tener un tercer estado: pendiente; cuando aún no ha adquirido ninguno de los dos estados anteriores.

El encanto de las promesas es que podemos adjuntar un callback al objeto de la promesa en vez de pasar un callback dentro de una función. La manera en la que hacemos esto es utilizando los métodos `.then` y `.catch`. `.then` te permite adjuntar un callback para manejar la completación de una operación, mientras que `.catch` hace lo mismo pero para el rechazo.

Si quisiéramos ejecutar varias operaciones asíncronas con callbacks en orden, las tendríamos que anidar (creando callback hell). Pero con promesas, podemos hacer que un `.then` devuelva otra promesa, a la cual podemos adjuntar otro `.then`, creando una cadena. Veamos esto al obtener data de la random user random user API.

En Node.js, tendríamos que utilizar el módulo HTTP para llamar a una API. No obstante, es un módulo de bajo nivel y no es muy amigable para el desarrollador. Por lo tanto, utilizaremos `node-fetch`, el cual emula el método global del navegador `fetch()`, y—lo que es más importante—retorna una promesa como resultado.

```shell
npm install node-fetch@2
```

Note: es necesario instalar `node-fetch` v2 ya que v3 es sólo un módulo ESM, por lo que puedes importarlo utilizando require(). No obstante, en versiones más recientes de Node.js, puedes utilizar módulos ESM al cambiar la extensión `.js` a `.mjs`.

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

Como puedes ver, al momento de imprimir el estado, la promesa está pendiente. No importa que tan rápido la función fetch se haya ejecutado, siempre va a retornar un estado de pendiente porque Node.js va a ver que la función fetch es una operación asíncrona, por lo que no va a bloquear el hilo de JavaScript y dejará que `console.log()` se ejecute. Para evitar esto, debemos adjuntar `.then` para esperar por la completación de la promesa:

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

Vamos a desglosar qué está pasando: la función fetch retorna `promesaDeRespuesta`, la cual puede ser completada y retornar una respuesta. Para manejar la respuesta, adjuntamos un `.then` con un callback que retorna el resultado de `respuesta.json()` para traducir la respuesta al formato JSON. `respuesta.json()` también retorna una promesa, a la que podemos adjuntar otro `.then` para manejar su completación e imprimir los datos recibidos a la consola.

No obstante, todas las promesas puede ser rechazadas debido a un error, y para manejar esto, podemos utilizar un único `.catch`, ya que si hay un error, Node.js buscará en toda la cadena de `.then` por un `.catch`:

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

Encadenar varios `.then` y `.catch` puede ser ilustrado mejor si lo escribimos de la siguiente manera: 

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

La última forma de trabajar con asincronismo en Node.js es utilizando funciones asíncronas. Una función asíncrona es declarada con la palabra clave `async` al comienzo, lo que permite el uso de la palabra `await` en su interior. `await` puede ser utilizado antes de una función que retorna una promesa para detener la ejecución del código hasta que la promesa sea completada o rechazada, evitando así el uso de las cadenas de `.then` y .`catch`. En el siguiente ejemplo, veremos como transformar el ejemplo anterior al patrón async/await.

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

Aquí, el valor retornado de la completación de la promesa es tratado como el valor de retorno de `await`, por lo que `respuesta` siempre va a ser el valor esperado cuando la promesa es exitosa, pero en caso de un rechazo debido a un error, try/catch lo va a manejar.

# Añadiendo promesas a funciones basadas en callbacks

A pesar de que las promesas son consideradas la mejor forma de trabajar con asincronismo en Node.js, una gran parte de los métodos integrados por defecto aún utilizan callbacks ya que fueron creados antes de ES6. No obstante, aún podemos implementar un comportamiento basado en promesas a funciones con callbacks clásicos utilizando el constructor `Promise`.

> Cuando es invocado a través de `new`, el constructor de promesas utiliza una función, llamada"función ejecutora", como su único parámetro. Esta función toma dos funciones como parámetros. La primera de estas funciones (resolver) es llamada cuando una tarea asíncrona es completada con éxito y retorna el resultado de la tarea como valor. El segundo objeto (rechazar) es llamado cuando la tarea falla y retorna la razón del fallo, que es típicamente un objeto de error
>
>
> MDN

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

Sabiendo esto, podemos crear una nueva promesa alrededor de una función que no soporte promesas, y llamar la función `resolver` dentro de su callback. Veamos como hacer esto al hacer que el método `setTimeout` tenga soporte para cadenas de promesas y async/await.

## A Promesa

En este caso, creamos una nueva promesa, la cual va a ser resuelta después de 2000ms y no bloqueará el único hilo de JavaScript, por lo que los otros logs a la consola serán ejecutados.

```javascript
console.log("Primer log");

const miPromesa = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve("Tercer log asíncrono");
	}, 2000);
});

miPromesa.then((log) => {
	console.log(log);
});

console.log("Segundo log");
```

Aquí, creamos una nueva promesa alrededor del método `setTimeout`, declaramos la función resolver dentro del callback, y después de 2000ms va a ser ejecutada, retornando "Tercer log asíncrono" como su valor de completación. Para poder esperar la ejecución de `resolver`, adjuntamos un `.then` a la promesa con un callback que va a imprimir el valor de completación a la consola.

## A async/await

En esta ocasión, también creamos una nueva promesa, pero utilizamos `await` para esperar que la promesa se complete después de 2000ms. No obstante, en este caso, sí bloqueamos el único hilo de ejecución, por lo que los otros logs no serán ejecutados hasta que la promesa se complete.

```javascript
const miPromesa = new Promise((resolver, rechazar) => {
	setTimeout(() => {
		resolver("Segundo log síncrono");
	}, 2000);
});

const imprimirLogs = async (promesa) => {
	console.log("Primer log");

	await promesa.then((log) => {
		console.log(log);
	});

	console.log("Tercer log");
};

imprimirLogs(myPromise);

```

# Conclusión

A pesar de que las promesas nos hacen la vida más fácil, los callbacks asíncronos aún son muy útiles si no queremos realizar varias operaciones asíncronas seguidas. Por otro lado, consumir promesas con `.then` y `.catch` hacen que tu código sea más legible y te permiten manejar errores más fácilmente, además de que no suspenden la ejecución de JavaScript. Por último, el patrón async/await tiene las mismas ventajas que `.then` y `.catch` pero bloquean el hilo de ejecución, lo cual puede ser útil dependiendo de la situación.

¡Espero que hayas encontrado este post útil, y hasta la próxima!