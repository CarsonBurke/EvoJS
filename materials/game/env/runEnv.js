function runEnv() {

    let i = 0

    setInterval(updateGame, 10)

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

        //

        const targets = [
            new Pos(900, 100, gridSize, gridSize),
            new Pos(900, 900, gridSize, gridSize),
            new Pos(100, 900, gridSize, gridSize),
            new Pos(100, 100, gridSize, gridSize),
        ]

        while (i < 4) {

            human.moveTo(targets[i])
            rabbit.moveTo(targets[i])
            wolf.moveTo(targets[i])

            if (i === 3) {

                i = 0
            }

            i++
            break
        }
    }
}