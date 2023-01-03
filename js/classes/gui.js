class Gui {

    

    constructor() {        
    }

    draw({coins}) {
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

        
    }
}