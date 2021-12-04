function loadImage(src) {

    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src
        img.onload = () => resolve(img);
        img.onerror = () => reject('Image could not be loaded ' + src);
    });
}

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomElem(ary) {

    let randomElement = ary[Math.floor(Math.random() * ary.length)];
    return randomElement
}

function getTimeStamp() {
    return new Date().getTime();
}

function fetchJson(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => data);
}

function detectCollision(actor, obstacle) {

    // Extract 30 from the dino width is a simple method to give some more space
    if (actor.collision.x < obstacle.position.x + obstacle.size.x &&
        actor.collision.x + actor.size.x - 30 > obstacle.position.x &&
        actor.collision.y < obstacle.position.y + obstacle.size.y &&
        actor.size.y - 30 + actor.collision.y > obstacle.position.y) {
        return true;
    }
}

function isMobile () {
    let isMobileDevice = window.navigator.userAgent.toLowerCase().includes("mobi");
    return isMobileDevice
}

export { loadImage, getRandomNum, getTimeStamp, fetchJson, getRandomElem, detectCollision, isMobile }