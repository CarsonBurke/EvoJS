class Human {
    constructor() {

        const human = this

        human.ID = newID()

        game.objects.human[human.ID] = human
    }
}