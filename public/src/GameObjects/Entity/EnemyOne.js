import GameObject from "../GameObject.js";
import Bullet from "../Entity/Bullet.js";

export default class EnemyOne extends GameObject {
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

    this.asset = handlerAsset.get("spacecraft_enemy1");
    this.lastShot = 0;
  }

  init() {}

  draw() {
    if (this.asset) {
      this.p5.image(this.asset, this.x, this.y, this.width, this.height);
    }
  }

  update() {
    // movimiento hacia abajo
    this.y += 0.5;

    // disparo cada seg
    /*if (this.p5.millis() - this.lastShot > 1000) {
      this.lastShot = this.p5.millis();
      const bullet = new Bullet(
        `enemyBullet_${Math.random()}`,
        this.p5,
        this.handlerAsset,
        this.inputManager,
        this.handlerGameObject,
        this.x + this.width / 2 - 2,
        this.y + this.height,
        4,
        10,
        5,
        "enemy"
      );
      this.handlerGameObject.add(bullet);
    }*/

    if (this.y + this.height >= this.p5.height) {
      const player = this.handlerGameObject
        .getHandler()
        .find((obj) => obj.name === "player");

      if (player && !player.isDestroyed) {
        player.lives--;

        if (player.lives <= 0) {
          player.isDestroyed = true;
        }
      }

      this.isDestroyed = true;
      return;
    }

    // Colisiones
    this.handlerGameObject.getHandler().forEach((object) => {
      if (object !== this && this.intersects(object)) {
        this.collision(object);
      }
    });
  }

  collision(object) {
    if (object instanceof Bullet && object.owner === "player") {
      this.isDestroyed = true;
    }
  }
}
