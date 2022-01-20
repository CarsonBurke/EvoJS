function runEnv() {

    setInterval(updateGame, 1)

    let tick = 0

    function updateGame() {

        tick++

        // Store the current transformation matrix

        game.cm.save()

        // Use the identity matrix while clearing the canvas
        
        game.cm.setTransform(1, 0, 0, 1, 0, 0)
        game.cm.clearRect(0, 0, gameWidth, gameHeight)

        //

        // Restore the transform

        game.cm.restore()

        for (const ID in game.objects.pos) {

            const object = game.objects.pos[ID]

            object.draw()
        }

        for (const type in game.objects) {

            if (type == 'pos') continue

            for (const ID in game.objects[type]) {

                const object = game.objects[type][ID]

                object.draw()
            }
        }

        moveCamera()

        function moveCamera() {

            if (tick % 10 == 0) game.offsetLeftSpeed = 0
            game.offsetLeft += game.offsetLeftSpeed

            if (tick % 10 == 0) game.offsetTopSpeed = 0
            game.offsetTop += game.offsetTopSpeed
    
            game.cm.translate(game.offsetLeftSpeed, game.offsetTopSpeed)
        }


        for (const ID in game.objects.gridPart) {

            const gridPart = game.objects.pos[ID]

            game.baseGraph[gridPart.pos.left / gridSize][gridPart.pos.top / gridSize] = terrainTypes[gridPart.terrainType].weight
        }

        for (const ID in game.objects.resource) {

            const terrainResource = game.objects.resource[ID]

            terrainResource.updateStats()

            game.baseGraph[terrainResource.pos.left / gridSize][terrainResource.pos.top / gridSize] = fertileTerrainOptions[terrainResource.terrainResourceType].weight
        }
        
        //

        for (const ID in game.objects.human) {

            const human = game.objects.human[ID]

            game.baseGraph[human.pos.left / gridSize][human.pos.top / gridSize] = 100
        }

        game.graph = new Graph(game.baseGraph, {
            diagonal: true
        })

        //

        for (const ID in game.objects.human) {

            const human = game.objects.human[ID]

            human.updateStats()

            human.breed(tick)

            if (human.resources.water < 10) {

                human.drink()
                continue
            }

            human.forage()
        }

        for (const ID in game.objects.predator) {

            const predator = game.objects.predator[ID]

            predator.updateStats()
            
            predator.hunt('prey')
        }
    }
}