import GameObject from "../GameObject.js";
import Bullet from "./Bullet.js";

export default class EnemyBoss extends GameObject {
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
    // sprite jefe
    this.asset = handlerAsset.get("spacecraft_boss");
    this.health = 7;
    this.speedY = 1.5;
    this.speedX = 3;
    this.direction = 1;
    this.lastShot = 0;
    this.shotInterval = 500;
  }

  update() {
    // caer hasta llegar a mitad de pantalla
    if (this.y < 100) {
      this.y += this.speedY;
    } else {
      // mov izq y der
      this.x += this.speedX * this.direction;

      // cambiar de direccion al chocar con bordes
      if (this.x <= 0 || this.x + this.width >= this.p5.width) {
        this.direction *= -1;
      }
    }

    // disparo
    const now = this.p5.millis();
    if (now - this.lastShot > this.shotInterval) {
      this.lastShot = now;

      const bullet = new Bullet(
        `enemyBossBullet_${Math.random()}`,
        this.p5,
        this.handlerAsset,
        this.inputManager,
        this.handlerGameObject,
        this.x + this.width / 2 - 4,
        this.y + this.height,
        8,
        14,
        // velocidad de bala
        10,
        "enemy"
      );
      this.handlerGameObject.add(bullet);
    }

    // Revisar colisiones
    this.handlerGameObject.getHandler().forEach((obj) => {
      if (obj !== this && this.intersects(obj)) {
        this.collision(obj);
      }
    });
  }

  collision(obj) {
    if (obj instanceof Bullet && obj.owner === "player") {
      this.health--;
      obj.isDestroyed = true;
      if (this.health <= 0) {
        this.isDestroyed = true;
      }
    }
  }

  draw() {
    if (this.asset) {
      this.p5.image(this.asset, this.x, this.y, this.width, this.height);
    }
  }
}
