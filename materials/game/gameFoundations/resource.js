class TerrainResource extends GameObject {
    constructor(left, top, resourceType) {

        const width = terrainResourceTypes[resourceType].width
        const height = terrainResourceTypes[resourceType].height
        
        super('resource', left, top, width, height, document.getElementById(resourceType))

        const resource = this

        resource.amount = terrainResourceTypes[resourceType].amount
        resource.lastRegen = Math.random() * 500
    }
}