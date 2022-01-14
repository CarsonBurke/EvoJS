// How often to update sprites (don't set to faster than tickSpeed)

const FPS = 60

// How often to run the game

const tickSpeed = 100

// How fast the camera moves

const cameraSpeed = 20
//

globalThis.game = undefined

const gameWidth = 1000
const gameHeight = 1000
const gridSize = 10

let ID = 0

const terrainTypes = {
    deepWater: {
        threshold: 0.55,
        weight: 100,
    },
    water: {
        threshold: 0.5,
        weight: 3,
    },
    sand: {
        threshold: 0.43,
        weight: 2,
    },
    dirt: {
        threshold: 0,
        weight: 1,
    },
    grass: {
        threshold: 0,
        weight: 1.5,
    }
}