export default class HandlerUI {
    handler = null;

    constructor() {
        this.handler = [];
    }

    getHandler() {
        return this.handler;
    }

    add(uiElement) {
        this.handler.push(uiElement);
    }

    remove(uiElement) {
        this.handler.splice(this.handler.indexOf(uiElement), 1);
    }

    clear() {
        this.handler = [];
    }

    draw() {
        this.handler.forEach(uiElement => uiElement.draw());
    }

    update() {
        this.handler.forEach(uiElement => uiElement.update());
    }
}