class Boundary {
    static width = 24
    static height = 24
    constructor({position, pixel}) {
        this.position = position
        this.width = pixel.x
        this.height = pixel.y
    }

    draw() {
        c.fillStyle = 'rgba(255, 0, 0, 0)'
        c.fillStyle = 'rgba(255, 0, 0, 0.2)'  //sichtbare boundary
        c.fillRect(this.position.x, this.position.y, this.width, this.width)
    }
}