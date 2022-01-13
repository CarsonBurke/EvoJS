class Game {
    constructor() {

        const game = this

        game.offsetLeftSpeed = 0
        game.offsetTopSpeed = 0
        
        game.offsetLeft = 0
        game.offsetTop = 0

        game.objects = {}
    }
}

Game.prototype.init = function() {

    // Create ID

    game.ID = newID()

    // Get the canvas and give ti an ID

    game.canvas = document.getElementById('game')
    game.border = document.getElementById('gameBorder')

    window.onscroll = function() {
        window.scrollTo(0, 0)
    }
    
    game.canvas.ID = game.ID

    // Style canvas

    game.canvas.width = gameWidth
    game.canvas.height = gameHeight

    // Create canvas manager by configuring canvas context

    game.cm = game.canvas.getContext('2d')

    // Turn off anti-aliasing

    game.cm.imageSmoothingEnabled = false

    // Config font color

    game.cm.fillStyle = 'white'

    //

    document.addEventListener('keydown', game.useHotkeys)
}

Game.prototype.useHotkeys = function(event) {

    const key = event.key

    if (key == 'w') {
        
        game.offsetTopSpeed = cameraSpeed
        return
    }
    if (key == 'a') {

        game.offsetLeftSpeed = cameraSpeed
        return
    }
    if (key == 's') {

        game.offsetTopSpeed = cameraSpeed * -1
        return
    }
    if (key == 'd') {

        game.offsetLeftSpeed = cameraSpeed * -1
        return
    }
}

Game.prototype.createGrid = function() {

    noise.seed(Math.random())

    const graph = []

    for (let x = 0; x < gameWidth; x += gridSize) {

        const graphRow = []

        for (let y = 0; y < gameHeight; y += gridSize) {

            // noise.simplex2 and noise.perlin2 for 2d noise

            var noiseResult = Math.abs(noise.perlin2(x / 500, y / 500))

            //

            let terrainType = 'deepWater'

            for (const type in terrainTypes) {

                const terrain = terrainTypes[type]

                if (noiseResult >= terrain.threshold) {

                    terrainType = type
                    break
                } 
            }

            // Create a new grid part based on the terrain type and position

            const gridPart = new GridPart(x, y, terrainType)

            function findFertility() {

                // Set the fertility to a default 0

                gridPart.fertility = 0

                // Stop if terrain isn't dirt

                if (terrainType != 'dirt') return

                // Otherwise set the fertility to noise result and randomly change the terrain to grass

                gridPart.fertility = noiseResult

                const grassChance = Math.random() * 1 + noiseResult * 2
                
                // If the dirt is randomly grass

                if (grassChance > 1) {

                    // Change gridPart's terrain type and image to match grass
                    
                    terrainType = 'grass'
                    gridPart.image = document.getElementById('grass')
                }
            }

            // Find the terrain's fertility and change to grass if fertile enough

            findFertility()

            // Add the graphValue of the terrain to the graph row

            graphRow.push(terrainTypes[terrainType].weight)
        }

        graph.push(graphRow)
    }

    game.graph = new Graph(graph)
}