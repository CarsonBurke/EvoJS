class Prey extends GameObject {
    constructor(left, top, preyType) {

        const width = gridSize
        const height = gridSize

        super(preyType, left, top, width, height, document.getElementById(preyType))

        const prey = this
    }
}