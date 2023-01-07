




const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')  //context
canvas.style.opacity = 1


console.log(quest);





let currentScene = 0
let nextScene = NaN

let teleported = 0
let itemPickedUp = 0

let nextFreeSlotFound

let dt = 0

// let blendingOut = false
// let blendedOut = false

canvas.width = 1024
canvas.height = 576


let talkingToQuester = false


coins = 100



const offset = {
    x: -713,
    y: -600
}

const offsetHouseOne = {
    x: 55,
    y: -400
}

const offsetHouseTwo = {
    x: -1193,
    y: -500
}





// lade bilder






// town one

const townOneImgRaw = new Image()
townOneImgRaw.src = 'assets/Images/townOne.png'

const fgTownOneImgRaw = new Image()
fgTownOneImgRaw.src = 'assets/Images/fgTownOne.png'


// house one

const houseOneImgRaw = new Image() 
houseOneImgRaw.src = 'assets/Images/houseOne.png'

const fgHouseOneImgRaw = new Image() 
fgHouseOneImgRaw.src = 'assets/Images/fgHouseOne.png'


// house two

const houseTwoImgRaw = new Image()
houseTwoImgRaw.src = 'assets/Images/houseTwo.png'

const fgHouseTwoImgRaw = new Image()
fgHouseTwoImgRaw.src = 'assets/Images/fgHouseTwo.png'





const dabloonImgRaw = new Image()
dabloonImgRaw.src = 'assets/Images/dabloon.png'

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


const questerImg = new Image()
questerImg.src = 'assets/Images/quester.png'



const mapImg = new Image()
mapImg.src = 'assets/Images/map_background.png'


// items

const itemImgs = {
    amethyst: new Image(),
    apple: new Image(),
    arrow: new Image(),
    bakedPotato: new Image(),
    bone: new Image(),
    
}

itemImgs.amethyst.src       =   'assets/Images/items/amethyst_shard.png'
itemImgs.apple.src          =   'assets/Images/items/apple.png'
itemImgs.arrow.src          =   'assets/Images/items/arrow.png'
itemImgs.bakedPotato.src    =   'assets/Images/items/baked_potato.png'
itemImgs.bone.src           =   'assets/Images/items/bone.png'


const itemInventoryImgs = {
    amethyst: new Image(),
    apple: new Image(),
    arrow: new Image(),
    bakedPotato: new Image(),
    bone: new Image(),
}

itemInventoryImgs.amethyst.src       =   'assets/Images/items/amethyst_shard.png'
itemInventoryImgs.apple.src          =   'assets/Images/items/apple.png'
itemInventoryImgs.arrow.src          =   'assets/Images/items/arrow.png'
itemInventoryImgs.bakedPotato.src    =   'assets/Images/items/baked_potato.png'
itemInventoryImgs.bone.src           =   'assets/Images/items/bone.png'


const tableInventory = {
    position: {x: 450, y: 250},
    itemSize: 0.8,
    mapSize: 0.2,
    mapImg: mapImg
}




const items = {

    none: {
        object: {
            position: {
                x: 0,
                y: 0
            }
        },
        
        inInventar: false,
        name: false
    },

    amethyst: {
        object: 
            new Sprite({
                position: {
                    x: 0,
                    y: -500
                },
                image: itemImgs.amethyst,
                size: 0.6
            }),

        tableInventory:           
            new Sprite({
                position: tableInventory.position,
                size: tableInventory.itemSize,
                image: itemInventoryImgs.amethyst
            }),

        inInventar: false,
        name: 'amethyst'
    },
    
    apple: {
        object: 
            new Sprite({
                position: {
                    x: 0,
                    y: -500
                },
                image: itemImgs.apple,
                size: 0.6
            }),

        tableInventory: 
            new Sprite({
                position: tableInventory.position,
                size: tableInventory.itemSize,
                image: itemInventoryImgs.apple
            }),
        

        inInventar: false,
        name: 'apple'
    },

    arrow: {
        object: 
            new Sprite({
                position: {
                    x: 0,
                    y: -500
                },
                image: itemImgs.arrow,
                size: 0.6
            }),

        tableInventory: 
            new Sprite({
                position: tableInventory.position,
                size: tableInventory.itemSize,
                image: itemInventoryImgs.arrow
            }),

        inInventar: false,
        name: 'arrow'
    },

    bakedPotato: {
        object: 
            new Sprite({
                position: {
                    x: 0,
                    y: -500
                },
                image: itemImgs.bakedPotato,
                size: 0.6
            }),

        tableInventory: 
            new Sprite({
                position: tableInventory.position,
                size: tableInventory.itemSize,
                image: itemInventoryImgs.bakedPotato
            }),
        inInventar: false,
        name: 'baked Potato'
    },

    bone: {
        object:
            new Sprite({
                position: {
                    x: 0,
                    y: -500
                },
                image: itemImgs.bone,
                size: 0.6
            }),

        tableInventory: 
            new Sprite({
                position: tableInventory.position,
                size: tableInventory.itemSize,
                image: itemInventoryImgs.bone
            }),
        
        inInventar: false,
        name: 'bone'
    }

}







// mapping collisions etc


// town one

const collisionsMapTownOne = []
for (let i = 0; i < collisionsData_townOne.length; i+= 140) {
    collisionsMapTownOne.push(collisionsData_townOne.slice(i, 140 + i))
}

const doorsMapTownOne = []
for (let i = 0; i < doorsData_townOne.length; i+= 140) {
    doorsMapTownOne.push(doorsData_townOne.slice(i, 140 + i))
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
                    }, 
                    pixel: {
                        x: 24,
                        y: 24
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
                    pixel: {
                        x: 24,
                        y: 24
                    },
                    index: symbol
                })
            )
        }
    })
})



// house one town one

const collisionsMapHouseOne = []
for (let i = 0; i < collisionsData_houseOne.length; i+= 42) {
    collisionsMapHouseOne.push(collisionsData_houseOne.slice(i, 42 + i))
}

const doorsMapHouseOne = []
for (let i = 0; i < usablesData_houseOne.length; i+= 42) {
    doorsMapHouseOne.push(usablesData_houseOne.slice(i, 42 + i))
}


const boundariesHouseOne = []
collisionsMapHouseOne.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1) {
        boundariesHouseOne.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offsetHouseOne.x,  
                        y: i * Boundary.height + offsetHouseOne.y
                    },
                    pixel: {
                        x: 24,
                        y: 24
                    }
                })
            )
        }
    })
})

const doorsHouseOne = []
doorsMapHouseOne.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1) {
            doorsHouseOne.push(
                new Door({
                    position: {
                        x: j * Door.width + offsetHouseOne.x,  
                        y: i * Door.height + offsetHouseOne.y
                    },
                    pixel: {
                        x: 24,
                        y: 24
                    },
                    index: 1
                })
            )
        }
    })
})



// house two town one - toms café

const collisionsMapHouseTwo = []
for (let i = 0; i < collisionsData_houseTwo.length; i+= 80) {
    collisionsMapHouseTwo.push(collisionsData_houseTwo.slice(i, 80 + i))
}


const usablesMapHouseTwo = []
for (let i = 0; i < usablesData_houseTwo.length; i+= 80) {
    usablesMapHouseTwo.push(usablesData_houseTwo.slice(i, 80 + i))
}




const boundariesHouseTwo = []
collisionsMapHouseTwo.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1) {
        boundariesHouseTwo.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offsetHouseTwo.x,  
                        y: i * Boundary.height + offsetHouseTwo.y
                    },
                    pixel: {
                        x: 24,
                        y: 24
                    }
                })
            )
        }
    })
})

const doorsHouseTwo = []
usablesMapHouseTwo.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1) {
            doorsHouseTwo.push(
                new Door({
                    position: {
                        x: j * Door.width + offsetHouseTwo.x,  
                        y: i * Door.height + offsetHouseTwo.y
                    },
                    pixel: {
                        x: 24,
                        y: 24
                    },
                    index: 1
                })
            )
        }
    })
})

const usablesHouseTwo = []
usablesMapHouseTwo.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol != 0) {
            usablesHouseTwo.push(
                new Usable({
                    position: {
                        x: j * Usable.width + offsetHouseTwo.x,  
                        y: i * Usable.height + offsetHouseTwo.y
                    },
                    pixel: {
                        x: 24,
                        y: 24
                    },
                    index: symbol
                })
            )
        }
    })
})


// Sprites erstellen


// scenes


// town one

const townOneBg = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: townOneImgRaw
})

const fgTownOne = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: fgTownOneImgRaw
})


// house one town one

const houseOne = new Sprite({
    position: {
        x: offsetHouseOne.x,
        y: offsetHouseOne.y
    },
    image: houseOneImgRaw,
    size: 0.75
})

const fgHouseOne = new Sprite({
    position: {
        x: offsetHouseOne.x,
        y: offsetHouseOne.y
    },
    image: fgHouseOneImgRaw,
    size: 0.75
})


// house two town one - toms café

const houseTwo = new Sprite({
    position: {
        x: offsetHouseTwo.x,
        y: offsetHouseTwo.y
    },
    image: houseTwoImgRaw,
    size: 0.75
})

const fgHouseTwo = new Sprite({
    position: {
        x: offsetHouseTwo.x,
        y: offsetHouseTwo.y
    },
    image: fgHouseTwoImgRaw,
    size: 0.75
})



// player

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


const quester = new Sprite({
    position: {
        x: offsetHouseOne.x + 880,
        y: offsetHouseOne.y + 160
    },
    image: questerImg,
    frames: {
        max: 4
    },
    size: 2
})





// sonstiges


const dabloonImg = new Sprite({
    size: 0.6,
    position: {
        x: canvas.width / 2 - 250,
        y: 40
    },
    image: dabloonImgRaw,
})



// banner


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
        text: NaN,
        position: {
            x: 100,
            y: 100
        },
        textColor: 'white'
    }),

    new Writing({
        text: 'Press "e" to open doors',
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



// scene zero

const startTextInfo = new Writing({
    text: 'Press "Space" to Start the game',
    position: {
        x: canvas.width / 2 - 200,
        y: canvas.height - 40
    }
})




const map = new Sprite({
    position: tableInventory.position,
    image: mapImg,
    size: tableInventory.mapSize
})




// ende Sprites



// gui

const coinsString = new Writing ({
    text: 'coins: ' + NaN,
    position: {
        x: canvas.width - 200,
        y: canvas.height - 37
    },
    textColor: '#ac673d',
    size: '20'
})

const indexInventarNumber = {
    zero: new Writing({
        text: '0',
        position: {
            x: 0 * 75 + 75,
            y: 550
        },
        textColor: 'white'
    }),

    one: new Writing({
        text: '1',
        position: {
            x: 1 * 75 + 75,
            y: 550
        },
        textColor: 'white'
    }),

    two: new Writing({
        text: '2',
        position: {
            x: 2 * 75 + 75,
            y: 550
        },
        textColor: 'white'
    }),

    three: new Writing({
        text: '3',
        position: {
            x: 3 * 75 + 75,
            y: 550
        },
        textColor: 'white'
    }),

    four: new Writing({
        text: '4',
        position: {
            x: 4 * 75 + 75,
            y: 550
        },
        textColor: 'white'
    }),

    five: new Writing({
        text: '5',
        position: {
            x: 5 * 75 + 75,
            y: 550
        },
        textColor: 'white'
    }),

    six: new Writing({
        text: '6',
        position: {
            x: 6 * 75 + 75,
            y: 550
        },
        textColor: 'white'
    }),

    seven: new Writing({
        text: '7',
        position: {
            x: 7 * 75 + 75,
            y: 550
        },
        textColor: 'white'
    }),

    aight: new Writing({
        text: '8',
        position: {
            x: 8 * 75 + 75,
            y: 550
        },
        textColor: 'white'
    }),

    nine: new Writing({
        text: '9',
        position: {
            x: 9 * 75 + 75,
            y: 550
        },
        textColor: 'white'
    }),
}

const gui = new Gui(indexInventarNumber)








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
    f: {
        pressed: false
    },
    o: {
        pressed: false
    },
    l: {
        pressed: false
    },
    space: {
        pressed: false
    },
    esc: {
        pressed: false
    }
}

let lastKey
let key
window.addEventListener('keydown', (e) => {
    //console.log(e);
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

        case 'f' :
            keys.f.pressed = true
            lastKey = 'f'
            break

        case 'o' :
            keys.o.pressed = true
            lastKey = 'o'
            break   
            
        case 'l' :
            keys.l.pressed = true
            lastKey = 'l'
            break     
            
        case ' ' :
            keys.space.pressed = true
            lastKey = 'space'
            break

        case 'Escape' :
            keys.esc.pressed = true
            lastKey = 'esc'
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

        case 'f' :
            keys.f.pressed = false
            break
        
        case 'o' :
            keys.o.pressed = false
            break   
            
        case 'l' :
            keys.l.pressed = false
            break 
            
        case ' ' :
            keys.space.pressed = false
            break

        case 'Escape' :
            keys.esc.pressed = false
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

let now
let before

let secondsRunning = 0
let minutesRunning = 0
let timeRunning = '0'


let onDoor = 0
let onDoorHouseOne = 0
let onDoorHouseTwo = 0

let onUsableHouseTwo = 0



// lists

const movablesTownOne = [      // elemente die sich durch moving nicht mitbewegen
    townOneBg, 
    fgTownOne,
    ...boundaries, 
    ...doors
]        

const movablesHouseOne = [
    houseOne,
    fgHouseOne,
    quester,
    ...boundariesHouseOne,
    ...doorsHouseOne,
]

const movablesHouseTwo = [
    houseTwo,
    fgHouseTwo,
    ...boundariesHouseTwo,
    ...doorsHouseTwo,
    ...usablesHouseTwo
]

let archievement = [
    false, 
    false,  //onDoor
]


const doorsDestiny = [
    NaN,
    2,  // => destiny Scene, // door index 1, Map 1
    3,  // d2 m1
    4  // d3 m1
]

const doorsDestinyHouseOne = [
    NaN,
    1,  // d1
]

const doorsDestinyHouseTwo = [
    NaN,
    1,  // d1
]



let itemLocationsHouseTwo = [
    items.none,    
    items.none,    //  1   door
    items.none,    //  2   Spieltisch
    items.none,    //  3   Tisch groß rechts
    items.none,    //  4   Tisch groß mitte
    items.none,    //  5   Tisch klein unten rechts
    items.none,    //  6   Tisch klein ul
    items.none,    //  7   Tisch klein mr
    items.none,    //  8   Tisch klein ml
    items.none,    //  9   Tisch klein ol
    items.none,    
    items.none,    //  11  Tisch klein or
    items.none,    //  12  Fenster
    items.none,    //  13  box küche
    items.none,    //  14  schrank
    items.none,    //  15  washbecken/spiegel
    items.none,    //  16  küchenbrett, zutaten
    items.none,    //  17  kochplatte
    items.none,    //  18  kühlschrank
    items.none,    //  19  Teigschrank
    items.none,    //  20  sofa
    items.none,    //  21  drehstuhl
]



let invSlots = [    // invSlot belegt?
    false,  // 0
    false,  // 1
    false,  // 2
    false,  // 3
    false,  // 4
    false,  // 5
    false,  // 6
    false,  // 7
    false,  // 8
    false,  // 9
]





itemLocationsHouseTwo[2] = items.apple
itemLocationsHouseTwo[15] = items.amethyst


// ----------------------------------------------------------------------------------------
// ------------------------------       ENDE MIT INIT       -------------------------------
// ----------------------------------------------------------------------------------------


// currentScene = 99
currentScene = 2

function loop() {
    
    
    
    now = Date.now()
    fps = Math.round(1000 / (now - before))
    
    
    window.requestAnimationFrame(loop)


    dt += 1
    
    updateInvSlots()
    
    render(currentScene)
    eventListening(currentScene)
    moving(currentScene)
    // console.log(secondsRunning + 'dt: ' + fps);


    if (teleported != 0) {
        teleported = teleported - 1
    }

    if (itemPickedUp === 30) {
        itemLocationsHouseTwo[onUsableHouseTwo] = items.none
    }

    if (itemPickedUp != 0) {
        itemPickedUp = itemPickedUp - 1
    }

    if (talkingToQuester) {
        
    }

    //console.log(teleported);

    if (fps > 99) {
        fps = 99
    }
    
    before = now

    setTimeRunning()
    setDocumentTitle(currentScene)



    // boundaries.forEach(boundary => {boundary.draw()})
    // doors.forEach(door => {door.draw()})

    // doorsHouseOne.forEach(door => {door.draw()})
    // boundariesHouseOne.forEach(boundary => {boundary.draw()})

    // doorsHouseTwo.forEach(door => {door.draw()})
    // boundariesHouseTwo.forEach(boundary => {boundary.draw()})

    // console.log('onDoor: ' + onDoor +' - onDoorHouseOne: ' + onDoorHouseOne);
}
loop();




// ----------------------------------------------------------------------------------------
// ------------------------------       FUNCTIONS       -----------------------------------
// ----------------------------------------------------------------------------------------

// render currentscene + gamelogic

function render(currentScene) {

    switch (currentScene) {

        case 0: // start
            
            renderBg('#F5B041')
            dabloonImg.draw()
            startTextInfo.write() 
            break


        case 1: // townOne
            
            player.size = 0.75
            townOneBg.draw()
            player.draw()
            fgTownOne.draw()

            gui.draw({coins: coins})
            
            break

        case 2: // houseOne
            player.size = 1
            houseOne.draw()
            quester.draw()
            player.draw()
            fgHouseOne.draw()

            gui.draw({coins: coins})
            

            break

        case 3: // houseTwo - Toms Café
            player.size = 1
            houseTwo.draw()
            player.draw()
            fgHouseTwo.draw()

            gui.draw({coins: coins})
            
            // showTableInventory({item: items.apple})
            
            
            break


        case 99: // testScene
            c.fillStyle = 'lightblue'
            c.fillRect(0, 0, canvas.width, canvas.height)
            gui.draw({coins: coins})

            

            break


        default: 
            console.error('Scene: ' + currentScene + ' was not found. - On render')
            setCurrentScene(0)
    }



    if (bannerLoop === true) {
        sendMessageBanner({index: bannerIndex, dauer: bannerDauer})
    }
}


function renderBg(color) {
    c.fillStyle = color
    c.fillRect(0, 0, canvas.width, canvas.height)
}


function setTimeRunning() {
    secondsRunning = Math.round(dt / 60)

    minutesRunning = Math.floor(secondsRunning / 60)

    if (secondsRunning % 60 < 10) {
        timeRunning = minutesRunning + ':' + '0' + secondsRunning % 60 + 'min'
    } else {
        timeRunning = minutesRunning + ':' + secondsRunning % 60 + 'min'
    }
}

function setDocumentTitle(currentScene) {
    document.title = 
        'Dabl00ns ' + 
        fps + 'FPS ' + 
        timeRunning //+
        //' Scn: ' + currentScene
}










function eventListening(currentScene) {

    if (rectengularCollisionPlayers({
        player1: player,
        player2: quester
    })) {
        talkingToQuester = true
    } else {
        talkingToQuester = false
    }

    if (onUsableHouseTwo != 0) {
        showTableInventory({item: itemLocationsHouseTwo[onUsableHouseTwo]})
    }

    if ((keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) && currentScene === 3) {
        for (let i = 0; i < usablesHouseTwo.length; i++) {
            const usable = usablesHouseTwo[i]
            if (
                rectengularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...usable,
                        position: {
                            x: usable.position.x,
                            y: usable.position.y 
                        }
                    }
                })
            ) {
                onUsableHouseTwo = usable.index
                break
            } else {
                onUsableHouseTwo = 0
            }
        }
    }

    if (keys.f.pressed && currentScene === 3 ) {
        for (let i = 0; i < usablesHouseTwo.length; i++) {
            const usable = usablesHouseTwo[i]
            if (
                rectengularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...usable,
                        position: {
                            x: usable.position.x,
                            y: usable.position.y 
                        }
                    }
                })
            ) {
                onUsableHouseTwo = usable.index
                touchUsable({
                    index: usable.index,
                    scene: 3
                })
                break
            }
        }
    }

    if (keys.esc.pressed) {
        setCurrentScene(0)
    }     

    if (currentScene === 0 && keys.space.pressed) {
        setCurrentScene(1)
    } 


    if (currentScene === 1 && (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed)) {
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

    if (currentScene === 2 && (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed)) {
        for (let i = 0; i < doorsHouseOne.length; i++) {
            const doorHouse = doorsHouseOne[i]
            if (
                rectengularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...doorHouse,
                        position: {
                            x: doorHouse.position.x,
                            y: doorHouse.position.y 
                        }
                    }
                })
            ) {
                onDoorHouseOne = doorHouse.index
            }
        }
    }

    if (currentScene === 3 && (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed)) {
        for (let i = 0; i < doorsHouseTwo.length; i++) {
            const doorHouseTwo = doorsHouseTwo[i]
            if (
                rectengularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...doorHouseTwo,
                        position: {
                            x: doorHouseTwo.position.x,
                            y: doorHouseTwo.position.y 
                        }
                    }
                })
            ) {
                onDoorHouseTwo = doorHouseTwo.index
            }
        }
    }

    switch (currentScene) {
        case 1:
            if (keys.e.pressed && onDoor!= 0 && teleported === 0) {
                setCurrentScene(doorsDestiny[onDoor])
            
                teleported = 20
            }
            
            break

        case 2:
            if (keys.e.pressed && onDoorHouseOne != 0 && teleported === 0) {
                setCurrentScene(doorsDestinyHouseOne[onDoorHouseOne])
                teleported = 20
            }
            break

        case 3:
            if (keys.e.pressed && onDoorHouseTwo != 0 && teleported === 0) {
                setCurrentScene(doorsDestinyHouseTwo[onDoorHouseTwo])
                teleported = 20
                break
            }
    
        default:
            break;
    }

    
    



    // archievements

    if (onDoor != 0 && archievement[1] === false) {
        sendMessageBanner({index: 1, dauer: 10})
        console.log('Du hast das archievement "A-door-able!" freigeschalten');
        archievement[1] = true
    }

    

    
}


function moving(currentScene) {


    const playerStep = 3
    let moving = true
    player.moving = false

    

    switch (currentScene) {

        case 1:

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
        
                if (moving) movablesTownOne.forEach(movable => {movable.position.y += playerStep}) 
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
        
                if (moving) movablesTownOne.forEach(movable => {movable.position.x += playerStep})
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
        
                if (moving) movablesTownOne.forEach(movable => {movable.position.y -= playerStep})
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
        
                if (moving) movablesTownOne.forEach(movable => {movable.position.x -= playerStep})
                

            }
            break




        case 2:
            
            if (keys.w.pressed && lastKey === 'w') {
                player.moving = true
                player.image = player.sprites.up
        
                for (let i = 0; i < boundariesHouseOne.length; i++) {
                    const boundary = boundariesHouseOne[i]
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
        
                if (moving) movablesHouseOne.forEach(movable => {movable.position.y += playerStep}) 
            }    
        
        
            
            else if (keys.a.pressed && lastKey === 'a') {
                player.moving = true
                player.image = player.sprites.left
        
                for (let i = 0; i < boundariesHouseOne.length; i++) {
                    const boundary = boundariesHouseOne[i]
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
                
        
                if (moving) movablesHouseOne.forEach(movable => {movable.position.x += playerStep})
            }
        
        
        
            else if (keys.s.pressed && lastKey === 's') {
                player.moving = true
                player.image = player.sprites.down
        
                for (let i = 0; i < boundariesHouseOne.length; i++) {
                    const boundary = boundariesHouseOne[i]
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
        
                if (moving) movablesHouseOne.forEach(movable => {movable.position.y -= playerStep})
            }
        
        
            else if (keys.d.pressed && lastKey === 'd') {
                player.moving = true
                player.image = player.sprites.right
        
                for (let i = 0; i < boundariesHouseOne.length; i++) {
                    const boundary = boundariesHouseOne[i]
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
        
                if (moving) movablesHouseOne.forEach(movable => {movable.position.x -= playerStep})
                
            }
            break


        case 3:
            if (keys.w.pressed && lastKey === 'w') {
                player.moving = true
                player.image = player.sprites.up
        
                for (let i = 0; i < boundariesHouseTwo.length; i++) {
                    const boundary = boundariesHouseTwo[i]
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
        
                if (moving) movablesHouseTwo.forEach(movable => {movable.position.y += playerStep})
            }    
        
        
            
            else if (keys.a.pressed && lastKey === 'a') {
                player.moving = true
                player.image = player.sprites.left
        
                for (let i = 0; i < boundariesHouseTwo.length; i++) {
                    const boundary = boundariesHouseTwo[i]
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
                
        
                if (moving) movablesHouseTwo.forEach(movable => {movable.position.x += playerStep})
            }
        
        
        
            else if (keys.s.pressed && lastKey === 's') {
                player.moving = true
                player.image = player.sprites.down
        
                for (let i = 0; i < boundariesHouseTwo.length; i++) {
                    const boundary = boundariesHouseTwo[i]
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
        
                if (moving) movablesHouseTwo.forEach(movable => {movable.position.y -= playerStep})
            }
        
        
            else if (keys.d.pressed && lastKey === 'd') {
                player.moving = true
                player.image = player.sprites.right
        
                for (let i = 0; i < boundariesHouseTwo.length; i++) {
                    const boundary = boundariesHouseTwo[i]
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
        
                if (moving) movablesHouseTwo.forEach(movable => {movable.position.x -= playerStep})
            }
            break



        default:
            break

    }
}




// function blendOut({blendSpeed}) {

//     if (canvas.style.opacity != 0) {
//         canvas.style.opacity -= blendSpeed
//     } else {
//         blendingOut = false
//         blendedOut = true
//     }
//     //console.log(dt + 'dt: ' + canvas.style.opacity);

    
// }

// other functions



function rectengularCollision({rectangle1, rectangle2}) {
    return( 
        rectangle1.position.x + rectangle1.width * rectangle1.size  >= rectangle2.position.x                            &&
        rectangle1.position.x                                       <= rectangle2.position.x + rectangle2.width         &&
        rectangle1.position.y + rectangle1.height * rectangle1.size >= rectangle2.position.y                            &&    
        rectangle1.position.y                                       <= rectangle2.position.y + rectangle2.height
    )
}

function rectengularCollisionPlayers({player1, player2}) {
    return( 
        player1.position.x + player1.width * player1.size           >= player2.position.x                                   &&
        player1.position.x                                          <= player2.position.x + player2.width * player2.size    &&
        player1.position.y + player1.height * player1.size          >= player2.position.y                                   &&    
        player1.position.y                                          <= player2.position.y + player2.height * player2.size
    )
}



function updateInvSlots() {
    clearInvSlots()
    for (const [item, inInventory] of Object.entries(items)) {
        //console.log(item + ': ' + inInventory.inInventar);
        invSlots[inInventory.inInventar] = item
    }    
}

function clearInvSlots() {
    invSlots = [ 
        false,  // 0
        false,  // 1
        false,  // 2
        false,  // 3
        false,  // 4
        false,  // 5
        false,  // 6
        false,  // 7
        false,  // 8
        false,  // 9
    ]
}


function touchUsable({index, scene}) {
    // console.log('index: ' + index + ', scene: ' + scene);

    switch (scene) {
        case 3:
            if (itemPickedUp === 0) {
                setInvSlot({
                    slot: getNextFreeSlot(), 
                    item: itemLocationsHouseTwo[index]
                })
                itemPickedUp = 30
                
            }
            
            break;
    
        default:
            console.error('No valid scene - at touchUsable');
            break;
    }
}







function renderTiles(currentScene) {
    switch (currentScene) {
        case 1: 
            boundaries.forEach(boundary => {
                boundary.draw()
            })   

            doors.forEach(door => {
                door.draw()
            })
            break

        case 2:
            boundariesHouseOne.forEach(boundary => {
                boundary.draw()
            })   

            doorsHouseOne.forEach(door => {
                door.draw()
            })
            break

        case 3:
            boundariesHouseTwo.forEach(boundary => {
                boundary.draw()
            })   
    
            usablesHouseTwo.forEach(door => {
                door.draw()
            })
            break
    }    
}




function setCurrentScene(newScene) {
    c.clearRect(0, 0, canvas.width, canvas.height)

    currentScene = newScene
    return 'new Scene is Scene: ' + newScene
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

function setInvSlot({slot, item}) {

    switch (slot) {
        case 'remove': 
            item.object.position = Gui.inventarPosition.none
            item.inInventar = false
            return item.name + ': removed from inventory'

        case 0:
            item.object.position = Gui.inventarPosition.zero
            item.inInventar = 0
            break

        case 1:
            item.object.position = Gui.inventarPosition.one
            item.inInventar = 1
            break;

        case 2:
            item.object.position = Gui.inventarPosition.two
            item.inInventar = 2
            break;

        case 3:
            item.object.position = Gui.inventarPosition.three
            item.inInventar = 3
            break;

        case 4:
            item.object.position = Gui.inventarPosition.four
            item.inInventar = 4
            break;

        case 5:
            item.object.position = Gui.inventarPosition.five
            item.inInventar = 5
            break;

        case 6:
            item.object.position = Gui.inventarPosition.six
            item.inInventar = 6
            break;

        case 7:
            item.object.position = Gui.inventarPosition.seven
            item.inInventar = 7
            break;

        case 8:
            item.object.position = Gui.inventarPosition.aight
            item.inInventar = 8
            break;

        case 9:
            item.object.position = Gui.inventarPosition.nine
            item.inInventar = 9
            break;

        case 'none':
            break

        default:
            console.error('wrong inventory slot: ' + slot);
            break;
    }

    return item.name + ': added on slot ' + slot

    
}


function getNextFreeSlot() {
    slot = 0
    for (slot = 0; slot < 10; slot++) {
        if (invSlots[slot] === false) {
            return slot
        }
    }
    return false
}




function showTableInventory({item}) {

    if (item === items.none) {
        map.draw()
    } else {
        map.draw()
        item.tableInventory.draw()
    }
}