export class GameObject {
    constructor(p5, x, y, width, height) {
        this.p5 = p5;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isDestroyed = false;
    }

    init() {}

    draw() {}

    update() {}
}