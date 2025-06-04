export default class GameObject {
    constructor(name, p5, handlerAsset, inputManager, handlerGameObject, x, y, width, height) {
        this.name = name;
        this.p5 = p5;
        this.handlerAsset = handlerAsset;
        this.inputManager = inputManager;
        this.handlerGameObject = handlerGameObject;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isDestroyed = false;
    }

    init() {}

    draw() {}

    update() {}

    collision() {}

    intersects(other) {
        return this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.y + this.height > other.y;
    }
}