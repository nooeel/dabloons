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

        coinsString.text = 'coins: ' + coins
        coinsString.write()

        

        

        for (let i = 0; i < 10; i++) {
            c.fillStyle = '#593C23'
            c.fillRect(
                i * 75 + 50,
                529, 
                64 * 0.6, 
                64 * 0.6
            )      
            
            switch (i) {
                case 0: 
                    this.indexInventarNumber.zero.write()
                    break;

                case 1: 
                    this.indexInventarNumber.one.write()
                    break;

                case 2: 
                    this.indexInventarNumber.two.write()
                    break;

                case 3: 
                    this.indexInventarNumber.three.write()
                    break;

                case 4: 
                    this.indexInventarNumber.four.write()
                    break;

                case 5: 
                    this.indexInventarNumber.five.write()
                    break;

                case 6: 
                    this.indexInventarNumber.six.write()
                    break;

                case 7: 
                    this.indexInventarNumber.seven.write()
                    break;

                case 8: 
                    this.indexInventarNumber.aight.write()
                    break;

                case 9: 
                    this.indexInventarNumber.nine.write()
                    break;

                
                default:
                    console.error('wrong switch - at Gui indexInvNumber: ' + i);
                    break;
            }
            
        }
        
        
    }
}