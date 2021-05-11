class Ship {
    constructor(img) {
        this.img = img;
        this.x = width / 2;
        this.y = height / 2;
        this.v = 5;
        this.angle = 0;
        this.sizeX = 25;
        this.sizeY = 40;
        this.lives = 5;
        this.score = 0
    }
    draw() {
        push();
        translate(this.x, this.y)
        rotate(this.angle);
        // rect(this.x, this.y, this.sizeX, this.sizeY);
        image(shipImg, 0, 0, this.sizeX, this.sizeY);
        pop();
        textSize(20);
        strokeWeight(1)
        text(this.lives, 30, 570)
        textAlign(CENTER)
        text(this.score, width - 50, 570)
    }
    move() {
        if (dist(mouseX, mouseY, this.x, this.y) > (this.sizeY / 2)) {
            this.x += this.v * cos(this.angle - HALF_PI);
            this.y += this.v * sin(this.angle - HALF_PI);
            this.x = constrain(this.x, 0 + (3 * this.sizeX / 4), width - (3 * this.sizeX / 4));
            this.y = constrain(this.y, 0 + (3 * this.sizeX / 4), height - (3 * this.sizeX / 4));
        }
    }
    center() {
        this.x = width / 2;
        this.y = height / 2;
    }
}