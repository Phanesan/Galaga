import GameObject from "../GameObject.js";
import Bullet from "../Entity/Bullet.js";

export default class Spacecraft extends GameObject {
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

    this.asset = handlerAsset.get("spacecraft_player");
    this.lives = 3;
    this.lastShot = 0;
  }

  init() {}

  draw() {
    if (this.asset && !this.isDestroyed) {
      this.p5.image(this.asset, this.x, this.y, this.width, this.height);
    }
  }

  update() {
    if (this.isDestroyed) return;

    // velocidad mov
    if (this.inputManager.isKeyPressed("moveLeft")) this.x -= 5;
    if (this.inputManager.isKeyPressed("moveRight")) this.x += 5;
    if (this.inputManager.isKeyPressed("moveUp")) this.y -= 5;
    if (this.inputManager.isKeyPressed("moveDown")) this.y += 5;

    // limite area
    this.x = this.p5.constrain(this.x, 0, this.p5.width - this.width);
    this.y = this.p5.constrain(this.y, 0, this.p5.height - this.height);

    if (this.p5.keyIsDown(32) && this.p5.millis() - this.lastShot > 300) {
      this.lastShot = this.p5.millis();
      const bullet = new Bullet(
        `playerBullet_${Math.random()}`,
        this.p5,
        this.handlerAsset,
        this.inputManager,
        this.handlerGameObject,
        this.x + this.width / 2 - 2,
        this.y,
        4,
        10,
        // velocidad de disparo
        -15,
        "player"
      );
      this.handlerGameObject.add(bullet);
    }

    // colisiones
    this.handlerGameObject.getHandler().forEach((object) => {
      if (object !== this && this.intersects(object)) {
        this.collision(object);
      }
    });
  }

  collision(object) {
    if (object instanceof Bullet && object.owner === "enemy") {
      //console.log("collision");
      this.lives--;
      object.isDestroyed = true;
      if (this.lives <= 0) {
        this.isDestroyed = true;
      }
    }
  }
}
