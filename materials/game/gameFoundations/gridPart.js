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

    const growthChance = Math.random() * 1 + gridPart.fertility * 4
    
    // If the dirt is growable

    if (growthChance < 1) return false

    let finalTerrainResourceType = 'grass'

    const resourceTypeValue = Math.random()

    for (const terrainResourceType in fertileTerrainOptions) {

        const resourceValues = terrainResourceTypes[terrainResourceType]

        if (resourceTypeValue >= resourceValues.threshold) {

            finalTerrainResourceType = terrainResourceType
            break
        }
    }

    const resourceTypeIndex = Math.floor(Math.random() * Object.keys(fertileTerrainOptions).length)
    
    //

    const terrainResourceType = Object.keys(terrainResourceTypes)[resourceTypeIndex]

    //
    
    new TerrainResource(gridPart.pos.left, gridPart.pos.top, finalTerrainResourceType)
    return fertileTerrainOptions[terrainResourceType].weight
}