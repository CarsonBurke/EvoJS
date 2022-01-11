function runEnv() {

    setInterval(updateGame, 1)

    let tick = 0

    function updateGame() {

        tick++

        moveCamera()

        function moveCamera() {

            if (tick % 10 == 0) game.offsetLeftSpeed = 0
            game.offsetLeft += game.offsetLeftSpeed

            if (tick % 10 == 0) game.offsetTopSpeed = 0
            game.offsetTop += game.offsetTopSpeed
    
            game.cm.translate(game.offsetLeftSpeed, game.offsetTopSpeed)
        }
    }

    setInterval(updateSprites, 1)

    function updateSprites() {

        // Store the current transformation matrix

        game.cm.save()

        // Use the identity matrix while clearing the canvas
        
        game.cm.setTransform(1, 0, 0, 1, 0, 0)
        game.cm.clearRect(0, 0, gameWidth, gameHeight)

        //

        // Restore the transform

        game.cm.restore()

        for (const type in game.objects) {

            for (const ID in game.objects[type]) {

                const object = game.objects[type][ID]

                object.draw()
            }
        }
    }
}