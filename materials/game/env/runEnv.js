function runEnv() {

    //

    let humansMax = 0

    let tick = 0

    setInterval(updateGame, 1)

    function updateGame() {

        tick++

        //

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


        for (const ID in game.objects.pos) {

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

        let humanCount = 0

        for (const ID in game.objects.human) {

            const human = game.objects.human[ID]

            humanCount++

            const inputs = [
                { name: 'Can have child', value: human.canHaveChildren() ? 1 : 0 },
                { name: 'Food count', value: resourceCarryCapacity - human.resources.food },
                { name: 'Water count', value: resourceCarryCapacity - human.resources.water },
            ]
            
            const outputs = [
                { name: 'Breed', function: () => human.breed(inputs, outputs) },
                { name: 'Forage', function: () => human.forage() },
                { name: 'Drink', function: () => human.drink() },
                /* { name: 'Hunt' }, */
            ]

            if (!human.network) human.createNetwork(inputs, outputs)

            human.network.forwardPropagate(inputs)

            human.network.visualsParent.classList.remove('visualsParentShow')

            // Find last layer
            
            const lastLayer = human.network.layers[Object.keys(human.network.layers).length - 1]

            // Sort perceptrons by activateValue and get the largest one

            const perceptronWithLargestValue = Object.values(lastLayer.perceptrons).sort((a, b) => a.activateValue - b.activateValue).reverse()[0]

            //

            if (perceptronWithLargestValue.activateValue > 0) outputs[perceptronWithLargestValue.name].function()

            //

            human.updateStats()
        }

        const humansByFood = Object.values(game.objects.human).sort((a, b) => (a.resources.food + a.resources.water) - (b.resources.food + b.resources.water))

        const humanWithMostFood = humansByFood[humansByFood.length - 1]
        
        if (humanWithMostFood) {

            humanWithMostFood.network.updateVisuals()

            humanWithMostFood.network.visualsParent.classList.add('visualsParentShow')
        }

        /* for (const ID in game.objects.predator) {

            const predator = game.objects.predator[ID]

            predator.updateStats()
            
            predator.hunt('prey')
        } */

        //

        if (humanCount > humansMax) humansMax = humanCount

        const displayStats = {
            tick,
            humanCount,
            humansMax
        }

        for (const displayStatName in displayStats) {
            
            document.getElementById(displayStatName).innerText = displayStats[displayStatName]
        }
    }
}