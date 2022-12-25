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