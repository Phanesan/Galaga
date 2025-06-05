import EnemyOne from "../GameObjects/Entity/EnemyOne.js";
import EnemyTwo from "../GameObjects/Entity/EnemyTwo.js";

export default class LevelManager {
  constructor(p5, handlerAsset, inputManager, handlerGameObject) {
    this.p5 = p5;
    this.handlerAsset = handlerAsset;
    this.inputManager = inputManager;
    this.handlerGameObject = handlerGameObject;
    this.currentLevel = 0;

    // generacion de escalonada
    this.enemiesToSpawn = 0;
    // tiempo en ms entre enemigos
    this.spawnInterval = 1000;
    this.lastSpawnTime = 0;
    this.spawnType = "enemyOne";

    this.levelCleared = false;
    this.transitionTimer = 0;
    this.transitionMessage = "";
  }

  loadLevel(level) {
    this.currentLevel = level;
    this.levelCleared = false;

    if (level === 1) {
      // cantidad total a generar
      this.enemiesToSpawn = 10;
      this.spawnType = "enemyOne";
    }

    if (level === 2) {
      this.enemiesToSpawn = 10;
      this.spawnType = "mixed";
    }
    if (level === 3) {
      this.enemiesToSpawn = 100;
      this.spawnType = "mixed";
    }
    // mah nivele parce
    this.lastSpawnTime = this.p5.millis();
  }

  update() {
    if (this.enemiesToSpawn > 0) {
      const now = this.p5.millis();
      if (now - this.lastSpawnTime >= this.spawnInterval) {
        this.spawnEnemy();
        this.lastSpawnTime = now;
        this.enemiesToSpawn--;
      }
    }
  }

  spawnEnemy() {
    // posición X aleatoria con margen
    const x = this.p5.random(50, this.p5.width - 130);
    // fuera de pantalla, arriba
    const y = -50;
    let enemy;

    if (this.spawnType === "enemyOne") {
      enemy = new EnemyOne(
        // id unico enemigo
        `enemyOne_${Date.now()}`,
        this.p5,
        this.handlerAsset,
        this.inputManager,
        this.handlerGameObject,
        x,
        y,
        80,
        40
      );
    } else if (this.spawnType === "enemyTwo") {
      enemy = new EnemyTwo(
        // id unico enemigo
        `enemyTwo_${Date.now()}`,
        this.p5,
        this.handlerAsset,
        this.inputManager,
        this.handlerGameObject,
        x,
        y,
        80,
        40
      );
    } else if (this.spawnType === "mixed") {
      const type = Math.random() < 0.5 ? "one" : "two";
      enemy =
        type === "one"
          ? new EnemyOne(
              // id unico enemigo
              `enemyOne_${Date.now()}`,
              this.p5,
              this.handlerAsset,
              this.inputManager,
              this.handlerGameObject,
              x,
              y,
              80,
              40
            )
          : new EnemyTwo(
              // id unico enemigo
              `enemyTwo_${Date.now()}`,
              this.p5,
              this.handlerAsset,
              this.inputManager,
              this.handlerGameObject,
              x,
              y,
              80,
              40
            );
    }

    this.handlerGameObject.add(enemy);
  }

  isLevelCleared() {
    return (
      this.enemiesToSpawn === 0 &&
      !this.handlerGameObject
        .getHandler()
        .some(
          (obj) =>
            obj.name.startsWith("enemyOne_") || obj.name.startsWith("enemyTwo_")
        )
    );
  }

  // mensaje de nivel terminado
  checkLevelProgression() {
    if (this.isLevelCleared() && !this.levelCleared) {
      this.levelCleared = true;
      this.transitionTimer = this.p5.millis();
      this.transitionMessage = `¡Nivel ${this.currentLevel} completado!`;
    }

    if (this.levelCleared && this.p5.millis() - this.transitionTimer > 3000) {
      this.loadLevel(this.currentLevel + 1);
    }
  }

  // transicao
  drawTransition() {
    if (this.levelCleared && this.p5.millis() - this.transitionTimer < 3000) {
      this.p5.push();
      this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
      this.p5.textSize(48);
      this.p5.fill(255);
      this.p5.text(
        this.transitionMessage,
        this.p5.width / 2,
        this.p5.height / 2
      );
      this.p5.pop();
    }
  }
}
