class Predator extends GameObject {
    constructor(left, top, predatorType) {

        const width = gridSize * 2
        const height = gridSize * 2

        super(predatorType, left, top, width, height, document.getElementById(predatorType))

        const predator = this
    }
}