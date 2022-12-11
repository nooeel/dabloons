class Sprite {
    constructor({position, velocity, image, frames = {max: 1}, sprites, size = 1 }) {
        this.position = position
        this.image = image
        this.frames = {...frames, value: 0, elapsed: 0}

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }

        this.moving = false
        this.sprites = sprites
        this.size = size
    }

    draw() {
        c.drawImage(
            this.image, 
            this.frames.value * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max * this.size,
            this.image.height * this.size
        )

        if (!this.moving) return
        
        if (this.frames.max > 1) this.frames.elapsed++
        
        if (this.frames.elapsed % 10 === 0) {
            if (this.frames.value < this.frames.max - 1) this.frames.value++
            else this.frames.value = 0
        }
    }
}


class Boundary {
    static width = 24
    static height = 24
    constructor({position}) {
        this.position = position
        this.height = 24
        this.width = 24
    }

    draw() {
        //c.fillStyle = 'rgba(255, 0, 0, 0)'
        c.fillStyle = 'rgba(255, 0, 0, 0.2)'  //sichtbare boundary
        c.fillRect(this.position.x, this.position.y, this.width, this.width)
    }
}