---
tipo: blog
slug: How to use the canvas element in React
fecha: 2021-11-13T18:54:36.427Z
titulo: React para principiantes. Como usar el elemento de canvas
subtitulo: Las mejores practicas; con React Hooks y rendimiento
portada: how-to-use-a-canvas-element-in-react.jpg
descripcionImagen: Logo de React en un lienzo
descripcion: Como usar el elemento de canvas en React. Usando las mejores
  prácticas; con componentes funcionales, React Hooks y el mejor rendimiento
---
# Introducción

Normalmente, cuando usamos vanilla Javascript para manipular el elemento de canvas, tendrías que obtener una referencia del [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)del canvas en el DOM, y después ejecutar [`HTMLCanvasElement.getContext()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext) para obtener un contexto de dibujo y así empezar a usar el canvas. Sin embargo, en React, utilizas JSX para manipular el DOM, y cuando necesitamos acceso a la referencia `HTMLElement` , tú simplemente utiilizas el `useRef` hook de React. No obstante, puede ser confuso saber donde llamar a `useRef` y `getContext` de tal manera que solo sean ejecutados cuando sea necesario, y así evitar calculos inecesarios en cada renderizado. 

# Al Punto

## 1. Crear una nueva app de React

Crea una nueva app de React, y una vez que todos los paquetes se instalen, cambia el directo a la carpeta recién creada

```shell
 npx create-react-app canvas
```

```powershell
cd canvas
```

Finalmente, puedes ejecutar el comando de inicio y verás un nuevo proyecto en [localhost:3000](http://localhost:3000/)

```shell
 npm run start
```

![Nuevo proyecto en locahost. Logo de React flotando detrás de un fondo gris](react-home.png "Nuevo proyecto en locahost")

### Pequeño consejo

Después de instalar las dependencias de `create-react-app`, obtuve la siguiente advertencia de npm audit, a pesar de que acabo de inicializar la app.

```powershell
27 vulnerabilities (16 moderate, 9 high, 2 critical)
```

A pesar de que [npm audit no es la mejor herramienta](https://overreacted.io/npm-audit-broken-by-design/) para examinar riesgos en la seguridad de tu app, si no quieres ver la advertencia, puedes mover `react-scripts` de `dependencies` a `devDependencies` en `package.json`. No obstante,  `npm audit` aún te advierte por vulnerabilidades en las dependencias de desarrollo, por lo que tendrás que ejcutar `npm audit --production` para no ver la advertencia.

```json
// canvas/package.json

	"dependencies": {
		"@testing-library/jest-dom": "^5.15.0",
		"@testing-library/react": "^11.2.7",
		"@testing-library/user-event": "^12.8.3",
		"react": "^17.0.2",
		"react-dom": "^17.0.2",
        "web-vitals": "^1.1.2",
	},
	"devDependencies": {
		"react-scripts": "4.0.3"
	},
```

## 2. Crea y referencia el elemento de Canvas

Una vez que todo este listo, puedes abrir el archivo `src/App.js` y borrar todo el código de muestra, dejando solamente un componente funcional. Posteriormente, añade un elemento de canvas dentro, importa el hook de `useRef` de `react`, y crea una referencia al canvas a través del atributo `ref`. 

```jsx
// canvas/src/App.js

import {useRef} from "react";

function App() {

	const canvasRef = useRef(null);

	return (
		<div>
			<canvas ref={canvasRef}></canvas>
		</div>
	);
}

export default App;
```

### Nota

Pasamos `null` como el primero argumento de `useRef` para utilizarlo como el valor inicial de `canvasRef`, que es la variable que almacenará el `HTMLElement` del canvas.

We pass `null` as the first argument of `useRef` to use it as the initial value of `canvasRef`, which is the variable that will store the canvas HTMLElement.  

## 3. Crea un contexto

Puedes crear un contexto de dibujo que este globalmente disponible en el componente al llamar `getContext` al inicio de la función.. Después pasamos "2d" como el primer parámetro de  `getContext`  ya que define el tipo de contexto del canvas, el cual puede estar en dos o tres dimensiones.

```jsx
// canvas/src/App.js

import {useRef} from "react";

function App() {

	const canvasRef = useRef(null);

	const canvas = canvasRef.current;
	const context = canvas.getContext("2d");


	return (
		<div>
			<canvas ref={canvasRef}></canvas>
		</div>
	);
}

export default App;
```

### Nota

El la referencia del canvas no es almacenado directamente en el `canvasRef`, sino en su única propiedad llamada `.current`.



Sin embargo, **esta implementación no es la más apropiada**, ya que cada vez que el compone sea renderizado, `getContext` será llamada. No obstante, de acuerdo a la [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext),



> Ejecuciones posteriores  del metodo `getContext` del mismo elemento canvas, con el mismo argumento de tipo de contexto, siempre devolverán el mismo contexto de dibujo como fue devuelto cuando el metodo fue invocado por primera vez. No es posible obtener otro contexto de dibujo de un mismo elemento canvas.

Por lo que no te tienes que preocupar de tu app 

So you don't have to worry about your app breaking due to calling several times the `getContext` method. Nevertheless, you should avoid unnecessary calculations by using the `useEffect` hook and creating the context inside. It is valuable to notice that we don't have to add the `canvasRef` variable to useEffect's dependency array, since mutating a ref doesn't trigger a re-render or a useEffect call, so we left it empty thus it only gets called once.

```jsx
// canvas/src/App.js

import {useRef, useEffect} from "react";

function App() {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");
	}, []);

	return (
		<div>
			<canvas ref={canvasRef}></canvas>
		</div>
	);
}

export default App;
```

Although, now the context isn't globally available to the component; it only exists inside the `useEffect`, so to fix that you would have to create a global state with `useState` and a `null` initial value. Then inside the `useEffect`, assign the context to the state.  

```jsx
// canvas/src/App.js

import {useRef, useState, useEffect} from "react";

function App() {
	const [canvasContext, setCanvasContext] = useState(null);

	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");
		setCanvasContext(context);
	}, []);

	return (
		<div>
			<canvas ref={canvasRef}></canvas>
		</div>
	);
}

export default App;
```

## 4. Draw something!

Finally, we will manipulate the canvas context and canvas element by resizing the canvas to the window size and changing the background color every time the user clicks on the canvas.

If you inspect the canvas element with the dev tools, you will see that the canvas is a small rectangle at the page corner. 

![Canvas element occupying a small part of the window](canvas-size-on-windows.png "Canvas element in the window")

 To resize it, you can access the `window` object to get its width and height properties and then use `canvasRef.current` to change the canvas element size. 

```jsx
// canvas/src/App.js

import {useRef, useState, useEffect} from "react";

function App() {
	const [canvasContext, setCanvasContext] = useState(null);

	const canvasRef = useRef(null);

	useEffect(() => {
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;

		const canvas = canvasRef.current;

		canvas.width = windowWidth;
		canvas.height = windowHeight;

		const context = canvas.getContext("2d");
		setCanvasContext(context);
	}, [canvasRef]);

	return (
		<div>
			<canvas ref={canvasRef}></canvas>
		</div>
	);
}

export default App;
```

To finish, you can use the context variable to manipulate the canvas content inside the `onClick` canvas' attribute. You can use the `context.fillStyle` method to change the color of the rectangle, and then use the `context.fillRect` method to actually draw the rectangle. `context.fillRect` takes 4 arguments, the two first are the starting x and y coordinates (which will be 0,0), and the last two are the finish point (which will be the canvas width and height).

```jsx
// canvas/src/App.js

//....
	return (
		<div>
			<canvas
				ref={canvasRef}
				onClick={() => {
					canvasContext.fillStyle = "red";
					canvasContext.fillRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
				}}></canvas>
		</div>
	);
//....
```

Now if you click the canvas element, it will change from white to red. Now, you can add an array with color names and use [Math.random](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/random) to get a random color every time there is a click.

```jsx
// canvas/src/App.js

import {useRef, useState, useEffect} from "react";

const colors = ["red", "green", "blue", "yellow", "purple", "orange", "black", "white", "brown"];

const getRandomColor = () => {
	const randomIndex = Math.floor(Math.random() * colors.length);
	return colors[randomIndex];
};

function App() {
	const [canvasContext, setCanvasContext] = useState(null);

	const canvasRef = useRef(null);

	useEffect(() => {
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;

		const canvas = canvasRef.current;

		canvas.width = windowWidth;
		canvas.height = windowHeight;

		const context = canvas.getContext("2d");
		setCanvasContext(context);
	}, [canvasRef]);

	return (
		<div>
			<canvas
				ref={canvasRef}
				onClick={() => {
					canvasContext.fillStyle = getRandomColor();
					canvasContext.fillRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
				}}></canvas>
		</div>
	);
}

export default App;
```

### Note

`Math.random` returns a random value between 0 to 1, so we had to multiply it times the colors array length.

### Result

![Window randomly switching its background color ](canvas-result.gif "Result")

# Conclusion

As you can see, now you can use the drawing context across the component. It is worth noticing that if you need to use the canvas HTMLElement reference, you can globally use the `canvasRef.current` property, or the read-only [`canvasContext.canvas`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/canvas)`.`  I hope you find this approach easy and readable, as well as performant. Until the next time!