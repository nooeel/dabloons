

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')  //context

canvas.width = 1024
canvas.height = 576

c.fillStyle = 'white'

c.fillRect(0, 0, canvas.width, canvas.height)

const townImage = new Image()
townImage.src = './assets/images/townOne.png'

const playerImage = new Image();
playerImage.src = './assets/images/playerDown.png'



class Sprite {
    constructor({position, velocity, image}) {
        this.position = position
        this.image = image
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}


const townImg = new Sprite({
    position: {
        x: -740,
        y: -600
    },
    image: townImage
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




function loop() {
    window.requestAnimationFrame(loop)
    render()
    gameLogic()
}
loop();





function render() {
    
    townImg.draw()

    c.drawImage(
        playerImage, 
        0,
        0,
        playerImage.width / 4,
        playerImage.height,
        canvas.width / 2 - (playerImage.width / 4) / 2, 
        canvas.height / 2 - playerImage.height / 4,
        playerImage.width / 4,
        playerImage.height
    )
}



function gameLogic() {
    if (keys.w.pressed) {
        townImg.position.y += 20
    }
    if (keys.a.pressed) {
        townImg.position.x += 20
    }
    if (keys.s.pressed) {
        townImg.position.y -= 20
    }
    if (keys.d.pressed) {
        townImg.position.x -= 20
    }
}



// event listener

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w' :
            keys.w.pressed = true
            break
        
        case 'a' :
            keys.a.pressed = true
            break
        
        case 's' :
            keys.s.pressed = true
            break
        
        case 'd' :
            keys.d.pressed = true
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