import HandlerGameObject from "./GameObjects/HandlerGameObject.js";
import HandlerUI from "./GameObjects/HandlerUI.js";
import InputManager from "./Engine/InputManager.js";
import DebugUI from "./GameObjects/UIElements/DebugUI.js";

// config
const debug = true;

const inputManager = new InputManager();
const handlerGameObject = new HandlerGameObject();
const handlerUI = new HandlerUI();

const sketch = (p) => {
    p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight+1);
        p.frameRate(144);
        p.background(0,0,0);

        if (debug) {
            new DebugUI(p, handlerUI);
        }
    }

    p.draw = () => {
        p.background(0);

        inputManager.update();

        handlerGameObject.handler.forEach(gameObjectElement => {
            gameObjectElement.update();
            gameObjectElement.draw();
        });

        handlerUI.handler.forEach(uiElement => {
            //console.log(uiElement);
            uiElement.update();
            uiElement.draw();
        });

        inputManager.keyPress('moveLeft', p.keyIsDown(68));
        inputManager.keyPress('moveRight', p.keyIsDown(65));
        inputManager.keyPress('moveUp', p.keyIsDown(87));
        inputManager.keyPress('moveDown', p.keyIsDown(83));
        inputManager.keyPress('pause', p.keyIsDown(27));
    }

    p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight+1);
    }
}

new p5(sketch);