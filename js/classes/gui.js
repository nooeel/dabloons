class Gui {
    constructor({location = bottom, canvasDimension, c}) {
        this.location = location
        this.canvasDimension = canvasDimension
        
        this.c = c

        


        
    }

    draw() {
        this.drawBg()
    }

    drawBg() {
        this.c.fillStyle = '#0D0D0D'
        this.c.fillRect(
            0,
            this.canvasDimension.height - 200,
            this.canvasDimension.width,
            this.canvasDimension.height
        )
    }
}