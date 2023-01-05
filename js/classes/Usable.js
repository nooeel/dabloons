class Usable {
    static width = 24
    static height = 24
    constructor({position, index, pixel}) {
        this.width = pixel.x
        this.height = pixel.y
        this.position = position
        this.index = index
    }

    draw() {
        c.fillStyle = 'rgba(255, 0, 0, 0)'
        // c.fillStyle = 'yellow'  //sichtbare doors
        c.fillRect(this.position.x, this.position.y, this.width, this.width)
    }
}