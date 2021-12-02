class Canvas {

    constructor() {
        this.canvas = document.getElementById('game-canvas')
        this.ctx = this.canvas.getContext('2d')
        this.width = this.canvas.width
        this.height = this.canvas.height
    }

    drawRect(x, y, w, h) {
        // Debug 
        return;
        this.ctx.beginPath();
        this.ctx.rect(x, y, w, h);
        this.ctx.stroke();
        
    }
    
}

export {Canvas}