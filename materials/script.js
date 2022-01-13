const game = new Game()

game.init()

game.createGrid()

runEnv()

const human = new Human(0, 0)

new Prey(0, 0, 'rabbit')
new Predator(0, 0, 'wolf')