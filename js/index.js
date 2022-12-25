

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')  //context
canvas.style.opacity = 1




let currentScene = 0


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






const banner6x3ImgRaw = new Image()
banner6x3ImgRaw.src = 'assets/Images/banner6x3.png'


const playerImgUp = new Image()
playerImgUp.src = 'assets/Images/playerUp.png'

const playerImgDown = new Image()
playerImgDown.src = 'assets/Images/playerDown.png'

const playerImgLeft = new Image()
playerImgLeft.src = 'assets/Images/playerLeft.png'

const playerImgRight = new Image()
playerImgRight.src = 'assets/Images/playerRight.png'




const collisionsMapTownOne = []
for (let i = 0; i < collisionsData.length; i+= 140) {
    collisionsMapTownOne.push(collisionsData.slice(i, 140 + i))
}

const doorsMapTownOne = []
for (let i = 0; i < doorsData.length; i+= 140) {
    doorsMapTownOne.push(doorsData.slice(i, 140 + i))
}



const boundaries = []
collisionsMapTownOne.forEach((row, i) => {
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
doorsMapTownOne.forEach((row, i) => {
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


const banner6x3 = new Sprite({
    position: {
        x: 100,
        y: 100
    },
    image: banner6x3ImgRaw
})

const textBodyBannerMessageHeading = [
    new Writing({
        text: '0',
        position: {
            x: 100,
            y: 100
        },
        textColor: 'white'
    }),

    new Writing({
        text: 'Its a-door-able',
        position: {
            x: 100,
            y: 100
        },
        textColor: '#2020ff',
        backgroundColor: 'lightgrey',
        size: 12,
        padding: 2
    }),

    new Writing({
        text: '2',
        position: {
            x: 100,
            y: 100
        },        
        textColor: 'white'
    }),
]





const textBodyBannerMessage = [
    new Writing({
        text: 'nan',
        position: {
            x: 100,
            y: 100
        },
        textColor: 'white'
    }),

    new Writing({
        text: 'Druecke "e" um Tueren zu oeffnen',
        position: {
            x: 100,
            y: 100
        },
        textColor: '#2020ff',
        backgroundColor: 'lightgrey',
        padding: 2,
        size: 10
    }),

    new Writing({
        text: 'test2',
        position: {
            x: 100,
            y: 100
        },
        textColor: 'white'
    }),
]


const bannerMessageHeading = 
    new Writing({
        text: 'Archievements',
        position: {
            x: 0,
            y: 0
        },
        textColor: '#ff2020',
        size: 12
    })


const bannerMessage = new BannerMessage({
    heading: bannerMessageHeading,
    textBodyHeading: textBodyBannerMessageHeading[0],
    textBody: textBodyBannerMessage[0],
    index: 1,
    banner: banner6x3
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


let events = []

let be = Date.now(),fps=0,info='';

let dtBeginBannerMsg = 0
let dtBannerMsg
let bannerLoop = false

let bannerIndex
let bannerDauer

let dtInFadeBannerMsg = 0

const msgBannerSpeed = 4.5
const bannerPosX = 20



let archievement = [
    false, 
    false,  //onDoor
]








// ----------------------------------------------------------------------------------------
// ------------------------------       ENDE MIT INIT       -------------------------------
// ----------------------------------------------------------------------------------------

let now
let before

let secondsRunning = 0
let minutesRunning = 0
let timeRunning = '0'


function loop() {
    
    
    now = Date.now()
    fps = Math.round(1000 / (now - before))
    
    
    window.requestAnimationFrame(loop)


    dt += 1
    
    
    render(currentScene)
    eventListening()
    texting()

    test()
    // console.log(secondsRunning + 'dt: ' + fps);

    if (fps > 99) {
        fps = 99
    }
    
    before = now

    setTimeRunning()
    setDocumentTitle()
    
}
loop();




// ----------------------------------------------------------------------------------------
// ------------------------------       FUNCTIONS       -----------------------------------
// ----------------------------------------------------------------------------------------

function setTimeRunning() {
    secondsRunning = Math.round(dt / 60)


    minutesRunning = Math.floor(secondsRunning / 60)

    if (secondsRunning%60 < 10) {
        timeRunning = minutesRunning + ':' + '0' + secondsRunning % 60 + 'min'
    } else {
        timeRunning = minutesRunning + ':' + secondsRunning % 60 + 'min'
    }
    

}

function setDocumentTitle() {
    document.title = 
        'Dabloons ' + 
        fps + 'FPS ' + 
        timeRunning
    
}

function render(currentScene) {

    test()

    if (currentScene === 0) {   // 0 - start

    } else if (currentScene === 1){     // 1 - town one
        townOneBg.draw()
        player.draw()
        fgTownOne.draw()
    } else {
        console.error('Scene: ' + currentScene + ' not found.');
        setCurrentScene(0) // to start
    }

    if (bannerLoop === true) {
        sendMessageBanner({index: bannerIndex, dauer: bannerDauer})
    }
}


function test() {
    
}

function texting() {
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

    if (onDoor != 0 && archievement[1] === false) {
        sendMessageBanner({index: 1, dauer: 10})
        console.log('Du hast das archievement "A-door-able!" freigeschalten');
        archievement[1] = true
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




function sendMessageBanner({index, dauer}) {

    bannerMessage.textBodyHeading = textBodyBannerMessageHeading[index]
    bannerMessage.textBody = textBodyBannerMessage[index]

    dtInFadeBannerMsg = (100 + bannerPosX) / msgBannerSpeed

    if (dtBeginBannerMsg === 0) {
        dtBeginBannerMsg = dt
        bannerLoop = true
        bannerIndex = index
        bannerDauer = dauer
    }

    dtBannerMsg = dt - dtBeginBannerMsg
    
    
    if (dtBannerMsg < dtInFadeBannerMsg) { 
        bannerMessage.position.y = dtBannerMsg * msgBannerSpeed - 100
    } 
    
    if (dtBannerMsg < dtInFadeBannerMsg + dauer * 60) {
        bannerMessage.draw()
    }    

    if (dtBannerMsg > dtInFadeBannerMsg + dauer * 60) {
        dtBeginBannerMsg === 0
        bannerLoop = false
    }
    
}