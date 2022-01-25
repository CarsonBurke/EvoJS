const game = new Game()

game.init()

game.createGrid()

runEnv()

for (let i = 0; i < 100; i++) {

    const left = Math.floor(Math.random() * gameWidth / gridSize) * gridSize
    const top = Math.floor(Math.random() * gameHeight / gridSize) * gridSize

    new Human(left, top)
}

for (let i = 0; i < 100; i++) {

    const left = Math.floor(Math.random() * gameWidth / gridSize) * gridSize
    const top = Math.floor(Math.random() * gameHeight / gridSize) * gridSize

    new Prey(left, top, 'rabbit')
}

for (let i = 0; i < 100; i++) {

    const left = Math.floor(Math.random() * gameWidth / gridSize) * gridSize
    const top = Math.floor(Math.random() * gameHeight / gridSize) * gridSize

    new Predator(left, top, 'wolf')
}