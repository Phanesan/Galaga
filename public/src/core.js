import HandlerGameObject from "./GameObjects/HandlerGameObject.js";
import HandlerUI from "./GameObjects/HandlerUI.js";
import InputManager from "./Engine/InputManager.js";
import DebugUI from "./GameObjects/UIElements/DebugUI.js";
import HandlerAsset from "./GameObjects/HandlerAsset.js";

import Spacecraft from "./GameObjects/Entity/Spacecraft.js";

// config
const debug = true;

const inputManager = new InputManager();
const handlerAsset = new HandlerAsset();
const handlerGameObject = new HandlerGameObject();
const handlerUI = new HandlerUI();

const sketch = (p) => {
    p.preload = () => {
        handlerAsset.add('spacecraft_player', p.loadImage('./public/assets/spacecraft/spacecraft.gif'));
        handlerAsset.add('spacecraft_enemy1', p.loadImage('./public/assets/spacecraft/enemy1.gif'));
    }

    p.setup = () => {
        p.createCanvas(1100, 800);
        p.frameRate(144);
        p.background(0,0,0);

        if (debug) {
            new DebugUI(p, handlerUI);
        }
        
        handlerGameObject.add(new Spacecraft("player", p, handlerAsset, inputManager, handlerGameObject, 300, 100, 80, 40));
    }

    p.draw = () => {
        p.background(0);

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

    
}

new p5(sketch);