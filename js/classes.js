class Sprite {
    constructor({position, image, frames = {max: 1}, sprites, size = 1 }) {
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
        this.width = Boundary.width
        this.height = Boundary.height
    }

    draw() {
        c.fillStyle = 'rgba(255, 0, 0, 0)'
        //c.fillStyle = 'rgba(255, 0, 0, 0.2)'  //sichtbare boundary
        c.fillRect(this.position.x, this.position.y, this.width, this.width)
    }
}

class Door {
    static width = 24
    static height = 24
    constructor({position, index}) {
        this.width = Door.width
        this.height = Door.height
        this.position = position
        this.index = index
    }

    draw() {
        c.fillStyle = 'rgba(255, 0, 0, 0)'
        //c.fillStyle = 'rgba(0, 255, 255, 0.5)'  //sichtbare doors
        c.fillRect(this.position.x, this.position.y, this.width, this.width)
    }
}



class Writing {
    constructor ({
        text, 
        font = 'Arial', 
        size = '30',
        position = { x: 0, y: 0 }, 
        padding = 0, 
        textBaseline = 'top',
        textColor = 'black',
        backgroundColor = 'rgba(0, 0, 0, 0)',
        borderColor = 'rgba(0, 0, 0, 0)'
    }) {
        this.text = text
        this.font = size + 'px ' + font
        this.position = position
        this.padding = padding
        this.textBaseline = textBaseline
        this.textColor = textColor
        this.backgroundColor = backgroundColor
        this.borderColor = borderColor
    }

    write() {
        c.font = this.font;
        c.textBaseline = this.textBaseline;
        c.fillStyle = this.backgroundColor;
        
        var width = c.measureText(this.text).width;
        c.fillRect(this.position.x, this.position.y, width + this.padding, parseInt(this.font, 10) + this.padding);
        
        c.lineWidth = 2;
        c.strokeStyle = this.borderColor;
        c.strokeRect(this.position.x, this.position.y, width + this.padding, parseInt(this.font, 10) + this.padding);
        
        c.fillStyle = this.textColor;
        c.fillText(this.text, this.position.x + this.padding / 2, this.position.y + this.padding / 2);
    }

}



class BannerMessage {
    constructor({
        heading,
        textBodyHeading,
        textBody, 
        banner = banner6x3,
        position = {
            x: canvas.width - canvas.width / 4,
            y: 100
        },
        
    }) {
        
        this.heading = heading
        this.textBodyHeading = textBodyHeading
        this.textBody = textBody
        this.banner = banner
        this.position = position
        
        
        
    }

    draw() {

        this.banner.position = this.position
        this.banner.draw()

        this.heading.position.x = this.position.x + 57
        this.heading.position.y = this.position.y + 3
        this.heading.write()

        this.textBodyHeading.position.x = this.position.x + 15
        this.textBodyHeading.position.y = this.position.y + 20
        this.textBodyHeading.write()

        this.textBody.position.x = this.position.x + 15
        this.textBody.position.y = this.position.y + 35
        this.textBody.write()
    }

    

}


    


    
