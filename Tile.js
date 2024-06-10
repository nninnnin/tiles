class Tile {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.z = 0;
    this.size = size;

    this.rotation = 0;
    this.targetRotation = null;

    this.hovered = false;
    this.animatingZoom = false;
  }

  draw() {
    push();

    translate(this.x, this.y, this.z);

    this.animateZoom();
    this.animateRotation();
    box(this.size);

    pop();
  }

  animateRotation() {
    if (this.hovered) {
      this.setRotation();
    }

    if (this.rotation > 0) {
      const milestones = [
        0,
        90,
        180,
        270,
        360,
      ];

      const closestMilestone = milestones.find(ms => ms > this.rotation)

      this.targetRotation = closestMilestone;

      if (this.rotation < this.targetRotation) {
        this.rotation += 5;
      } else {
        this.rotation = this.targetRotation;
        this.targetRotation = null;
      }
    }

    rotateY(this.rotation);
  }

  animateZoom() {
    if (this.randomize() && !this.animatingZoom) {
      this.animatingZoom = true;
    }

    if (this.animatingZoom) {
      this.zoomIn();
    } else {
      this.zoomOut();
    }
  }

  zoomIn() {
    if (this.z < 50) {
      this.z = this.z + 3;
    } else {
      this.z = 50;
      this.animatingZoom = false;
    }
  }

  zoomOut() {
    if (this.z > 0) {
      this.z = this.z - 3;
    } else {
      this.z = 0;
      this.animatingZoom = false;
    }
  }

  randomize() {
    let result;

    result = Math.floor(Math.random() * 2000);

    return result === 0;
  }

  setRotation() {
    this.rotation = this.rotation + 5;

    return this.rotation;
  }

  setRotateBack() {
    if (this.rotation > 0) {
      this.rotation = this.rotation - 5;
    } else {
      this.rotation = 0;
    }

    return this.rotation;
  }

  checkIsHovered() {
    if (!window.mouseIsPressed) {
      this.hovered = false;
      mouseX = 0;
      mouseY = 0;

      return;
    }

    const mouseX3D = mouseX - width / 2;
    const mouseY3D = mouseY - height / 2;

    const leftEnd = this.x - this.size / 2;
    const rightEnd = this.x + this.size / 2;
    const topEnd = this.y - this.size / 2;
    const bottomEnd = this.y + this.size / 2;

    if (
      mouseX3D > leftEnd &&
      mouseX3D < rightEnd &&
      mouseY3D > topEnd &&
      mouseY3D < bottomEnd
    ) {
      this.hovered = true;
    } else {
      this.hovered = false;
    }

    return this.hovered;
  }
}
