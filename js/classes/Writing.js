class Writing {
    constructor ({
        text, 
        font = 'Arial', 
        size = '30',
        position = { x: 0, y: 0 }, 
        padding = 0, 
        textBaseline = 'top',
        textColor = 'black',
        backgroundColor = 'rgba(0, 0, 0, 0)',
        borderColor = 'rgba(0, 0, 0, 0)'
    }) {
        this.text = text
        this.font = size + 'px ' + font
        this.position = position
        this.padding = padding
        this.textBaseline = textBaseline
        this.textColor = textColor
        this.backgroundColor = backgroundColor
        this.borderColor = borderColor
    }

    write() {
        c.font = this.font;
        c.textBaseline = this.textBaseline;
        c.fillStyle = this.backgroundColor;
        
        var width = c.measureText(this.text).width;
        c.fillRect(this.position.x, this.position.y, width + this.padding, parseInt(this.font, 10) + this.padding);
        
        c.lineWidth = 2;
        c.strokeStyle = this.borderColor;
        c.strokeRect(this.position.x, this.position.y, width + this.padding, parseInt(this.font, 10) + this.padding);
        
        c.fillStyle = this.textColor;
        c.fillText(this.text, this.position.x + this.padding / 2, this.position.y + this.padding / 2);
    }

}