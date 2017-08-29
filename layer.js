var layersObject = function (canvas) {
    var canvasObj = canvas;
    if (canvas === undefined) throw Error("Canvas element not specified")
    var layers = []
    var layersAndData = []

    canvasObj.style.position = "relative";
    /**
     * Returns an array of layer ids from bottom to top
     * @returns {Array}
     */
    this.getLayers = function () {
        return layers
    }
    
    /**
     * Returns the data of a layer
     * @param {any} id - the id of the layer to be accessed
     * @returns {individualLayer} the layer specified by the id
     */
    this.layer = function (id) {
        if (layers.indexOf(id) == -1) throw Error("The layer specified does not exist")
        for (var i = 0; i < layersAndData.length; i++) {
            if (layersAndData[i].id == id) {
                return layersAndData[i]
            }
        }
        throw Error("The layer specified does not exist")
    }

    /**
     * Adds a layer to the top
     * @param {any} id - a unique id for this layer
     */
    this.addToTop = function (id) {
        if (id === undefined) throw Error("Layer ID not specified")
        if (layers.indexOf(id) != -1) throw Error("Duplicate ID")
        layers.push(id)
        var newLayer = document.createElement("canvas");
        newLayer.id = id;
        newLayer = styleLayer(newLayer)
        canvasObj.appendChild(newLayer)
        layersAndData.push(new individualLayer(id, true))
    }

    /**
     * Removes a layer from the top
     */
    this.removeFromTop = function () {
        if (layers.length == 0) throw Error("Cannot remove layer; no layers are added")
        var layerID = layers.pop()
        layersAndData.pop()
        document.getElementById(layerID).remove()
    }

    /**
     * Adds a layer to the bottom
     * @param {any} id - a unique id for this layer
     */
    this.addToBottom = function (id) {
        if (id === undefined) throw Error("Layer ID not specified")
        if (layers.indexOf(id) != -1) throw Error("Duplicate ID")
        layers.splice(0, 0, id)
        var newLayer = document.createElement("canvas");
        newLayer.id = id;
        newLayer = styleLayer(newLayer)
        if (layers.length == 1) {
            canvasObj.appendChild(newLayer)
        }
        else {
            canvasObj.insertBefore(newLayer, document.getElementById(layersAndData[0].id))
        }
        layersAndData.splice(0, 0, new individualLayer(id, true))
    }

    /**
     * Removes a layer from the bottom
     */
    this.removeFromBottom = function () {
        if (layers.length == 0) throw Error("Cannot remove layer; no layers are added")
        var layerID = layers.splice(0, 1)
        layersAndData.splice(0, 1)
        document.getElementById(layerID).remove()
    }

    /**
     * Adds layer y above layer x
     * @param {any} x - the id of layer x
     * @param {any} y - the id of layer y - the layer to be added
     */
    this.addAbove = function (x, y) {
        if (x === undefined || y === undefined) throw Error("Layer ID not specified")
        if (layers.indexOf(y) != -1 || x == y) throw Error("Duplicate ID")
        if (layers.indexOf(x) == -1) throw Error("ID " + x + " not present")
        layers.splice((layers.indexOf(x) + 1), 0, y)
        var newLayer = document.createElement("canvas");
        newLayer.id = y;
        newLayer = styleLayer(newLayer)
        insertAfter(newLayer, document.getElementById(layersAndData[layers.indexOf(x)].id));
        layersAndData.splice((layers.indexOf(x) + 1), 0, new individualLayer(y, true))
    }

    /**
     * Adds layer x below layer y
     * @param {any} x - the id of layer x - the layer to be added
     * @param {any} y - the id of layer y
     */
    this.addBelow = function (x, y) {
        if (x === undefined || y === undefined) throw Error("Layer ID not specified")
        if (layers.indexOf(x) != -1 || x == y) throw Error("Duplicate ID")
        if (layers.indexOf(y) == -1) throw Error("ID " + y + " not present")
        layers.splice(layers.indexOf(y), 0, x)
        var newLayer = document.createElement("canvas");
        newLayer.id = x;
        newLayer = styleLayer(newLayer)
        var layidx = 0;
        for (var i = 0; i < layersAndData.length; i++) {
            if (layersAndData[i].id == y) {
                layidx += i
            }
        }
        canvasObj.insertBefore(newLayer, document.getElementById(layersAndData[layidx].id));
        layersAndData.splice(layers.indexOf(y), 0, new individualLayer(x, true))
    }

    /**
     * Removes a layer given the id
     * @param {any} id - the id of the layer to be removed
     */
    this.remove = function (id) {
        if (layers.length == 0) throw Error("Cannot remove layer; no layers are added")
        if (layers.indexOf(id) == -1) throw Error("Cannot remove layer; layer is not present")
        var layerID = layers.splice(layers.indexOf(id), 1)
        layersAndData.splice(layers.indexOf(id), 1)
        document.getElementById(layerID).remove()
    }
    function styleLayer(newLayer) {
        newLayer.style.width = "100%";
        newLayer.style.height = "100%";
        newLayer.style.pointerEvents = "none";
        newLayer.style.position = "absolute"
        newLayer.setAttribute("data-layer-visible", true)
        return newLayer;
    }
    function insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
}

var individualLayer = function (id, isShown) {
    if (isShown === undefined) isShown = true;
    var visible = isShown;

    /** Returns a pointer to the layer  */
    this.element = document.getElementById(id)

    /** Returns the canvas context of the layer
     * @returns {CanvasRenderingContext2D}
     */
    this.context = this.element.getContext("2d")

    this.element.setAttribute("width", this.element.getBoundingClientRect().width)
    this.element.setAttribute("height", this.element.getBoundingClientRect().height)
    /** Returns the id of this layer  */
    this.id = id

    /** Changes the pointer-events when visible  */
    this.shownState = "none"    // Pointer events

    /** Changes the pointer-events when not visible  */
    this.hiddenState = "none"   // Pointer events

    /** Shows the current layer */
    this.show = function () {
        document.getElementById(this.id).style.opacity = 1
        document.getElementById(this.id).style.pointerEvents = this.shownState
        this.element.setAttribute("data-layer-visible", true)
        visible = true;
    }

    /** Hides the current layer */
    this.hide = function () {
        document.getElementById(this.id).style.opacity = 0
        document.getElementById(this.id).style.pointerEvents = this.hiddenState
        this.element.setAttribute("data-layer-visible", false)
        visible = true;
    }
}
