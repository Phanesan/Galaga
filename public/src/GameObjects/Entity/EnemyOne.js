import GameObject from '../GameObject.js';
export default class EnemyOne extends GameObject {
    constructor(name, p5, handlerAsset, inputManager, handlerGameObject, x, y, width, height) {
        super(name, p5, handlerAsset, inputManager, handlerGameObject, x, y, width, height);

        this.asset = handlerAsset.get('spacecraft_enemy1');
    }

    init() {}

    draw() {
        if(this.asset) {
            this.p5.image(this.asset, this.x, this.y, this.width, this.height);
        }
    }

    update() {
        this.handlerGameObject.getHandler().foreach(object => {
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