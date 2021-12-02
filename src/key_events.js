class KeyEvents {

    constructor () {
        this.pressed = {};
        this.duration = 0;

        window.onkeydown = (event) => {
            if (this.pressed[event.which]) {
                return;
            }

            this.pressed[event.code] = event.timeStamp;
        };

        window.onkeyup = (event) => {
            
            if (!this.pressed[event.code]) {
                return;
            }

            delete this.pressed[event.code];

        };
    }

    isPressed(code) {
        if (this.pressed[code]) {
            return true;
        }
        return false;
    }    
}

export {KeyEvents}