class Gui {


    static inventarPosition = {
        zero:   { x: 0 * 75 + 50, y: 529 },
        one:    { x: 1 * 75 + 50, y: 529 },
        two:    { x: 2 * 75 + 50, y: 529 },
        three:  { x: 3 * 75 + 50, y: 529 },
        four:   { x: 4 * 75 + 50, y: 529 },
        five:   { x: 5 * 75 + 50, y: 529 },
        six:    { x: 6 * 75 + 50, y: 529 },
        seven:  { x: 7 * 75 + 50, y: 529 },
        aight:  { x: 8 * 75 + 50, y: 529 },
        nine:   { x: 9 * 75 + 50, y: 529 },
        none:   { x: 0,           y: -500 }
    }
    

    constructor(indexInventarNumber) {   
        this.indexInventarNumber = indexInventarNumber
    }


    draw({
        coins
    }){


        c.fillStyle = '#593C23'
        c.fillRect(
            40,
            canvas.height - 45,
            canvas.width - 80,
            35
            )

        c.fillStyle = '#0D0D0D'
        c.fillRect(
            44,
            canvas.height - 40,
            canvas.width - 88,
            25
            )

        coinsString.text = 'Dabloons: ' + coins
        coinsString.write()

        

        

        for (let i = 0; i < 10; i++) {
            c.fillStyle = '#593C23'
            c.fillRect(
                i * 75 + 50,
                529, 
                64 * 0.6, 
                64 * 0.6
            )  
        }

        this.indexInventarNumber.zero.write()
        this.indexInventarNumber.one.write()
        this.indexInventarNumber.two.write()
        this.indexInventarNumber.three.write()
        this.indexInventarNumber.four.write()
        this.indexInventarNumber.five.write()
        this.indexInventarNumber.six.write()
        this.indexInventarNumber.seven.write()
        this.indexInventarNumber.aight.write()
        this.indexInventarNumber.nine.write()


        items.amethyst.object.draw()
        items.apple.object.draw()
        items.arrow.object.draw()
        items.bakedPotato.object.draw()
        items.bone.object.draw()
        
    }
}