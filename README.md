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
  <div style="width: 800px; height: 600px" id="layerCanvas"></div>
  <!-- don't use inline styles :D -->
</body>
``` 
  3. Make a new `layerObject` and add some layers
```javascript
var canvas = document.getElementById("layerCanvas");
var layeredCanvas = new layersObject(canvas)
layeredCanvas.addToTop("foreground")
layeredCanvas.addToBottom("background")
var frontLayer = layeredCanvas.layer("foreground").context  // contains the canvas for this layer
frontLayer.fillStyle = "#808080"
frontLayer.rect(20, 20, 40, 40)
frontLayer.fill()
var backLayer = layeredCanvas.layer("background").context
backLayer.rect(0, 0, 80, 80)
backLayer.fill()
```

## Functions + options
```javascript
new layerObject(canvas)          // Creates a new layer object where canvas points to a div
layeredCanvas.getLayers()        // Gets a list of layer IDs
layeredCanvas.addToTop(id)       // Adds a new layer to the top
layeredCanvas.addToBottom(id)    // Adds a new layer to the bottom
layeredCanvas.addAbove(x, y)     // Adds a new layer (y) above x
layeredCanvas.addBelow(x, y)     // Adds a new layer (x) below y
layeredCanvas.removeFromTop()    // Removes a layer from the top
layeredCanvas.removeFromBottom() // Removes a layer from the bottom
layeredCanvas.remove(id)         // Removes a layer by its id
layeredCanvas.layer(id)          // Gets a layer object

layeredCanvas.layer(id).show()       // Shows the specified layer
layeredCanvas.layer(id).hide()       // Hides the specified layer
layeredCanvas.layer(id).element      // Returns a pointer to the HTML element of the canvas
layeredCanvas.layer(id).context      // Returns the 2d context of the layer
layeredCanvas.layer(id).id           // Gets the id of the referenced layer
layeredCanvas.layer(id).shownState   // The pointer-events class value when the element is visible
layeredCanvas.layer(id).hiddenState  // The pointer-events class value when the element is hidden
layeredCanvas.layer(id)              // Returns a Layer object
```
