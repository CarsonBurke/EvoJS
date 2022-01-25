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

GameObject.prototype.delete = function() {

    const gameObject = this

    if (gameObject.network) gameObject.network.visualsParent.remove()

    delete game.objects[gameObject.type][gameObject.id]
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

        game.cm.fillText(pos.weight, pos.x * gridSize + gridSize / 2, pos.y * gridSize + gridSize / 2);
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

GameObject.prototype.canHaveChildren = function() {

    const gameObject = this

    if (gameObject.childAmount >= maxChildren) return false

    const breedChance = Math.random() * gameObject.age

    if (breedChance < 400) return false

    return true
}

GameObject.prototype.breed = function(inputs, outputs) {

    const gameObject = this

    if (!gameObject.canHaveChildren()) return false

    const animalClasses = {
        Human,
        Prey,
        Predator
    }

    // 

    const childAmount = Math.random() * 3

    let newChildAmount = 0

    while (newChildAmount < childAmount) {

        const child = new animalClasses[gameObject.constructor.name](gameObject.pos.left, gameObject.pos.top)

        child.network = gameObject.network.clone(inputs, outputs)

        child.network.learn()
        
        gameObject.childAmount++
        newChildAmount++
    }
}

GameObject.prototype.hunt = function(type) {

    const gameObject = this

    const creaturesOfType = Object.values(game.objects[type])
    
    const closestCreatureOfType = gameObject.pos.sortGameObjectsByDistance(creaturesOfType)[0]

    if (!closestCreatureOfType) return false

    if (gameObject.pos.getDistance(closestCreatureOfType.pos) > gridSize * 1.5) {

        gameObject.moveTo(closestCreatureOfType.pos) 
        return false
    }

    gameObject.attack(closestCreatureOfType)
    return true
}

GameObject.prototype.attack = function(target) {

    const gameObject = this

    target.health -= 1

    if (target.health > 0) return false

    target.delete()

    gameObject.food += 30
}

GameObject.prototype.drink = function() {

    const gameObject = this

    const water = Object.values(game.objects.pos).filter(pos => pos.terrainType == 'water')

    const closestWater = gameObject.pos.sortGameObjectsByDistance(water)[0]

    if (!closestWater) return false

    if (gameObject.pos.getDistance(closestWater.pos) > gridSize * 1.5) {

        gameObject.moveTo(closestWater.pos)
        return false
    }

    if (gameObject.resources.water < resourceCarryCapacity) gameObject.resources.water++
    return true
}

GameObject.prototype.forage = function() {

    const gameObject = this

    const bushes = Object.values(game.objects.resource).filter(terrainResource => (terrainResource.terrainResourceType == 'berryBush1' || terrainResource.terrainResourceType == 'berryBush2') && terrainResource.amount > 0)

    const closestBush = gameObject.pos.sortGameObjectsByDistance(bushes)[0]

    if (!closestBush) return false

    if (gameObject.pos.getDistance(closestBush.pos) > gridSize * 1.5) {

        gameObject.moveTo(closestBush.pos) 
        return false
    }

    closestBush.harvest(gameObject)
    return true
}

GameObject.prototype.updateStats = function() {

    const gameObject = this

    gameObject.age++

    gameObject.health -= Math.random() * gameObject.age / 100000

    if (gameObject.resources.food <= 0) gameObject.health -= 0.1
    if (gameObject.resources.water <= 0) gameObject.health -= 0.1

    if (gameObject.resources.water > 0) gameObject.resources.water -= 0.03
    if (gameObject.resources.food > 0) gameObject.resources.food -= 0.03

    if (gameObject.health <= 0) gameObject.delete()
}

GameObject.prototype.createNetwork = function(inputs, outputs) {
    
    const gameObject = this

    // Create neural network
    
    const network = new NeuralNetwork()
    
    // Create layers
    
    let layerCount = 2
    
    for (let i = 0; i < layerCount; i++) network.addLayer()
    
    // Create perceptrons
    
    // Create input perceptrons
    
    for (let i = 0; i < inputs.length; i++) network.layers[0].addPerceptron()
    
    // Create hidden perceptrons
    
    let hiddenPerceptronsNeed = 4
    
    // Loop through layers
    
    for (let layerName in network.layers) {
    
        // Filter only hidden layers
    
        let layersCount = Object.keys(network.layers).length
    
        if (layerName > 0 && layerName < layersCount - 1) {
    
            let layer = network.layers[layerName]
    
            for (let i = 0; i < hiddenPerceptronsNeed; i++) layer.addPerceptron()
        }
    }
    
    // Create output perceptrons
    
    for (let i = 0; i < outputs.length; i++) network.layers[layerCount - 1].addPerceptron()
    
    //
    
    network.init(inputs, outputs)

    gameObject.network = network
}