import { loadImage, getTimeStamp, fetchJson, detectCollision } from '/src/utils.js'
import { Canvas } from '/src/canvas.js'
import { Clouds } from '/src/clouds.js'
import { Track } from '/src/track.js'
import { Dino } from '/src/dino.js'
import { Obstacles } from '/src/obstacle.js'
import { Audio } from '/src/audio.js'

class Game extends Canvas {

    constructor() {
        super()

        this.audio = new Audio()
        this.addEvents()
        this.state = 'init'
        this.init()

    }

    async init() {

        // this.ctx.clearRect(0, 0, this.width, this.height);
        let json = await fetchJson('assets.json')
        await this.loadAssets(json);
        this.initAssets()
    }

    initAssets() {

        this.beginTime = getTimeStamp();
        this.time = 0;
        this.speed = 3;
        this.maxSpeed = 4
        this.frameCounter = 0

        this.clouds = new Clouds(this.assets.Cloud)
        this.clouds.init()

        this.track = new Track(this.assets.Track)
        this.track.init()

        this.dino = new Dino(this.assets);
        this.dino.init()

        this.obstacles = new Obstacles(this.assets)
        this.obstacles.init()
    }

    keydownEvent = (event) => {

        if (event.code == 'Space') {

            if (this.state == 'playing' && this.dino.state !== 'jump') {
                this.dino.jump()
                this.audio.beep()
            }

            if (this.state == 'init') {
                this.loop();
                this.state = 'playing'
                this.dino.jump()
                this.audio.beep()
            }
        }
    }

    keyupEvent = (event) => {

        if (event.code == 'Space') {

            if (this.state == 'dead') {

                console.log('dead and restart ')
                this.initAssets();
                this.loop()
                this.state = 'playing'
                this.dino.jump()
                this.audio.beep()

            }
        }
    }

    clickEvent = (event) => {
        document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
        document.dispatchEvent(new KeyboardEvent('keyup', { code: 'Space' }));
    }

    async addEvents(wait) {
        if (wait) {
            await new Promise(resolve => setTimeout(resolve, wait));
        }

        document.addEventListener('keydown', this.keydownEvent)
        document.addEventListener('keyup', this.keyupEvent)
        document.addEventListener('click', this.clickEvent)
    }

    removeEvents() {
        document.removeEventListener('keydown', this.keydownEvent)
        document.removeEventListener('keyup', this.keyupEvent)
        document.removeEventListener('click', this.clickEvent)

    }

    updateSpeed() {

        const now = getTimeStamp();
        this.time = (now - this.beginTime) / 1000;

        if (this.speed < this.maxSpeed) {
            this.speed = this.speed + this.time / 10000
        }
    }

    calculateScore(speed, frameCounter) {
        // https://math.stackexchange.com/questions/1781331/math-formula-to-calculate-game-score
        let score = (10 / 9) * ((speed - 3) + (10 - frameCounter) / 11);
        score = Math.abs(Math.floor(score));
        return score
    }

    drawScore(speed, frameCounter) {

        if (frameCounter % 10 === 0) {
            let score = this.calculateScore(speed, frameCounter);
            this.score = score
        }

        this.ctx.fillStyle = '#f7f7f7';
        this.ctx.font = '32px serif';

        let scoreTxt = String(this.score).padStart(5, '0')
        this.ctx.strokeText(scoreTxt, 1100, 50);

        let hiScore = localStorage.getItem('hiscore')
        if (hiScore) {
            hiScore = hiScore.padStart(5, '0')
            this.ctx.strokeText('HI ' + hiScore, 950, 50);
        }
    }

    saveScore() {
        let hiScore = parseInt(localStorage.getItem('hiscore'))
        if (!hiScore) {
            localStorage.setItem('hiscore', this.score)
        }

        if (hiScore < this.score) {
            localStorage.setItem('hiscore', this.score)
        }
    }

    loop() {

        this.frame = window.requestAnimationFrame(async () => {
            let running = true
            if (this.state == 'playing') {

                this.updateSpeed();
                this.ctx.clearRect(0, 0, this.width, this.height);

                let obstacle = this.obstacles.obstacles[0]
                let dino = this.dino;

                if (detectCollision(dino, obstacle)) {
                    running = false
                    this.gameOver()

                }

                this.drawScore(this.speed, this.frameCounter)

                this.clouds.update(1, this.frameCounter)
                this.track.update(this.speed * 4, this.frameCounter)
                this.dino.update(this.speed, this.frameCounter)
                this.obstacles.update(this.speed * 4, this.frameCounter)

                if (this.score > 100) {
                    this.obstacles.useBirds = true
                }
            }

            if (running) {
                this.frameCounter += 1
                this.loop()
            }
        });
    }

    gameOver() {

        this.stop()
        this.audio.endBeep()
        this.state = 'dead'
        this.dino.state = 'dead'
        this.saveScore()
        this.removeEvents()
        
        this.ctx.drawImage(this.assets.GameOver, 400, 50);
        this.ctx.drawImage(this.assets.Reset, 555, 100);

        this.addEvents(2000)        

    }

    stop() {
        window.cancelAnimationFrame(this.frame)
    }

    async loadAssets(json) {

        this.assets = {}

        try {

            for (const elem of json) {
                this.assets[elem.shortName] = await loadImage(elem.path)
            }

        } catch (err) {
            console.log(err)
        }
    }
}

export { Game };
