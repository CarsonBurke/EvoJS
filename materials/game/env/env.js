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
const gridSize = 20

let ID = 0

const resourceTypes = {
    food: {

    },
    water: {

    },
    wood: {

    },
    stone: {

    },
}

const terrainTypes = {
    deepWater: {
        threshold: 0.55,
        weight: 100,
    },
    water: {
        threshold: 0.5,
        weight: 4,
    },
    sand: {
        threshold: 0.43,
        weight: 3,
    },
    dirt: {
        threshold: 0,
        weight: 1,
    },
    grass: {
        threshold: 0,
        weight: 2,
    }
}

const terrainResourceTypes = {
/*     bushBush: {
        amount: 3,
        width: gridSize,
        height: gridSize,
        threshold: 0.4,
    }, */
    grass: {
        width: gridSize,
        height: gridSize,
        threshold: 0.4,
    },
    berryBush1: {
        amount: 3,
        width: gridSize,
        height: gridSize,
        threshold: 0.35,
        resourceType: 'food',
    },
    berryBush2: {
        amount: 3,
        width: gridSize,
        height: gridSize,
        threshold: 0.3,
        resourceType: 'food',
    },
    noBerryBush1: {
        amount: 0,
        width: gridSize,
        height: gridSize,
        threshold: 0.25,
    },
    noBerryBush2: {
        amount: 0,
        width: gridSize,
        height: gridSize,
        threshold: 0.15,
    },
    tree1: {
        amount: 5,
        width: gridSize,
        height: gridSize,
        threshold: 0.05,
        resourceType: 'wood',
    },
    tree2: {
        amount: 5,
        width: gridSize,
        height: gridSize,
        threshold: 0,
        resourceType: 'wood',
    }
}

const fertileTerrainOptions = {
/*     bushBush: {
        weight: 4,
    }, */
    grass: {
        weight: 2,
    },
    berryBush1: {
        weight: 4,
    },
    berryBush2: {
        weight: 4,
    },
    noBerryBush1: {
        weight: 4,
    },
    noBerryBush2: {
        weight: 4,
    },
    tree1: {
        weight: 100,
    },
    tree2: {
        weight: 100,
    }
}