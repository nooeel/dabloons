

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')  //context
canvas.style.opacity = 1

let currentScene = 1


let dt = 0
let blendingOut = false
let loading = false

canvas.width = 1024
canvas.height = 576



const offset = {
    x: -713,
    y: -600
}



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




const collisionsMap = []
for (let i = 0; i < collisionsData.length; i+= 140) {
    collisionsMap.push(collisionsData.slice(i, 140 + i))
}

const doorsMap = []
for (let i = 0; i < doorsData.length; i+= 140) {
    doorsMap.push(doorsData.slice(i, 140 + i))
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


const doors = []
doorsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1, 2, 3) {
            doors.push(
                new Door({
                    position: {
                        x: j * Door.width + offset.x ,  
                        y: i * Door.height + offset.y 
                    },
                    index: symbol
                })
            )
        }
    })
})








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






const movables = [townOneBg, fgTownOne, ...boundaries, ...doors]



let onDoor = 0


// keyListener

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
    },
    e: {
        pressed: false
    },
    o: {
        pressed: false
    },
    l: {
        pressed: false
    },
}

let lastKey
let key
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

        case 'e' :
            keys.e.pressed = true
            lastKey = 'e'
            break

        case 'o' :
            keys.o.pressed = true
            lastKey = 'o'
            break   
            
        case 'l' :
            keys.l.pressed = true
            lastKey = 'l'
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

        case 'e' :
            keys.e.pressed = false
            break
        
        case 'o' :
            keys.o.pressed = false
            lastKey = 'o'
            break   
            
        case 'l' :
            keys.l.pressed = false
            lastKey = 'l'
            break   
    }
})



const testText = new Writing({
    text: 'test',
    position: {
        x: canvas.width - canvas.width/4,
        y: 20
    },
    textColor: 'white',
    backgroundColor: 'lightgrey'
});

let events = []


// ----------------------------------------------------------------------------------------
// ------------------------------       ENDE MIT INIT       -------------------------------
// ----------------------------------------------------------------------------------------




function loop() {
    window.requestAnimationFrame(loop)
    
    
    render(currentScene)
    eventListening()
    texting()

    
    //console.log(dt + 'dt: ' + loading);

    dt += 1
}
loop();




// ----------------------------------------------------------------------------------------
// ------------------------------       FUNCTIONS       -----------------------------------
// ----------------------------------------------------------------------------------------


function render(currentScene) {

    if (currentScene === 0) {   // 0 - start

    } else if (currentScene === 1){     // 1 - town one
        townOneBg.draw()
        player.draw()
        fgTownOne.draw()
    } else {
        console.error('Scene: ' + currentScene + ' not found.');
        setCurrentScene(0) // to start
    }
}


function texting() {
    testTexting()
}


function testTexting() {
    testText.write()
}


function eventListening() {

    if (blendingOut === true) {
        blendOut({blendSpeed: 0.05})
    }
    
    

    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
        for (let i = 0; i < doors.length; i++) {
            const door = doors[i]
            if (
                rectengularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...door,
                        position: {
                            x: door.position.x,
                            y: door.position.y 
                        }
                    }
                })
            ) {
                onDoor = door.index
                break
            }
        }
    }

    if (keys.e.pressed && onDoor != 0) {
        console.log("door " + onDoor);
        blendingOut = true

    }


    

    moving()
}



function moving() {


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
                    rectangle2: {
                        ...boundary, 
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + playerStep
                        }
                    }
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




function blendOut({blendSpeed}) {

    if (canvas.style.opacity != 0) {
        canvas.style.opacity -= blendSpeed
    } else {
        loading = true
    }
    //console.log(dt + 'dt: ' + canvas.style.opacity);

    
}


function rectengularCollision({rectangle1, rectangle2}) {
    return( 
        rectangle1.position.x + rectangle1.width * rectangle1.size  >= rectangle2.position.x                            &&
        rectangle1.position.x                                       <= rectangle2.position.x + rectangle2.width        &&
        rectangle1.position.y + rectangle1.height * rectangle1.size >= rectangle2.position.y                            &&    
        rectangle1.position.y                                       <= rectangle2.position.y + rectangle2.height
    )
}






function renderTiles() {
    boundaries.forEach(boundary => {
        boundary.draw()
    })   

    doors.forEach(door => {
        door.draw()
    })
}




function setCurrentScene(newScene) {
    currentScene = newScene
}