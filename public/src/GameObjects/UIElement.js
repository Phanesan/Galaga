export default class UIElement {
    constructor(p5, x, y, w = undefined, h = undefined) {
        this.p5 = p5;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    init() {}

    draw() {}

    update() {}
}