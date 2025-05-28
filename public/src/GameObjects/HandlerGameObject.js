export default class HandlerGameObject {
    handler = null;

    constructor() {
        this.handler = [];
    }

    add(gameObjectElement) {
        this.handler.push(gameObjectElement);
    }

    remove(gameObjectElement) {
        this.handler.splice(this.handler.indexOf(gameObjectElement), 1);
    }

    getHandler() {
        return this.handler;
    }

    clear() {
        this.handler = [];
    }
}