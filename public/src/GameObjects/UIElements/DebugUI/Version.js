import UIElement from "../../UIElement.js";

export default class Version extends UIElement {
    constructor(p5, x, y, handlerUI) {
        super(p5, x, y);
        this.handlerUI = handlerUI;
        this.init();
    }

    init() {}

    draw() {
        this.p5.textSize(20);
        this.p5.fill(255, 255, 255, 70);
        this.p5.text(`Version: 0.1`, this.x, this.y);
    }

    update() {}
}