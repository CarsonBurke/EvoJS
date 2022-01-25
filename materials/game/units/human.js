class Human extends GameObject {
    constructor(left, top) {

        const width = gridSize
        const height = gridSize

        super('human', left, top, width, height, document.getElementById('human'))

        const human = this

        human.humanType = ''

        human.health = Math.random() * 100
        human.age = 0

        human.resources = {}

        for (const resourceType in resourceTypes) {

            human.resources[resourceType] = 0
        }

        human.childAmount = 0

        human.resources.food = 2
        human.resources.water = 2
    }
}