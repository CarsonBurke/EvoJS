class GameObject {
    constructor(type, left, top, width, height, image) {

        const gameObj = this

        gameObj.type = type

        gameObj.pos = new Pos(left, top, width, height)

        gameObj.width = width
        gameObj.height = height

        gameObj.image = image

        gameObj.id = newID()

        if (!game.objects[type]) game.objects[type] = {}
        game.objects[type][gameObj.id] = gameObj
    }
}

GameObject.prototype.draw = function() {


    const gameObject = this

    game.cm.drawImage(gameObject.image, gameObject.pos.left, gameObject.pos.top, gameObject.width, gameObject.height)
}

GameObject.prototype.moveTo = function(targetPos) {

    const gameObject = this

    // If there isn't a path or the path is empty

    if (!gameObject.path || !gameObject.path.length > 0) {

        // Generate a new one

        generatePath()
    }

    function generatePath() {

        // Construct starts and ends based on the gameObject pos and target left and top
    
        const start = game.graph.grid[gameObject.pos.left / gridSize][gameObject.pos.top / gridSize]
        const end = game.graph.grid[targetPos.left / gridSize][targetPos.top / gridSize]

        // If the start and end are at the same positions

        if (gameObject.pos.isInside(targetPos)) {

            // Reset path and stop

            gameObject.path = []
            return false
        }

        // Generate a path from start to end using the graph
        
        gameObject.path = astar.search(game.graph, start, end)
    }

    // Stop if there is no path
    
    if (gameObject.path.length == 0) return false

    // Loop through positions in the path

    for (const pos of gameObject.path) {

        // Visualize the text's weight

        game.cm.fillText(pos.weight, pos.x * gridSize, pos.y * gridSize);
    }

    // Construct the first pos

    const firstPos = gameObject.path[0]
        
    // Move to the first pos in the path and inform true
    
    gameObject.pos.left = firstPos.x * gridSize
    gameObject.pos.top = firstPos.y * gridSize

    // Remove the first element of the path

    gameObject.path.shift()
    
    // And inform true

    return true
}