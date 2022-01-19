class Prey extends GameObject {
    constructor(left, top, preyType) {

        const width = gridSize
        const height = gridSize

        super('prey', left, top, width, height, document.getElementById(preyType))

        const prey = this

        prey.preyType = preyType

        prey.health = Math.random() * 10

        prey.resources = {}

        for (const resourceType in resourceTypes) {

            prey.resources[resourceType] = 0
        }

        prey.resources.food = 5
    }
}