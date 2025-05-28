import UIElement from "../../UIElement.js";
import { Utils } from "../../../Utils.js";

export default class FPS extends UIElement {
    constructor(p5, x, y, handlerUI) {
        super(p5, x, y);
        this.handlerUI = handlerUI;
        this.init();

        this.fps = 0;
        this.p5.frameRate(144);
    }

    init() {}

    draw() {
        this.p5.textSize(20);
        this.p5.fill(255);
        this.p5.text(`FPS: ${Math.round(this.fps)}`, this.x, this.y);
    }

    update() {
        Utils.intervalTimer(this.p5.frameCount, () => {
            this.fps = this.p5.frameRate().toFixed(2);
            console.log(this.fps);
        }, 30);
    }
}