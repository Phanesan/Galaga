export default class GameObject {
    constructor(p5, handlerAsset, inputManager, x, y, width, height) {
        this.p5 = p5;
        this.handlerAsset = handlerAsset;
        this.inputManager = inputManager;
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