import GameObject from "../GameObject.js";

export default class Bullet extends GameObject {
  constructor(
    name,
    p5,
    handlerAsset,
    inputManager,
    handlerGameObject,
    x,
    y,
    width,
    height,
    velocityY,
    owner
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
    this.velocityY = velocityY;
    this.owner = owner;
  }

  draw() {
    this.p5.fill(this.owner === "player" ? "#00ff00" : "#ff0000");
    this.p5.rect(this.x + this.width / 2 - 2, this.y, 4, this.height);
  }

  update() {
    this.y += this.velocityY;

    if (this.y < 0 || this.y > this.p5.height) {
      this.isDestroyed = true;
      return;
    }

    this.handlerGameObject.getHandler().forEach((obj) => {
      if (obj !== this && this.intersects(obj)) {
        if (this.owner === "player" && obj.name.startsWith("enemy")) {
          obj.collision(this);
          this.isDestroyed = true;
        } else if (this.owner === "enemy" && obj.name === "player") {
          obj.collision(this);
          this.isDestroyed = true;
        }
      }
    });
  }
}
