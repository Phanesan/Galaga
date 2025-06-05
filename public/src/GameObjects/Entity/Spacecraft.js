import GameObject from '../GameObject.js';
export default class Spacecraft extends GameObject {
    constructor(name, p5, handlerAsset, inputManager, handlerGameObject, x, y, width, height) {
        super(name, p5, handlerAsset, inputManager, handlerGameObject, x, y, width, height);

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

        // Bordes
        if(this.x < 0) this.x = 0;
        if(this.x + this.width > this.p5.width) this.x = this.p5.width - this.width;
        if(this.y < 0) this.y = 0;
        if(this.y + this.height > this.p5.height) this.y = this.p5.height - this.height;

        this.handlerGameObject.getHandler().forEach(object => {
            if(object !== this && this.intersects(object)) {
                this.collision(object);
            }
        })
    }

    collision(object) {
        switch(object.name) {
            
        }
    }
}