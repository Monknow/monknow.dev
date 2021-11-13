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



## 2. Create a Canvas Element

## 3. Reference the Canvas

## 4. Create a Context

## 5. Draw something!

# Conclusion