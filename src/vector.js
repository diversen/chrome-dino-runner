class Vector {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(vec) {
        this.x += vec.x
        this.y += vec.y
        return this
    }

    sub(vec) {
        this.x -= vec.x
        this.y -= vec.y
        return this
    }

    scale(factor){
        this.x *= factor
        this.y *= factor
        return this 
    }

    copy() {
        return new Vector(this.x, this.y)
    }

    static fromImg(img) {
        return new Vector(img.width, img.height)

    }
}

export {Vector}