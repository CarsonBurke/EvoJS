class GridPart extends GameObject {
    constructor(left, top, terrainType) {

        super('pos', left, top, gridSize, gridSize, document.getElementById(terrainType))
    }
}