import FPS from "./DebugUI/FPS.js";
import Version from "./DebugUI/Version.js";
export default class DebugUI {
    constructor(p5, handlerUI) {
        this.p5 = p5;
        this.handlerUI = handlerUI;
        this.init();
    }

    init() {
        this.handlerUI.add(new FPS(this.p5, 40, 60, this.handlerUI));
        this.handlerUI.add(new Version(this.p5, 40, 740, this.handlerUI));
    }
}