import { Canvas } from '/src/canvas.js'
import { getRandomNum, getRandomElem } from '/src/utils.js'
import { Vector } from '/src/vector.js'

class Obstacle extends Canvas {

    constructor(img, x, y) {

        super()

        this.img = img
        this.remove = false;
        this.size = Vector.fromImg(img)
        this.position = new Vector(x, y)
    }

    draw() {
        this.ctx.save();
        this.ctx.drawImage(this.img, this.position.x, this.position.y);
        this.drawRect(this.position.x, this.position.y, this.size.x, this.size.y)
        this.ctx.restore()
    }

    update(speed, frameCounter) {
        this.draw()
        this.position.x -= speed
    }

    isVisible() {
        return this.position.x + this.img.width > 0
    }
}

class BirdObstacle extends Canvas {

    constructor(imgs, x, y) {

        super()

        this.imgs = imgs
        this.remove = false;

        this.size = Vector.fromImg(imgs.Bird2)
        this.position = new Vector(x, y)
    }

    draw(frameCounter) {

        this.ctx.save();

        if (frameCounter % 8 == 0) {
            this.up = !this.up
        }

        if (this.up) {
            let Bird1 = this.imgs.Bird1;
            this.ctx.drawImage(Bird1, this.position.x, this.position.y);
            this.drawRect(this.position.x, this.position.y, this.size.x, this.size.y)

        } else {
            let Bird2 = this.imgs.Bird2;
            this.ctx.drawImage(Bird2, this.position.x, this.position.y);
            this.drawRect(this.position.x, this.position.y, this.size.x, this.size.y)
        }

        this.ctx.restore()
    }

    update(speed, frameCounter) {
        this.draw(frameCounter)
        this.position.x -= speed
    }

    isVisible() {
        return this.position.x + this.imgs.Bird1.width > 0
    }
}

class Obstacles extends Canvas {

    constructor(imgs) {
        super()
        this.imgs = imgs
        this.obstacles = []
        this.maxNum = 3;
        this.keys = ['LargeCactus1', 'LargeCactus2', 'LargeCactus3', 'SmallCactus1', 'SmallCactus2', 'SmallCactus3']
        this.keys2 = ['LargeCactus1', 'LargeCactus2', 'LargeCactus3', 'SmallCactus1', 'SmallCactus2', 'SmallCactus3', 'Bird', 'Bird']
        this.useBirds = false
    }

    getRandomObstacle() {

        if (this.useBirds) {
            return getRandomElem(this.keys2)
        }

        return getRandomElem(this.keys)

    }

    add() {

        let randomElement = this.getRandomObstacle()
        if (randomElement == 'Bird') {
            let obstacle = new BirdObstacle(this.imgs, this.width, getRandomElem([240, 200, 175]) - this.imgs.Bird2.height)
            this.obstacles.push(obstacle)
        } else {
            let img = this.imgs[randomElement]
            let obstacle = new Obstacle(img, this.width, 270 - img.height)
            this.obstacles.push(obstacle)
        }

    }

    init() {
        this.add()
    }

    update(speed, frameCounter) {

        this.obstacles = this.obstacles.filter(obstacle => obstacle.isVisible())
        if (this.obstacles.length === 0) {
            this.add()
        }

        const numObstacles = this.obstacles.length;
        for (let i = 0; i < numObstacles; i++) {
            this.obstacles[i].update(speed, frameCounter)
        }

        const lastObstacle = this.obstacles[numObstacles - 1];
        const distance = this.canvas.width - lastObstacle.position.x

        if (distance > 400 && numObstacles < this.maxNum) {
            if (getRandomNum(0, 50) == 0) {
                this.add()
            }
        }
    }
}

export { Obstacles }