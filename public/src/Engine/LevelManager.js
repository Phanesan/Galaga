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

    this.enemiesQueue = [];
    this.spawnInterval = 1000;
    this.lastSpawnTime = 0;

    this.transitionMessage = "";
    this.transitionTimer = 0;
    this.transitionDuration = 2000;

    this.levelCleared = false;
    this.bossSpawned = false;
    this.gameWon = false;

    this.score = 0; // 🟢 sistema de puntaje
  }

  loadLevel(level) {
    if (level > 3) {
      this.showGameWonScreen();
      return;
    }

    this.currentLevel = level;
    this.lastSpawnTime = this.p5.millis();
    this.levelCleared = false;
    this.bossSpawned = false;

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

    this.transitionMessage = `Nivel ${level}`;
    this.transitionTimer = this.p5.millis();
  }

  update() {
    if (this.gameWon) {
      this.showGameWonScreen();
      return;
    }

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
      return;
    }

    // puntos
    this.handlerGameObject.getHandler().forEach((obj) => {
      if (obj.name.startsWith("enemy") && obj.isDestroyed && !obj.scored) {
        obj.scored = true;
        if (obj instanceof EnemyOne) this.score += 100;
        else if (obj instanceof EnemyTwo) this.score += 200;
        else if (obj instanceof EnemyThree) this.score += 300;
        else if (obj instanceof EnemyBoss) this.score += 1000;
      }
    });

    if (this.enemiesQueue.length > 0) {
      const now = this.p5.millis();
      if (now - this.lastSpawnTime >= this.spawnInterval) {
        this.spawnEnemy();
        this.lastSpawnTime = now;
      }
    }

    this.checkLevelProgression();
  }

  spawnEnemy() {
    const x = this.p5.random(50, this.p5.width - 130);
    const y = -50;

    if (this.enemiesQueue.length === 0) return;

    const enemyType = this.enemiesQueue.shift();
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
    return !this.handlerGameObject
      .getHandler()
      .some((obj) => obj.name === "enemyBoss" && !obj.isDestroyed);
  }

  showGameWonScreen() {
    this.p5.push();

    this.p5.fill(0, 0, 0, 200);
    this.p5.rect(0, 0, this.p5.width, this.p5.height);

    this.p5.fill(255, 215, 0);
    this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
    this.p5.textSize(64);
    this.p5.text("¡VICTORIA!", this.p5.width / 2, this.p5.height / 2 - 100);

    this.p5.fill(255);
    this.p5.textSize(32);
    this.p5.text(
      "Has completado todos los niveles",
      this.p5.width / 2,
      this.p5.height / 2
    );

    this.p5.textSize(24);
    this.p5.text(
      "¡Felicidades, has derrotado al jefe final!",
      this.p5.width / 2,
      this.p5.height / 2 + 60
    );

    this.p5.pop();

    // Crear input si no existe aún
    if (!this.nameInput) {
      this.nameInput = this.p5.createInput("");
      this.nameInput.position(
        this.p5.width / 2 - 100,
        this.p5.height / 2 + 100
      );
      this.nameInput.size(200);
      this.nameInput.attribute("placeholder", "Ingresa tu nombre");

      this.submitButton = this.p5.createButton("Guardar puntaje");
      this.submitButton.position(
        this.p5.width / 2 - 80,
        this.p5.height / 2 + 140
      );

      this.submitButton.mousePressed(() => {
        const playerName = this.nameInput.value().trim() || "Jugador";
        this.saveHighScore(playerName);
        this.nameInput.remove();
        this.submitButton.remove();
        window.location.href = "index.html"; // o el nombre de tu menú
      });
    }
  }

  checkLevelProgression() {
    if (this.levelCleared) return;

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

    if (this.isLevelCleared() && (!this.bossSpawned || this.bossDefeated())) {
      this.levelCleared = true;

      if (this.currentLevel === 3) {
        this.gameWon = true;
        this.transitionMessage = "¡Juego completado!";
      } else {
        this.transitionMessage = "¡Nivel superado!";
      }

      this.transitionTimer = this.p5.millis();

      if (!this.gameWon) {
        setTimeout(() => {
          this.loadLevel(this.currentLevel + 1);
        }, this.transitionDuration + 800);
      }
    }
  }
  saveHighScore(name) {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // Guardar score actual
    highScores.push({ name, score: this.score });

    // Ordenar y limitar a top 5
    highScores.sort((a, b) => b.score - a.score);
    const topFive = highScores.slice(0, 5);

    localStorage.setItem("highScores", JSON.stringify(topFive));
  }
}
