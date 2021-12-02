import {getRandomNum} from '/src/utils.js'
import {Canvas} from '/src/canvas.js'
import {Vector} from '/src/vector.js'

class Cloud extends Canvas {

    constructor(img, x, y) {
        super()

        this.img = img
        this.remove = false;
        this.position = new Vector(x, y)
        
    }

    draw() {
        this.ctx.save();
        this.ctx.drawImage(this.img, this.position.x, this.position.y);
        this.ctx.restore()
    }

    update(speed) {
        this.position.x -= speed
        this.draw()
        
    }

    isVisible() {
        return this.position.x + this.img.width > 0
    }
}

class Clouds extends Canvas {

    constructor(img) {
        super()
        this.img = img
        this.clouds = []
        this.maxClouds = 6;
    }

    add() {
        this.clouds.push(new Cloud(this.img, this.width, getRandomNum(30, 70)))
    }

    init() {
        this.add()
    }

    
    update(speed) {
        
        this.clouds = this.clouds.filter(cloud => cloud.isVisible())
        if (this.clouds.length === 0) {
            this.add()
        }

        const numClouds = this.clouds.length;
        
        for (let i = 0; i < numClouds; i++) {
            this.clouds[i].update(speed)
        }

        const lastCloud = this.clouds[numClouds - 1];
        const distance = this.canvas.width - lastCloud.position.x
        
        if (distance > 100 && numClouds < this.maxClouds) {

            if (getRandomNum(0, 100) == 0) { 
                this.add()
            }
        }
    }  
}

export {Clouds}
