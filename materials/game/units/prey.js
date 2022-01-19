class Prey extends GameObject {
    constructor(left, top, preyType) {

        const width = gridSize
        const height = gridSize

        super('prey', left, top, width, height, document.getElementById(preyType))

        const prey = this

        prey.preyType = preyType
    }
}