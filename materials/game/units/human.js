class Human extends GameObject {
    constructor(left, top) {

        const width = 20
        const height = 20

        super('human', left, top, width, height, document.getElementById('human'))

        const human = this
    }
}

Human.prototype.moveTo = function(left, top) {

    const human = this

    const start = graph.grid[human.left][human.top]
    const end = graph.grid[left][top]

    const path = astar.search(game.graph, start, end)

    // Inform false if there is no path

    if (path.length == 0) return false

    // Otherwise move to the first pos in the path

    human.move(path.x, path.y)
}