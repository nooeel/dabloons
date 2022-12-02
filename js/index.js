

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

for (let i = 0; i < collisions.length; i+= 70) {
    collisionsMap.push(collisions.slice(i, 70 + i))
}



const boundaries = []

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) {
            console.log("h");
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,  
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

const playerImgRaw = new Image()
playerImgRaw.src = 'assets/Images/playerDown.png'




const townOneBg = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: townOneImgRaw
})


const player = new Sprite({
    position: {
        x: canvas.width / 2 - (playerImgRaw.width / 4) / 2,
        y:canvas.height / 2 - playerImgRaw.height / 4
    },
    image: playerImgRaw,
    frames: {
        max: 4
    }
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
        rectangle1.position.x + rectangle1.width  >= rectangle2.position.x                      &&
        rectangle1.position.x                     <= rectangle2.position.x + rectangle2.width   &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y                      &&    
        rectangle1.position.y                     <= rectangle2.position.y + rectangle2.height
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
    const playerStep = 3
    let moving = true

    if (keys.w.pressed && lastKey === 'w') {
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
                console.log('collide');
                moving = false
                break
            }
        }      
        if (moving) movables.forEach(movable => {movable.position.y += playerStep}) 
    }    
    
    else if (keys.a.pressed && lastKey === 'a') {

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
                console.log('collide');
                moving = false
                break
            }
        }
        if (moving) movables.forEach(movable => {movable.position.x += playerStep})
    }

    else if (keys.s.pressed && lastKey === 's') {

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
                console.log('collide');
                moving = false
                break
            }
        }
        if (moving) movables.forEach(movable => {movable.position.y -= playerStep})
    }

    else if (keys.d.pressed && lastKey === 'd') {

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
                console.log('collide');
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