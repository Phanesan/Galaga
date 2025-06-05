import EnemyOne from "../GameObjects/Entity/EnemyOne.js";
import EnemyTwo from "../GameObjects/Entity/EnemyTwo.js";
import EnemyThree from "../GameObjects/Entity/EnemyThree.js";
import EnemyBoss from "../GameObjects/Entity/EnemyBoss.js";

export default class LevelManager {
  constructor(p5, handlerAsset, inputManager, handlerGameObject) {
    this.p5 = p5;
    this.handlerAsset = handlerAsset;
    this.inputManager = inputManager;
    this.handlerGameObject = handlerGameObject;

    this.currentLevel = 0;

    // cola de enemigos a generar
    this.enemiesQueue = [];
    // tiempo en ms entre enemigos
    this.spawnInterval = 1000;
    this.lastSpawnTime = 0;

    this.transitionMessage = "";
    this.transitionTimer = 0;
    this.transitionDuration = 2000;

    this.levelCleared = false;
    this.bossSpawned = false;
  }

  loadLevel(level) {
    this.currentLevel = level;
    this.lastSpawnTime = this.p5.millis();
    this.levelCleared = false;
    this.bossSpawned = false;

    // cantidad de enemigos y cuales
    if (level === 1) {
      this.enemiesQueue = Array(10).fill("EnemyOne");
    } else if (level === 2) {
      this.enemiesQueue = [
        ...Array(5).fill("EnemyOne"),
        ...Array(5).fill("EnemyTwo"),
      ];
    } else if (level === 3) {
      this.enemiesQueue = [
        ...Array(4).fill("EnemyOne"),
        ...Array(8).fill("EnemyTwo"),
        ...Array(2).fill("EnemyThree"),
      ];
    }

    // mah nivele parce
    this.transitionMessage = `Nivel ${level}`;
    this.transitionTimer = this.p5.millis();
  }

  update() {
    // mostrar transicion
    if (
      this.transitionMessage &&
      this.p5.millis() - this.transitionTimer < this.transitionDuration
    ) {
      this.p5.push();
      this.p5.fill(255);
      this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
      this.p5.textSize(48);
      this.p5.text(
        this.transitionMessage,
        this.p5.width / 2,
        this.p5.height / 2
      );
      this.p5.pop();
      // durante la transición no spawn
      return;
    }

    // generacion escalonada usando la cola
    if (this.enemiesQueue.length > 0) {
      const now = this.p5.millis();
      if (now - this.lastSpawnTime >= this.spawnInterval) {
        this.spawnEnemy();
        this.lastSpawnTime = now;
      }
    }

    // progresion de nivel
    this.checkLevelProgression();
  }

  spawnEnemy() {
    // posición X aleatoria con margen
    const x = this.p5.random(50, this.p5.width - 130);
    // fuera de pantalla, arriba
    const y = -50;

    if (this.enemiesQueue.length === 0) return;

    const enemyType = this.enemiesQueue.shift(); // sacamos el primer enemigo de la cola

    let enemy;

    if (enemyType === "EnemyOne") {
      enemy = new EnemyOne(
        `enemy_${Date.now()}`,
        this.p5,
        this.handlerAsset,
        this.inputManager,
        this.handlerGameObject,
        x,
        y,
        80,
        40
      );
    } else if (enemyType === "EnemyTwo") {
      enemy = new EnemyTwo(
        `enemy_${Date.now()}`,
        this.p5,
        this.handlerAsset,
        this.inputManager,
        this.handlerGameObject,
        x,
        y,
        80,
        40
      );
    } else if (enemyType === "EnemyThree") {
      enemy = new EnemyThree(
        `enemy_${Date.now()}`,
        this.p5,
        this.handlerAsset,
        this.inputManager,
        this.handlerGameObject,
        x,
        y,
        90,
        50
      );
    }

    if (enemy) {
      this.handlerGameObject.add(enemy);
    }
  }

  isLevelCleared() {
    const remainingEnemies = this.handlerGameObject
      .getHandler()
      .filter((obj) => obj.name.startsWith("enemy") && !obj.isDestroyed);

    return this.enemiesQueue.length === 0 && remainingEnemies.length === 0;
  }

  bossDefeated() {
    // Devuelve true si no hay jefe o está destruido
    return !this.handlerGameObject
      .getHandler()
      .some((obj) => obj.name === "enemyBoss" && !obj.isDestroyed);
  }

  checkLevelProgression() {
    if (this.levelCleared) return;

    // spawnear jefe en caso de que no hayan enemigos en lvl 3
    if (
      this.currentLevel === 3 &&
      this.enemiesQueue.length === 0 &&
      !this.bossSpawned
    ) {
      const boss = new EnemyBoss(
        "enemyBoss",
        this.p5,
        this.handlerAsset,
        this.inputManager,
        this.handlerGameObject,
        this.p5.width / 2 - 100,
        -150,
        200,
        120
      );
      this.handlerGameObject.add(boss);
      this.bossSpawned = true;

      this.transitionMessage = "¡Prepárate para el jefe final!";
      this.transitionTimer = this.p5.millis();
      return;
    }

    // nivel terminado si no quedan enemigos ni jefe
    if (this.isLevelCleared() && (!this.bossSpawned || this.bossDefeated())) {
      this.levelCleared = true;

      this.transitionMessage = "¡Nivel superado!";
      this.transitionTimer = this.p5.millis();

      setTimeout(() => {
        this.loadLevel(this.currentLevel + 1);
      }, this.transitionDuration + 800);
    }
  }
}
