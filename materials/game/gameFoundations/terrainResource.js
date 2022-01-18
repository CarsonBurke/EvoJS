class TerrainResource extends GameObject {
    constructor(left, top, terrainResourceType) {
        
        const width = terrainResourceTypes[terrainResourceType].width
        const height = terrainResourceTypes[terrainResourceType].height
        
        super('resource', left, top, width, height, document.getElementById(terrainResourceType))

        const terrainResource = this

        terrainResource.terrainResourceType = terrainResourceType

        terrainResource.resourceType = terrainResourceTypes[terrainResourceType].resourceType
        
        terrainResource.amount = terrainResourceTypes[terrainResourceType].amount
        terrainResource.lastRegen = Math.random() * 500
    }
}

TerrainResource.prototype.harvest = function(harvester) {

    const terrainResource = this

    harvester.resources[terrainResource.resourceType]++

    terrainResource.amount--

    if (terrainResource.amount <= 0) terrainResource.delete()
}