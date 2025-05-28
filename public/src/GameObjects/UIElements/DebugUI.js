import FPS from "./DebugUI/FPS.js";
export default class DebugUI {
    constructor(p5, handlerUI) {
        this.p5 = p5;
        this.handlerUI = handlerUI;
        this.init();
    }

    init() {
        this.handlerUI.add(new FPS(this.p5, 40, 60, this.handlerUI));
    }
}