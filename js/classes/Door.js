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