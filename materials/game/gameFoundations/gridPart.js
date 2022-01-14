class GridPart extends GameObject {
    constructor(left, top, terrainType, noiseResult) {

        super('pos', left, top, gridSize, gridSize, document.getElementById(terrainType))

        const gridPart = this

        gridPart.terrainType = terrainType
        gridPart.fertility = noiseResult
    }
}

GridPart.prototype.initializeResource = function() {

    const gridPart = this
    
    if (gridPart.terrainType != 'dirt') return false

    const growthChance = Math.random() * 1 + gridPart.fertility * 2
    
    // If the dirt is growable

    if (growthChance < 1) return false

    const resourceTypeIndex = Math.floor(Math.random() * Object.keys(fertileTerrainOptions).length)
    
    //

    const resourceType = Object.keys(resourceTypes)[resourceTypeIndex]

    //
    
    new Resource(gridPart.pos.left, gridPart.pos.top, resourceType)
    return fertileTerrainOptions[resourceType].weight
}