class Prey extends GameObject {
    constructor(left, top, preyType) {

        const width = gridSize * 2
        const height = gridSize * 2

        super(preyType, left, top, width, height, document.getElementById(preyType))

        const prey = this
    }
}