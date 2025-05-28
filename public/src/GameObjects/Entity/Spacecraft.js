import GameObject from '../GameObject.js';
export default class Spacecraft extends GameObject {
    constructor(p5, handlerAsset, inputManager, x, y, width, height) {
        super(p5, handlerAsset, inputManager, x, y, width, height);

        this.asset = handlerAsset.get('spacecraft_player');
    }

    init() {}

    draw() {
        if(this.asset) {
            this.p5.image(this.asset, this.x, this.y, this.width, this.height);
        }
    }

    update() {
        // Controles
        if(this.inputManager.isKeyPressed('moveLeft')) this.x += 5;
        if(this.inputManager.isKeyPressed('moveRight')) this.x -= 5;
        if(this.inputManager.isKeyPressed('moveUp')) this.y -= 5;
        if(this.inputManager.isKeyPressed('moveDown')) this.y += 5;
    }
}