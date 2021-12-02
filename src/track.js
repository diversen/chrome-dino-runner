import {Canvas} from '/src/canvas.js'

class Track extends Canvas {

    constructor(img, x, y) {
        super()
        this.img = img
        this.imgWidth = img.width + 2
        this.imgHalfWidth = this.imgWidth / 2
        this.offSet = this.imgHalfWidth
        this.x = 0
    }

    update(speed, frameCounter) {
        
        this.ctx.save();

        this.x += speed
        
        if (this.x > this.imgWidth) {
            this.x = 0;
            this.offSet = this.imgHalfWidth;    
        }

        this.ctx.drawImage(this.img, this.x, 0, this.imgHalfWidth, 28, 0, 250, this.imgHalfWidth, 28);
        if (this.x > this.imgHalfWidth) {
            this.offSet -= speed
            this.ctx.drawImage(this.img, 0, 0, this.imgHalfWidth, 28, this.offSet, 250, this.imgHalfWidth, 28);
        }

        this.ctx.restore()
    }

    init() {
        this.ctx.drawImage(this.img, this.x, 0, this.imgHalfWidth, 28, 0, 250, this.imgHalfWidth, 28);
    }
}

export {Track}
