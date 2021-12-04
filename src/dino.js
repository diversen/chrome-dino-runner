import { Canvas } from '/src/canvas.js'
import { KeyEvents } from '/src/key_events.js'
import { Vector } from '/src/vector.js'
import { isMobile } from '/src/utils.js'

class Dino extends Canvas {

    constructor(imgs) {
        super()

        this.imgs = imgs
        this.state = 'init' // init, run, jump, duck
        this.keyEvents = new KeyEvents();
        
        this.debug = 1
        this.jumpScaler = 1.30
        
        if (isMobile()) {
            this.jumpScaler *= 1.2
        }

        this.setVectors()
        
    }

    init() {

        this.size = Vector.fromImg(this.imgs.DinoStart)
        this.ctx.save();
        this.ctx.drawImage(this.imgs.DinoStart, this.position.x, 180);
        this.drawRect(this.position.x, this.position.y, this.size.x, this.size.y)
        this.ctx.restore()

    }

    setVectors() {
        
        this.initPosition = new Vector(32, 184)
        this.position = new Vector(32, 184)
        this.gravity = new Vector(0, 2.9)

        // Junmp speed up. Negative bacause that beings us closer to the top of the screen
        this.jumpSpeed = new Vector(0, -24 * this.jumpScaler) 
        this.jumpSpeedHold = 1.03 // Scalar

    }

    jump() {

        this.state = 'jump'
        this.collision = this.position.copy()
        this.size = Vector.fromImg(this.imgs.DinoRun1)

        if (this.keyEvents.isPressed('Space')) {
            this.jumpSpeed.scale(this.jumpSpeedHold)
        }

        this.jumpSpeed.add(this.gravity)
        this.position.add(this.jumpSpeed)

        if (this.position.y >= this.initPosition.y) {
            this.setVectors()
            this.state = 'run'
        }

        this.ctx.save();
        this.ctx.drawImage(this.imgs.DinoJump, this.position.x, this.position.y);
        this.drawRect(this.position.x, this.position.y, this.size.x, this.size.y);
        this.ctx.restore()

    }

    duck() {


        this.ctx.save();

        // Translate as duck dino image is another size height
        this.ctx.translate(0, 35)

        this.collision = this.position.copy()
        this.collision.y += 35

        this.size = Vector.fromImg(this.imgs.DinoDuck2)

        if (this.frameCounter % 8 == 0) {
            this.up = !this.up
        }

        if (this.up) {
            this.ctx.drawImage(this.imgs.DinoDuck2, this.position.x + 2, this.position.y);
            this.drawRect(this.position.x, this.position.y, this.size.x, this.size.y);

        } else {
            this.ctx.drawImage(this.imgs.DinoDuck1, this.position.x, this.position.y);
            this.drawRect(this.position.x, this.position.y, this.size.x, this.size.y)
        }

        this.ctx.restore()
    }

    run() {

        this.size = Vector.fromImg(this.imgs.DinoRun1)
        this.collision = this.position.copy()

        if (this.keyEvents.isPressed('ArrowDown')) {
            this.duck()
            return
        }

        this.ctx.save();
        if (this.frameCounter % 8 == 0) {
            this.up = !this.up
        }

        if (this.up) {
            this.ctx.drawImage(this.imgs.DinoRun2, this.position.x, this.position.y);
            this.drawRect(this.position.x, this.position.y, this.size.x, this.size.y)
        } else {

            this.ctx.drawImage(this.imgs.DinoRun1, this.position.x, this.position.y);
            this.drawRect(this.position.x, this.position.y, this.size.x, this.size.y)
        }

        this.ctx.restore()
    }

    dead() {

        this.size = Vector.fromImg(this.imgs.DinoDead)
        this.ctx.save();
        this.ctx.drawImage(this.imgs.DinoDead, this.position.x, this.position.y - 2);
        this.drawRect(this.position.x, this.position.y, this.size.x, this.size.y)
        this.ctx.restore()
    }

    draw() {

        if (this.state == 'dead') {
            this.dead();
        }

        if (this.state == 'jump') {
            this.jump()
        }

        if (this.state == 'run') {
            this.run()
        }

        if (this.state == 'duck') {
            this.duck()
        }
    }

    update(speed, frameCounter) {
        this.speed = speed
        this.frameCounter = frameCounter;
        this.draw()
    }
}

export { Dino }
