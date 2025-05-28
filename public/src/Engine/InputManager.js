export default class InputManager {
    constructor() {
        this.keys = {};
    }

    keyPress(id, keyBool) {
        this.keys[id] = keyBool;
    }


    update() {
        
    }
}