class Bullet {
    constructor(x, y, a) {
        this.x = x;
        this.y = y;
        this.v = 10;
        this.angle = a;
    }
    move() {
        this.x += this.v * cos(this.angle - HALF_PI);
        this.y += this.v * sin(this.angle - HALF_PI);
    }
    deleteCheck() {
        return (this.x > width || this.x < 0 || this.y > height || this.y < 0)
    }
    draw() {
        fill(255);
        ellipse(this.x, this.y, 10);
        noFill();
    }
}