

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')  //context

const development = false



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




class Boundary {
    static width = 48
    static height = 48
    constructor({position}) {
        this.position = position
        this.height = 48
        this.width = 48
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.width)
    }
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

const testBoundary = new Boundary({
    position: {
        x: 400,
        y: 400
    }
})



const townOneImgRaw = new Image()
townOneImgRaw.src = 'assets/Images/townOne.png'

const playerImgRaw = new Image();
playerImgRaw.src = 'assets/Images/playerDown.png'



class Sprite {
    constructor({position, velocity, image, frames = {max: 1} }) {
        this.position = position
        this.image = image
        this.frames = frames

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }

        
    }

    draw() {
        c.drawImage(
            this.image, 
            0,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        )
    }
}









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


const movables = [townOneBg, testBoundary]

function rectengularCollision({rectangle1, rectangle2}) {
    return( 
        player.position.x + player.width >= testBoundary.position.x &&
        player.position.x <= testBoundary.position.x + testBoundary.width &&
        player.position.y + player.height >= testBoundary.position.y &&    
        player.position.y <= testBoundary.position.y + testBoundary.height
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

    if (development === true) {
        showBoundary()
    }

    testBoundary.draw()

    player.draw()
    
    
}


function showBoundary() {
    boundaries.forEach(boundary => {
        boundary.draw()
    })   
}





function moving() {
         if (keys.w.pressed && lastKey === 'w') movables.forEach(movable => {movable.position.y += 5}) 
    else if (keys.a.pressed && lastKey === 'a') movables.forEach(movable => {movable.position.x += 5})
    else if (keys.s.pressed && lastKey === 's') movables.forEach(movable => {movable.position.y -= 5})
    else if (keys.d.pressed && lastKey === 'd') movables.forEach(movable => {movable.position.x -= 5})
}




function gameLogic() {
    
    if (
        rectengularCollision({
            rectangle1: player,
            rectangle2: testBoundary
        })
    ) {
        console.log('collide');
    }

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