class Human extends GameObject {
    constructor(left, top) {

        const width = gridSize
        const height = gridSize

        super('human', left, top, width, height, document.getElementById('human'))

        const human = this

        human.resources = {}
    }
}