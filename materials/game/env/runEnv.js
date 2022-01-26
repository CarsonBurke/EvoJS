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

            const huntTargetType = 'prey'

            const inputs = [
                { name: 'Can have child', value: human.canHaveChildren() ? 1 : 0 },
                { name: 'Food count', value: resourceCarryCapacity - human.resources.food },
                { name: 'Water count', value: resourceCarryCapacity - human.resources.water },
                { name: 'Can hunt', value: human.findHuntTarget(huntTargetType) ? 1 : 0 },
            ]
            
            const outputs = [
                { name: 'Breed', function: () => human.breed(inputs, outputs) },
                { name: 'Forage', function: () => human.forage() },
                { name: 'Drink', function: () => human.drink() },
                { name: 'Hunt', function: () => human.hunt(huntTargetType) },
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

        let preyCount = 0

        for (const ID in game.objects.prey) {

            const prey = game.objects.prey[ID]

            preyCount++

            const inputs = [
                { name: 'Can have child', value: prey.canHaveChildren() ? 1 : 0 },
                { name: 'Food count', value: resourceCarryCapacity - prey.resources.food },
                { name: 'Water count', value: resourceCarryCapacity - prey.resources.water },
            ]
            
            const outputs = [
                { name: 'Breed', function: () => prey.breed(inputs, outputs) },
                { name: 'Forage', function: () => prey.forage() },
                { name: 'Drink', function: () => prey.drink() },
            ]

            if (!prey.network) prey.createNetwork(inputs, outputs)

            prey.network.forwardPropagate(inputs)

            prey.network.visualsParent.classList.remove('visualsParentShow')

            // Find last layer
            
            const lastLayer = prey.network.layers[Object.keys(prey.network.layers).length - 1]

            // Sort perceptrons by activateValue and get the largest one

            const perceptronWithLargestValue = Object.values(lastLayer.perceptrons).sort((a, b) => a.activateValue - b.activateValue).reverse()[0]

            //

            if (perceptronWithLargestValue.activateValue > 0) outputs[perceptronWithLargestValue.name].function()

            //

            prey.updateStats()
        }

        let predatorCount = 0

        for (const ID in game.objects.predator) {

            const predator = game.objects.predator[ID]

            predatorCount++

            const huntTargetType = 'prey'

            const inputs = [
                { name: 'Can have child', value: predator.canHaveChildren() ? 1 : 0 },
                { name: 'Food count', value: resourceCarryCapacity - predator.resources.food },
                { name: 'Water count', value: resourceCarryCapacity - predator.resources.water },
                { name: 'Can hunt', value: predator.findHuntTarget(huntTargetType) ? 1 : 0 },
            ]
            
            const outputs = [
                { name: 'Breed', function: () => predator.breed(inputs, outputs) },
                { name: 'Drink', function: () => predator.drink() },
                { name: 'Hunt', function: () => predator.hunt(huntTargetType) },
            ]

            if (!predator.network) predator.createNetwork(inputs, outputs)

            predator.network.forwardPropagate(inputs)

            predator.network.visualsParent.classList.remove('visualsParentShow')

            // Find last layer
            
            const lastLayer = predator.network.layers[Object.keys(predator.network.layers).length - 1]

            // Sort perceptrons by activateValue and get the largest one

            const perceptronWithLargestValue = Object.values(lastLayer.perceptrons).sort((a, b) => a.activateValue - b.activateValue).reverse()[0]

            //

            if (perceptronWithLargestValue.activateValue > 0) outputs[perceptronWithLargestValue.name].function()

            //

            predator.updateStats()
        }

        //

        if (humanCount > humansMax) humansMax = humanCount

        const displayStats = {
            tick,
            humanCount,
            humansMax,
            preyCount,
            predatorCount,
        }

        for (const displayStatName in displayStats) {
            
            document.getElementById(displayStatName).innerText = displayStats[displayStatName]
        }
    }
}