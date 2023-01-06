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

        this.textBodyHeading.position.x = this.position.x + 12
        this.textBodyHeading.position.y = this.position.y + 20
        this.textBodyHeading.write()

        this.textBody.position.x = this.position.x + 12
        this.textBody.position.y = this.position.y + 35
        this.textBody.write()
    }
}