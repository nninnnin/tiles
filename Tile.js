class Tile {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  draw() {
    push();

    translate(this.x, this.y);
    box(this.size);

    pop();
  }
}
