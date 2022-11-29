const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')  //context

canvas.width = 1024
canvas.height = 576

c.fillStyle = 'white'

c.fillRect(0, 0, canvas.width, canvas.height)

const bgImg = new Image()
bgImg.src = './assets/images/townOne.png'

const playerImg = new Image();
playerImg.src = './assets/images/playerDown.png'

playerImg.onload = () => {
    c.drawImage(
        bgImg, 
        -740, 
        -600
    )

    c.drawImage(
        playerImg, 
        0,
        0,
        playerImg.width / 4,
        playerImg.height,
        canvas.width / 2 - (playerImg.width / 4) / 2, 
        canvas.height / 2 - playerImg.height / 4,
        playerImg.width / 4,
        playerImg.height
    )
}