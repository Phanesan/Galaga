import GameObject from "../GameObject.js";
import Bullet from "./Bullet.js";

export default class EnemyTwo extends GameObject {
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

    // recordar cambiar sprite
    this.asset = handlerAsset.get("spacecraft_enemy2");
    // que vida le ponemos?
    this.health = 1;
    this.baseX = x;
    // punto de partida para el zigzageo
    this.timeOffset = Math.random() * 1000;
    // distancia para el zigzag
    this.amplitude = this.p5.random(80, 140);
    // reducir velocidad de caida
    this.speedY = 1.8 + this.p5.random(0.2);
    // intervalo pa cambiar intervalo de zigzag
    this.frequency = this.p5.random(0.001, 0.0005);
    this.lastShot = 0;
    this.shotInterval = this.p5.random(2000, 4000);
  }

  draw() {
    if (this.asset) {
      this.p5.image(this.asset, this.x, this.y, this.width, this.height);
    }
  }

  update() {
    const time = this.p5.millis();

    // zigzag tal cual
    this.x =
      this.baseX +
      this.amplitude * Math.sin(this.frequency * (time + this.timeOffset));
    this.y += this.speedY;

    // disparo
    if (time - this.lastShot > this.shotInterval) {
      this.lastShot = time;

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
    }

    // Colisiones
    this.handlerGameObject.getHandler().forEach((object) => {
      if (object !== this && this.intersects(object)) {
        this.collision(object);
      }
    });

    // bullet le da a player
    if (this.y > this.p5.height) {
      const player = this.handlerGameObject
        .getHandler()
        .find((obj) => obj.name === "player");

      if (player) {
        player.lives--;
      }

      this.isDestroyed = true;
    }
  }

  // yahir si ves esto aun no sé si le ponemos mas vida o que a estos jeje
  collision(object) {
    if (object.name.startsWith("playerBullet")) {
      this.health--;
      object.isDestroyed = true;

      if (this.health <= 0) {
        this.isDestroyed = true;
      }
    }
  }
}
