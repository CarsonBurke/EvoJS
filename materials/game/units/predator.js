class Predator extends GameObject {
    constructor(left, top, predatorType) {

        const width = gridSize
        const height = gridSize

        super(predatorType, left, top, width, height, document.getElementById(predatorType))

        const predator = this
    }
}