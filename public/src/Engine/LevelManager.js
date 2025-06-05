import EnemyOne from "../GameObjects/Entity/EnemyOne.js";

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
  }

  loadLevel(level) {
    this.currentLevel = level;

    if (level === 1) {
      // cantidad total a generar
      this.enemiesToSpawn = 10;
      this.lastSpawnTime = this.p5.millis();
    }

    // mah nivele parce
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

    this.handlerGameObject.add(
      new EnemyOne(
        // id unico enemigo
        `enemy_${Date.now()}`,
        this.p5,
        this.handlerAsset,
        this.inputManager,
        this.handlerGameObject,
        x,
        y,
        80,
        40
      )
    );
  }

  isLevelCleared() {
    return (
      this.enemiesToSpawn === 0 &&
      !this.handlerGameObject
        .getHandler()
        .some((obj) => obj.name.startsWith("enemy_"))
    );
  }
}
