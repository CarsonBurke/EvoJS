const game = new Game()

game.init()

game.createGrid()

runEnv()

for (let i = 0; i < 10; i++) {

    const left = Math.floor(Math.random() * gameWidth / gridSize) * gridSize
    const top = Math.floor(Math.random() * gameHeight / gridSize) * gridSize

    new Human(left, top)
}

const rabbit = new Prey(100, 100, 'rabbit')
const wolf = new Predator(0, 0, 'wolf')