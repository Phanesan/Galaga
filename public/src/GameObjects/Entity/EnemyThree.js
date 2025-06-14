import GameObject from "../GameObject.js";
import Bullet from "./Bullet.js";

export default class EnemyThree extends GameObject {
  constructor(
    name,
    p5,
    handlerAsset,
    inputManager,
    handlerGameObject,
    x,
    y,
    width,
    height
  ) {
    super(
      name,
      p5,
      handlerAsset,
      inputManager,
      handlerGameObject,
      x,
      y,
      width,
      height
    );

    this.asset = handlerAsset.get("spacecraft_enemy3");
    this.health = 3;
    this.speedY = 3;
    this.lastShot = 0;
    this.shotInterval = 1200;
    this.isDestroyed = false;
  }

  update() {
    this.y += this.speedY;

    // Si se sale de la pantalla por abajo, destruir
    if (this.y > this.p5.height) {
      this.health = 0;
      this.isDestroyed = true;
      return;
    }

    // Disparo automÃ¡tico cada cierto tiempo
    const now = this.p5.millis();
    if (now - this.lastShot > this.shotInterval) {
      this.lastShot = now;
      const bullet = new Bullet(
        `enemyBullet${Math.random()}`,
        this.p5,
        this.handlerAsset,
        this.inputManager,
        this.handlerGameObject,
        this.x + this.width / 2 - 2,
        this.y + this.height,
        4,
        10,
        6,
        "enemy"
      );
      this.handlerGameObject.add(bullet);
    }

    // Colisiones con otros objetos
    this.handlerGameObject.getHandler().forEach((obj) => {
      if (obj !== this && this.intersects(obj)) {
        this.collision(obj);
      }
    });

    // Si la salud llega a cero, marcar destruido
    if (this.health <= 0) {
      this.isDestroyed = true;
    }
  }

  collision(obj) {
    if (obj instanceof Bullet && obj.owner === "player") {
      this.health--;
      obj.isDestroyed = true;
    }
  }

  draw() {
    if (this.asset) {
      this.p5.image(this.asset, this.x, this.y, this.width, this.height);
    } else {
      // fallback visual
      this.p5.fill(255, 0, 0);
      this.p5.rect(this.x, this.y, this.width, this.height);
    }
  }
}