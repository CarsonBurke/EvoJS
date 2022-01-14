class Resource extends GameObject {
    constructor(left, top, resourceType) {

        const width = resourceTypes[resourceType].width
        const height = resourceTypes[resourceType].height
        
        super('resource', left, top, width, height, document.getElementById(resourceType))

        const resource = this

        resource.amount = resourceTypes[resourceType].amount
        resource.lastRegen = Math.random() * 500
    }
}