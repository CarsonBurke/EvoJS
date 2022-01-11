class GameObject {
    constructor(type, left, top, width, height, image) {

        const gameObj = this

        gameObj.type = type

        gameObj.pos = new Pos(left, top, width, height)

        gameObj.width = width
        gameObj.height = height

        gameObj.image = image

        gameObj.id = newID()

        if (!game.objects[type]) game.objects[type] = {}
        game.objects[type][gameObj.id] = gameObj
    }
}

GameObject.prototype.draw = function() {


    const gameObject = this

    game.cm.drawImage(gameObject.image, gameObject.pos.left, gameObject.pos.top, gameObject.width, gameObject.height)
}

GameObject.prototype.move = function(left, top) {

    const gameObject = this

    gameObject.pos.left = left
    gameObject.pos.top = top
}