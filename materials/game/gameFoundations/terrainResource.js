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
}

TerrainResource.prototype.updateStats = function() {

    const terrainResource = this

    if (terrainResource.amount <= 0) {

        if (terrainResourceTypes[terrainResource.terrainResourceType].depletedType) {

            terrainResource.terrainResourceType = terrainResourceTypes[terrainResource.terrainResourceType].depletedType

            terrainResource.image = document.getElementById(terrainResource.terrainResourceType)
        }

        const randomChance = Math.random() * 500

        if (randomChance > 1) return

        terrainResource.terrainResourceType = terrainResourceTypes[terrainResource.terrainResourceType].replenishedType

        terrainResource.image = document.getElementById(terrainResource.terrainResourceType)

        terrainResource.amount = terrainResourceTypes[terrainResource.terrainResourceType].amount
    }
}