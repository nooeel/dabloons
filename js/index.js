

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')  //context

const development = true

canvas.width = 1024
canvas.height = 576



const offset = {
    x: -713,
    y: -600
}

const collisionsMap = []

for (let i = 0; i < collisions.length; i+= 140) {
    collisionsMap.push(collisions.slice(i, 140 + i))
}



const boundaries = []

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1) {
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x ,  
                        y: i * Boundary.height + offset.y 
                    }
                })
            )
        }
    })
})



const townOneImgRaw = new Image()
townOneImgRaw.src = 'assets/Images/townOne.png'

const fgTownOneImgRaw = new Image()
fgTownOneImgRaw.src = 'assets/Images/fgTownOne.png'


const playerImgUp = new Image()
playerImgUp.src = 'assets/Images/playerUp.png'

const playerImgDown = new Image()
playerImgDown.src = 'assets/Images/playerDown.png'

const playerImgLeft = new Image()
playerImgLeft.src = 'assets/Images/playerLeft.png'

const playerImgRight = new Image()
playerImgRight.src = 'assets/Images/playerRight.png'



const townOneBg = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: townOneImgRaw
})


const player = new Sprite({
    position: {
        x: canvas.width / 2 - (playerImgDown.width / 4) / 2,
        y:canvas.height / 2 - playerImgDown.height / 4
    },
    image: playerImgDown,
    frames: {
        max: 4
    },
    sprites: {
        up: playerImgUp,
        down: playerImgDown,
        left: playerImgLeft,
        right: playerImgRight
    },
    size: 0.75
})

const fgTownOne = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: fgTownOneImgRaw
})



const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}


const movables = [townOneBg, fgTownOne, ...boundaries]

function rectengularCollision({rectangle1, rectangle2}) {
    return( 
        rectangle1.position.x + rectangle1.width * rectangle1.size  >= rectangle2.position.x + 5                        &&
        rectangle1.position.x                                       <= rectangle2.position.x + rectangle2.width - 5     &&
        rectangle1.position.y + rectangle1.height * rectangle1.size >= rectangle2.position.y                            &&    
        rectangle1.position.y                                       <= rectangle2.position.y + rectangle2.height / 2
    )
}



function loop() {
    window.requestAnimationFrame(loop)
    render()
    gameLogic()
}
loop();



function render() {
    townOneBg.draw()

    showBoundary()

    player.draw()
    fgTownOne.draw()  
}


function showBoundary() {
    boundaries.forEach(boundary => {
        boundary.draw()
    })   
}



function moving() {

    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
        
    }



    const playerStep = 3
    let moving = true
    player.moving = false


    if (keys.w.pressed && lastKey === 'w') {
        player.moving = true
        player.image = player.sprites.up

        for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i]
            if (
                rectengularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y + playerStep
                    }}
                })
            ) {
                moving = false
                break
            }
        }      
        if (moving) movables.forEach(movable => {movable.position.y += playerStep}) 
    }    


    
    else if (keys.a.pressed && lastKey === 'a') {
        player.moving = true
        player.image = player.sprites.left

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectengularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x + playerStep,
                        y: boundary.position.y 
                    }}
                })
            ) {
                moving = false
                break
            }
        }
        if (moving) movables.forEach(movable => {movable.position.x += playerStep})
    }



    else if (keys.s.pressed && lastKey === 's') {
        player.moving = true
        player.image = player.sprites.down

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectengularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y - playerStep
                    }}
                })
            ) {
                moving = false
                break
            }
        }
        if (moving) movables.forEach(movable => {movable.position.y -= playerStep})
    }



    else if (keys.d.pressed && lastKey === 'd') {
        player.moving = true
        player.image = player.sprites.right

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectengularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x - playerStep,
                        y: boundary.position.y 
                    }}
                })
            ) {
                moving = false
                break
            }
        }
        if (moving) movables.forEach(movable => {movable.position.x -= playerStep})
    }
}




function gameLogic() {
    
    moving()
}



// event listener

let lastKey
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w' :
            keys.w.pressed = true
            lastKey = 'w'
            break
        
        case 'a' :
            keys.a.pressed = true
            lastKey = 'a'
            break
        
        case 's' :
            keys.s.pressed = true
            lastKey = 's'
            break
        
        case 'd' :
            keys.d.pressed = true
            lastKey = 'd'
            break
    }
})


window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w' :
            keys.w.pressed = false
            break
        
        case 'a' :
            keys.a.pressed = false
            break
        
        case 's' :
            keys.s.pressed = false
            break
        
        case 'd' :
            keys.d.pressed = false
            break
    }
})