

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
         if (keys.w.pressed && lastKey === 'w') townImg.position.y += 5
    else if (keys.a.pressed && lastKey === 'a') townImg.position.x += 5
    else if (keys.s.pressed && lastKey === 's') townImg.position.y -= 5
    else if (keys.d.pressed && lastKey === 'd') townImg.position.x -= 5
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