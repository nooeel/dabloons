class TableInventory {

    static mapSize = 0.2
    static position = {x: 450, y: 260}
    static size = 0.6

    constructor({}) {


        
    }

    draw() {
        
        apple.draw()
        map.position = TableInventory.position
        map.draw()
    }
}