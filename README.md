# layerjs
## What is this?
In essence, this is **a library that allows for canvas multilayering**. This was intended to be used alongside dragjs.
## Quickstart
  1. Put the script in the head tag
```html
<head>
  <script src="layer.js"></script>
</head>
```
  2. Create a div **with a width and height**
```html
<body>
  <div style="width: 800px; height: 600px" id="layerCanvas"></canvas>
  <!-- don't use inline styles :D -->
</body>
``` 
  3. Make a new `layerObject` and add some layers
```javascript
var canvas = document.getElementById("layerCanvas");
var layeredCanvas = new layerObject(canvas)
layeredCanvas.addToTop("background")
layeredCanvas.addToBottom("foreground")
var frontLayer = layeredCanvas.layerContext("background")  // contains the canvas for this layer
frontLayer.rect()
```

## Functions + options
```javascript
new layerObject(canvas)          // Creates a new layer object where canvas points to a div
layeredCanvas.addToTop(id)       // Adds a new layer to the top
layeredCanvas.addToBottom(id)    // Adds a new layer to the bottom
layeredCanvas.layerContext(id)   // Gets the canvas ctx for the layered canvas
layeredCanvas.layerElement(id)   // Gets the canvas element for the layered canvas
layeredCanvas.layers             // Returns an array of layer ids
layeredCanvas.updateLayers(arr)  // Replaces layeredCanvas.layers with arr (arr is an array of ids)

layeredCanvas.layer(id1).addAbove(id2)    // Creates a layer id2 above id1
layeredCanvas.layer(id1).addBelow(id2)    // Creates a layer id2 below id1
layeredCanvas.layer(id).show()            // Shows the specified layer
layeredCanvas.layer(id).hide()            // Hides the specified layer
layeredCanvas.layer(id)                   // Returns a Layer object
```
