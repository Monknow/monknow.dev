---
tipo: blog
slug: How to use the canvas element in React
fecha: 2021-11-13T18:54:36.427Z
titulo: React. How to use the canvas element
subtitulo: The best practices; with hooks and performance
portada: how-to-use-a-canvas-element-in-react.jpg
descripcionImagen: React logo on a canvas
descripcion: How to use the canvas element in React. Using the best practices;
  with functional component, react hooks and the best performance
---
# Introduction

Normally, when using vanilla Javascript to manipulate a canvas element, you would have to get an [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) reference of the canvas element in the DOM, then call [HTMLCanvasElement.getContext()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext) to get a drawing context and start drawing onto the canvas. However, in React, you use JSX to manipulate the DOM, and when you need access to an HTMLElement reference, you can simply use the useRef hook. However, it can be tricky to know where to call useRef() and getContext(), so they just get called when needed and therefore avoid unnecessary calculations on every render.

# The Gist

## 1. Create a React App

Create a new React app and once all packages are installed, change the directory to it. 

```powershell
 npx create-react-app canvas
```

```powershell
cd canvas
```

### Small tip

After installing the `create-react-app` dependencies, I got the following npm audit security warning, even though I just initialized the app. 

```powershell
27 vulnerabilities (16 moderate, 9 high, 2 critical)
```

Even though [npm audit isn't the best tool](https://overreacted.io/npm-audit-broken-by-design/) to check for security risks, if you don't want to see the warning you can  move `react-scripts` from `dependencies` to `devDependencies` in `package.json`. However, `npm audit` still warns for development dependencies by default, so you will have to run `npm audit --production` to not see the warnings caused by the development dependencies

```json
// canvas/package.json
	"dependencies": {
		"@testing-library/jest-dom": "^5.15.0",
		"@testing-library/react": "^11.2.7",
		"@testing-library/user-event": "^12.8.3",
		"react": "^17.0.2",
		"react-dom": "^17.0.2"
	},
	"devDependencies": {
		"react-scripts": "4.0.3"
	},
```



## 2. Create a Canvas Element

## 3. Reference the Canvas

## 4. Create a Context

## 5. Draw something!

# Conclusion