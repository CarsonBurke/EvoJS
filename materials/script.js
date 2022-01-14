const game = new Game()

game.init()

game.createGrid()

runEnv()

const human = new Human(0, 0)

const rabbit = new Prey(0, 0, 'rabbit')
const wolf = new Predator(0, 0, 'wolf')