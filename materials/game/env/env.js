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

const maxChildren = 10
const resourceCarryCapacity = 100

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
        amount: 0,
        width: gridSize,
        height: gridSize,
        threshold: 0.4,
    }, */
    grass: {
        width: gridSize,
        height: gridSize,
        threshold: 0.2,
    },
    berryBush1: {
        amount: 10,
        width: gridSize,
        height: gridSize,
        threshold: 0.15,
        resourceType: 'food',
        depletedType: 'noBerryBush1'
    },
    berryBush2: {
        amount: 10,
        width: gridSize,
        height: gridSize,
        threshold: 0.1,
        resourceType: 'food',
        depletedType: 'noBerryBush2'
    },
    noBerryBush1: {
        amount: 0,
        width: gridSize,
        height: gridSize,
        threshold: 0.75,
        replenishedType: 'berryBush1'
    },
    noBerryBush2: {
        amount: 0,
        width: gridSize,
        height: gridSize,
        threshold: 0.05,
        replenishedType: 'berryBush2'
    },
    tree1: {
        amount: 15,
        width: gridSize,
        height: gridSize,
        threshold: 0.25,
        resourceType: 'wood',
    },
    tree2: {
        amount: 15,
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