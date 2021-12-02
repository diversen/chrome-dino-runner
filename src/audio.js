class Audio {

    constructor() {
        // create web audio api context
        this.audioCtx = new(window.AudioContext || window.webkitAudioContext)();
    }

    beep() {
        // create Oscillator node
        const oscillator = this.audioCtx.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(600, this.audioCtx.currentTime);
        oscillator.connect(this.audioCtx.destination);
        oscillator.start();
        oscillator.stop(this.audioCtx.currentTime + 0.01)
    }

    endBeep() {
        // create Oscillator node
        const oscillator = this.audioCtx.createOscillator();
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(300, this.audioCtx.currentTime);
        oscillator.connect(this.audioCtx.destination);
        oscillator.start();
        oscillator.stop(this.audioCtx.currentTime + .05)
    }
}

export {Audio}