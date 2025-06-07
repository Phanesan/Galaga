import FPS from "./DebugUI/FPS.js";
import Health from "./Health.js";
export default class DebugUI {
    constructor(p5, handlerUI, handlerGameObject) {
        this.p5 = p5;
        this.handlerUI = handlerUI;
        this.handlerGameObject = handlerGameObject;
        this.init();
    }

    init() {
        this.handlerUI.add(new FPS(this.p5, 40, 60, this.handlerUI));
        this.handlerUI.add(new Health(this.p5, 40, 100, this.handlerUI, this.handlerGameObject));
    }
}