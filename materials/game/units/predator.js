class Predator extends GameObject {
    constructor(left, top, predatorType) {

        const width = gridSize
        const height = gridSize

        super('predator', left, top, width, height, document.getElementById(predatorType))

        const predator = this

        predator.predatorType = predatorType

        predator.health = Math.random() * 10
        predator.age = 0

        predator.resources = {}

        for (const resourceType in resourceTypes) {

            predator.resources[resourceType] = 0
        }

        predator.childAmount = 0

        predator.resources.food = 2
        predator.resources.water = 2
    }
}