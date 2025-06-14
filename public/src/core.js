import HandlerGameObject from "./GameObjects/HandlerGameObject.js";
import HandlerUI from "./GameObjects/HandlerUI.js";
import InputManager from "./Engine/InputManager.js";
import DebugUI from "./GameObjects/UIElements/DebugUI.js";
import HandlerAsset from "./GameObjects/HandlerAsset.js";

import Spacecraft from "./GameObjects/Entity/Spacecraft.js";
import LevelManager from "./Engine/LevelManager.js";

// config
const debug = true;

const inputManager = new InputManager();
const handlerAsset = new HandlerAsset();
const handlerGameObject = new HandlerGameObject();
const handlerUI = new HandlerUI();

let levelManager;

const sketch = (p) => {
  p.preload = () => {
    handlerAsset.add(
      "spacecraft_player",
      p.loadImage("./public/assets/spacecraft/spacecraft.gif")
    );
    handlerAsset.add(
      "spacecraft_enemy1",
      p.loadImage("./public/assets/spacecraft/enemy1.gif")
    );
    handlerAsset.add(
      "spacecraft_enemy2",
      p.loadImage("./public/assets/enemy_2/1.png")
    );
    handlerAsset.add(
      "spacecraft_enemy3",
      p.loadImage("./public/assets/enemy_3/1.png")
    );
    handlerAsset.add(
      "spacecraft_boss",
      p.loadImage("./public/assets/spacecraft/boss2.gif")
    );
  };

  p.setup = () => {
    p.createCanvas(1100, 800);
    p.frameRate(144);
    p.background(0);

    if (debug) {
      new DebugUI(p, handlerUI, handlerGameObject);
    }

    // crear jugador
    handlerGameObject.add(
      new Spacecraft(
        "player",
        p,
        handlerAsset,
        inputManager,
        handlerGameObject,
        500,
        700,
        60,
        40
      )
    );

    // iniciar lvl 1
    levelManager = new LevelManager(
      p,
      handlerAsset,
      inputManager,
      handlerGameObject
    );
    levelManager.loadLevel(1);
  };

  p.draw = () => {
    p.background(0);

    // actualizar nivel (spawnear enemigos escalonadamente)
    levelManager.update();

    // actualizar gameobjects
    handlerGameObject.handler.forEach((obj) => {
      obj.update();
      obj.draw();
    });

    // ui
    handlerUI.handler.forEach((ui) => {
      ui.update();
      ui.draw();
    });

    // limpiar objetos destruidos
    handlerGameObject.handler = handlerGameObject.handler.filter(
      (obj) => !obj.isDestroyed
    );

    // Input
    inputManager.keyPress("moveLeft", p.keyIsDown(65));
    inputManager.keyPress("moveRight", p.keyIsDown(68));
    //inputManager.keyPress("moveUp", p.keyIsDown(87));
    //inputManager.keyPress("moveDown", p.keyIsDown(83));
  };
};

new p5(sketch);
