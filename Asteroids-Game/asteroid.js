class Asteroid {
    constructor(x, y, a, s) {
        this.x = x;
        this.y = y;
        this.size = s;
        this.noise = [];
        this.a = a;
        this.v = 4 / this.size;
    }
    generate() {
        noiseSeed(random(0, 10000))
        for (let a = 0; a < TWO_PI; a += 0.2) {
            let xOff = cos(a) + 1;
            let yOff = sin(a) + 1;
            let n = noise(xOff, yOff);
            this.noise.push(n);
        }
    }
    draw() {
        noFill();
        rotate(0);
        stroke(255);
        strokeWeight(3)
        beginShape();
        let a = 0;
        this.noise.forEach(n => {
            n = map(n, 0, 1, this.size * 13, this.size * 25)
            let x = n * cos(a) + this.x;
            let y = n * sin(a) + this.y;
            vertex(x, y);
            a += 0.2;
        });
        endShape(CLOSE);
    }
    collisionB(bullet) {
        return (dist(bullet.x, bullet.y, this.x, this.y) < this.size * 20)
    }
    collisionS(ship) {
        return (dist(ship.x, ship.y, this.x, this.y) < this.size * 20)
    }
    split() {
        if (this.size > 1) {
            ship.score += (this.size * 10)
            let tempS = this.size
            tempS += -1
            let a1 = random(0, PI);
            let a2 = random(0, -PI);
            let temp1 = new Asteroid(this.x + cos(a1) * this.size * 30, this.y + sin(a1) * this.size * 30, a1, tempS);
            let temp2 = new Asteroid(this.x + cos(a2) * this.size * 30, this.y + sin(a2) * this.size * 30, a2, tempS);
            temp1.generate();
            temp2.generate();
            return [temp1, temp2];
        }
        return false
    }
    moveCheck() {
        // return (this.x > width || this.x < 0 || this.y > height || this.y < 0)
        // console.log(this.x, width, this.x > width)
        if (this.x > width)
            this.x = 0;
        if (this.x < 0)
            this.x = width;
        if (this.y > height)
            this.y = 0;
        if (this.y < 0)
            this.y = height;
    }
    move() {
        this.x = this.x + this.v * cos(this.a - HALF_PI);
        this.y = this.y + this.v * sin(this.a - HALF_PI);
    }
}