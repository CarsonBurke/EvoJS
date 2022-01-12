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

    for (let x = 0; x < gameWidth; x += gridSize) {
        for (let y = 0; y < gameHeight; y += gridSize) {

            // noise.simplex2 and noise.perlin2 for 2d noise

            var noiseResult = Math.abs(noise.perlin2(x / 500, y / 500))

            //

            let terrainType = 'deepWater'

            for (const type in terrainTypes) {

                const terrain = terrainTypes[type]

                if (noiseResult > terrain.threshold) {

                    terrainType = type
                    break
                } 
            }

            // Create a new grid part based on the terrain type and position

            new GridPart(x, y, terrainType)
        }
    }
}