class Human extends GameObject {
    constructor(left, top) {

        const width = gridSize
        const height = gridSize

        super('human', left, top, width, height, document.getElementById('human'))

        const human = this

        human.humanType = ''

        human.health = Math.random() * 10

        human.resources = {}

        for (const resourceType in resourceTypes) {

            human.resources[resourceType] = 0
        }

        human.resources.food = 5

        human.lastBreed = 0
    }
}