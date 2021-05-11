let shipImg;
let hurtSound;
let shootSound;
let explosionSound;
let ship;
let asteroids = [];
let lenA = 0;
let tempA = [];
let bullets = [];
let lastBullet = Date.now();
let cooldown = 180;

function calcAngle(ship) {
    return Math.atan2(mouseY - ship.y, mouseX - ship.x);

}

function randomAsteroid() {
    let tempX;
    let tempY;
    do {
        tempX = Math.floor(random(0, width));
        tempY = Math.floor(random(0, height));
    } while (!(dist(tempX, tempY, ship.x, ship.y) > 50))
    let temp = new Asteroid(tempX, tempY, random(-PI, PI), random([1, 2, 3]));
    temp.generate();
    asteroids.push(temp);
}

function preload() {
    shipImg = loadImage("ship.png");
    explosionSound = new Audio("explosion.wav");
    shootSound = new Audio("shoot.wav");
    hurtSound = new Audio("hurt.wav");
}

function setup() {
    createCanvas(800, 600);
    ship = new Ship(shipImg);
    do {
        randomAsteroid();
        asteroids.forEach(asteroid => {
            lenA += asteroid.size;
        })

    } while (lenA < 8)
}


function draw() {
    if (ship.lives < 1) {
        strokeWeight(1)
        background(0);
        textAlign(CENTER)
        textSize(40)
        fill(255);
        text("GAME OVER\nPress R to reset\nScore: " +
            ship.score, width / 2, height / 2)
        noFill()
        if (keyIsDown(82)) {
            ship.lives = 5
            ship.score = 0;
            asteroids = []
            do {
                randomAsteroid();
                asteroids.forEach(asteroid => {
                    lenA += asteroid.size;
                })

            } while (lenA < 8)
        }
    } else {
        lenA = 0
        if (keyIsDown(87)) {
            ship.move()
        }
        if ((keyIsDown(32) || (mouseIsPressed && mouseButton === LEFT)) && Date.now() > lastBullet + cooldown) {
            lastBullet = Date.now();
            let x = ship.x + (cos(ship.angle - HALF_PI) * (ship.sizeY / 2)) + 2
            let y = ship.y + (sin(ship.angle - HALF_PI) * (ship.sizeY / 2)) + 2
            let a = ship.angle;
            let temp = new Bullet(x, y, a);
            bullets.push(temp);
            shootSound.play();
        }
        ship.angle = calcAngle(ship) + HALF_PI;
        background(0);
        bullets.forEach((bullet, i) => {
            bullet.draw();
            bullet.move();
            if (bullet.deleteCheck()) {
                bullets.splice(i, 1);
            }
        })
        rectMode(CENTER);
        imageMode(CENTER);
        ship.draw();
        asteroids.forEach((asteroid, i) => {
            lenA += asteroid.size
            bullets.forEach((bullet, j) => {
                if (asteroid.collisionB(bullet)) {
                    asteroids.splice(i, 1)
                    let temp = asteroid.split();
                    if (temp !== false)
                        tempA = tempA.concat(temp);
                    bullets.splice(j, 1);
                }
            })
            if (asteroid.collisionS(ship)) {
                asteroids.splice(i, 1)
                let temp = asteroid.split();
                if (temp !== false)
                    tempA = tempA.concat(temp);
                ship.center();
                ship.lives--;
                hurtSound.play();
            }
            asteroid.move();
            asteroid.moveCheck();
            asteroid.draw();
        })
        if (lenA < 9) {
            randomAsteroid()
        }
        asteroids = tempA.concat(asteroids);
        tempA = []
        if (ship.lives < 1) {
            explosionSound.play();
        }
    }
}

function mousePressed() {
    userStartAudio();
}