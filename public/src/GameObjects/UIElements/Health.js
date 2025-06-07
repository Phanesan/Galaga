import UIElement from "../UIElement.js";

export default class Health extends UIElement {
    constructor(p5, x, y, handlerUI, handlerGameObject) {
        super(p5, x, y);
        this.handlerUI = handlerUI;
        this.handlerGameObject = handlerGameObject;
        this.init();
    }

    init() {}

    draw() {
        if(!this.handlerGameObject.getName("player")) return;

        this.p5.textSize(20);
        this.p5.fill(255);
        this.p5.text(`Vida: ${this.handlerGameObject.getName("player").lives}`, this.x, this.y);
    }

    update() {}
}