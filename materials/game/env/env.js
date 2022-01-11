// How often to update sprites (don't set to faster than tickSpeed)

const FPS = 60

// How often to run the game

const tickSpeed = 100

//

globalThis.game = undefined

const gameWidth = 1000
const gameHeight = 1000
const gridSize = 30

let ID = 0

const terrainTypes = {
    deepWater: {
        threshold: 1,
    },
    water: {
        threshold: 0.35,
    },
    sand: {
        threshold: 0.3,
    },
    grass: {
        threshold: 0.26,
    },
    dirt: {
        threshold: 0.2,
    },
}