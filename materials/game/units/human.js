class Human extends GameObject {
    constructor(left, top) {

        const width = gridSize * 2
        const height = gridSize * 2

        super('human', left, top, width, height, document.getElementById('human'))

        const human = this
    }
}