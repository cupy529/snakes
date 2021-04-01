enum JacDacMessage {
    message1 = 49434,
    A = 18289,
    B = 9031,
    P1_up = 9779,
    P1 = 26744,
    P2_up = 58927,
    P1_down = 47375,
    P2_down = 49366,
    PI_left = 18819,
    P1_left = 12029,
    P2_left = 53739,
    P1_right = 61883,
    P2_right = 54083
}
namespace SpriteKind {
    export const P1 = SpriteKind.create()
    export const P2 = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.P1, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    growth1 = 1
    spawnFood()
})
sprites.onOverlap(SpriteKind.P2, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    growth2 = 1
    spawnFood()
})
multiplayer.onMasterLoop(500, function () {
    if (growth1 == 0) {
        mySprite = snake1.shift()
    } else {
        growth1 = 0
        mySprite = sprites.create(img`
6 6 6 6 6 6 6 6 
6 8 8 8 8 8 8 6 
6 8 8 8 8 8 8 6 
6 8 8 8 8 8 8 6 
6 8 8 8 8 8 8 6 
6 8 8 8 8 8 8 6 
6 8 8 8 8 8 8 6 
6 6 6 6 6 6 6 6 
`, SpriteKind.P1)
    }
    mySprite.setPosition(snake1[snake1.length - 1].x + 8 * speedX1, snake1[snake1.length - 1].y + 8 * speedY1)
    if (mySprite.x < 4 || mySprite.x > 156 || (mySprite.y < 4 || mySprite.y > 116)) {
        game.over(false)
    }
    snake1.push(mySprite)
    if (growth2 == 0) {
        mySprite = snake2.shift()
    } else {
        growth2 = 0
        mySprite = sprites.create(img`
5 5 5 5 5 5 5 5 
5 4 4 4 4 4 4 5 
5 4 4 4 4 4 4 5 
5 4 4 4 4 4 4 5 
5 4 4 4 4 4 4 5 
5 4 4 4 4 4 4 5 
5 4 4 4 4 4 4 5 
5 5 5 5 5 5 5 5 
`, SpriteKind.P2)
    }
    mySprite.setPosition(snake2[snake2.length - 1].x + 8 * speedX2, snake2[snake2.length - 1].y + 8 * speedY2)
    if (mySprite.x < 4 || mySprite.x > 156 || (mySprite.y < 4 || mySprite.y > 116)) {
        game.over(false)
    }
    snake2.push(mySprite)
})
function spawnFood () {
    mySprite = sprites.create(img`
c c c c c c c c 
c 7 7 7 7 7 7 c 
c 7 7 7 7 7 7 c 
c 7 7 7 7 7 7 c 
c 7 7 7 7 7 7 c 
c 7 7 7 7 7 7 c 
c 7 7 7 7 7 7 c 
c c c c c c c c 
`, SpriteKind.Food)
    mySprite.setPosition(4 + 8 * Math.randomRange(0, 19), 4 + 8 * Math.randomRange(0, 14))
}
sprites.onOverlap(SpriteKind.P1, SpriteKind.P2, function (sprite, otherSprite) {
    game.over(false)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (multiplayer.isPlayer1() && speedX1 == 0) {
        speedX1 = -1
        speedY1 = 0
    } else if (speedX2 == 0) {
        speedX2 = -1
        speedY2 = 0
    }
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (multiplayer.isPlayer1() && speedY1 == 0) {
        speedX1 = 0
        speedY1 = 1
    } else if (speedY2 == 0) {
        speedX2 = 0
        speedY2 = 1
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (multiplayer.isPlayer1() && speedX1 == 0) {
        speedX1 = 1
        speedY1 = 0
    } else if (speedX2 == 0) {
        speedX2 = 1
        speedY2 = 0
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (multiplayer.isPlayer1() && speedY1 == 0) {
        speedX1 = 0
        speedY1 = -1
    } else if (speedY2 == 0) {
        speedX2 = 0
        speedY2 = -1
    }
})
multiplayer.onConnected(function () {
    mySprite = sprites.create(img`
6 6 6 6 6 6 6 6 
6 8 8 8 8 8 8 6 
6 8 8 8 8 8 8 6 
6 8 8 8 8 8 8 6 
6 8 8 8 8 8 8 6 
6 8 8 8 8 8 8 6 
6 8 8 8 8 8 8 6 
6 6 6 6 6 6 6 6 
`, SpriteKind.P1)
    mySprite.setPosition(12, 12)
    snake1.push(mySprite)
    mySprite = sprites.create(img`
6 6 6 6 6 6 6 6 
6 8 8 8 8 8 8 6 
6 8 8 8 8 8 8 6 
6 8 8 8 8 8 8 6 
6 8 8 8 8 8 8 6 
6 8 8 8 8 8 8 6 
6 8 8 8 8 8 8 6 
6 6 6 6 6 6 6 6 
`, SpriteKind.P1)
    mySprite.setPosition(12, 20)
    snake1.push(mySprite)
    snake2 = []
    speedX1 = 0
    speedY1 = 1
    growth1 = 0
    mySprite = sprites.create(img`
5 5 5 5 5 5 5 5 
5 4 4 4 4 4 4 5 
5 4 4 4 4 4 4 5 
5 4 4 4 4 4 4 5 
5 4 4 4 4 4 4 5 
5 4 4 4 4 4 4 5 
5 4 4 4 4 4 4 5 
5 5 5 5 5 5 5 5 
`, SpriteKind.P2)
    mySprite.setPosition(148, 108)
    snake2.push(mySprite)
    mySprite = sprites.create(img`
5 5 5 5 5 5 5 5 
5 4 4 4 4 4 4 5 
5 4 4 4 4 4 4 5 
5 4 4 4 4 4 4 5 
5 4 4 4 4 4 4 5 
5 4 4 4 4 4 4 5 
5 4 4 4 4 4 4 5 
5 5 5 5 5 5 5 5 
`, SpriteKind.P2)
    mySprite.setPosition(148, 100)
    snake2.push(mySprite)
    speedX2 = 0
    speedY2 = -1
    growth2 = 0
    for (let index = 0; index < 4; index++) {
        spawnFood()
    }
    multiplayer.movePlayers(mySprite, mySprite, 0, 0)
})
let speedY2 = 0
let speedX2 = 0
let snake2: Sprite[] = []
let speedY1 = 0
let speedX1 = 0
let snake1: Sprite[] = []
let mySprite: Sprite = null
let growth2 = 0
let growth1 = 0
multiplayer.drawTitle("Snakes", "by ++", 7)
multiplayer.waitMessage("Waiting for connection", 7, 7)
multiplayer.sharedImgs([img`
6 6 6 6 6 6 6 6 
6 8 8 8 8 8 8 6 
6 8 8 8 8 8 8 6 
6 8 8 8 8 8 8 6 
6 8 8 8 8 8 8 6 
6 8 8 8 8 8 8 6 
6 8 8 8 8 8 8 6 
6 6 6 6 6 6 6 6 
`, img`
5 5 5 5 5 5 5 5 
5 4 4 4 4 4 4 5 
5 4 4 4 4 4 4 5 
5 4 4 4 4 4 4 5 
5 4 4 4 4 4 4 5 
5 4 4 4 4 4 4 5 
5 4 4 4 4 4 4 5 
5 5 5 5 5 5 5 5 
`, img`
c c c c c c c c 
c 7 7 7 7 7 7 c 
c 7 7 7 7 7 7 c 
c 7 7 7 7 7 7 c 
c 7 7 7 7 7 7 c 
c 7 7 7 7 7 7 c 
c 7 7 7 7 7 7 c 
c c c c c c c c 
`])
multiplayer.waitForConnection(true)
