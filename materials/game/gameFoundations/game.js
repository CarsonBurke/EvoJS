class Game {
    constructor() {

        const game = this

        game.objects = {}
    }
}

Game.prototype.init = function() {

    // Create ID

    game.ID = newID()

    // Get the canvas and give ti an ID

    game.canvas = document.getElementById('game')
    game.border = document.getElementById('gameBorder')
    
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
        
        game.scrollUp()
        return
    }
    if (key == 'a') {

        game.scrollLeft()
        return
    }
    if (key == 's') {

        game.scrollDown()
        return
    }
    if (key == 'd') {

        game.scrollRight()
        return
    }
}

Game.prototype.scrollUp = function() {
    
    game.border.scroll({
        top: game.border.scrollTop - 50,
        behavior: 'smooth'
    })
}

Game.prototype.scrollLeft = function() {

    game.border.scroll({
        left: game.border.scrollLeft - 50,
        behavior: 'smooth'
    })
}

Game.prototype.scrollDown = function() {

    game.border.scroll({
        top: game.border.scrollTop + 50,
        behavior: 'smooth'
    })
}

Game.prototype.scrollRight = function() {

    game.border.scroll({
        left: game.border.scrollLeft + 50,
        behavior: 'smooth'
    })
}

Game.prototype.createGrid = function() {

    for (let x = 0; x < gameWidth; x += gridSize) {
        for (let y = 0; y < gameHeight; y += gridSize) {

            const terrainType = 'terrain'

            new GridPart(x, y, terrainType)
        }
    }
}