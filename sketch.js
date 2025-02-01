
let attacks = [];
let planes = [];
let length = 1;
let orbLeft;
let biplane;
let nirmala;
let vegeta;
let score = 0;
let lives = 5;
let speed_l = 1;
let speed_r = -1;
let gameFont;

function preload() {
  // Load the handPose model
  gameFont = loadFont("8-bit-hud.ttf");
  orbLeft = loadImage("orb-left.gif");
  biplane = loadImage("biplane.png");
  nirmala = loadImage("nirmala.png");
  vegeta = loadImage("vegeta.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  imageMode(CENTER);
  for (let i = 0; i < 10; i++) {
    planes.push(new Plane(windowWidth - 50, random(100, windowHeight - 100), speed_r));
  }
}

function draw() {
  // Draw the webcam video
  background(0);
  if (lives == 0) {
    fill(255, 0, 0);
    textFont(gameFont, 25);
    textAlign(CENTER, CENTER);
    text("GAME OVER: PAY EXTRA TAX", 400, 400);
    textFont(gameFont, 25);
    textAlign(CENTER, BOTTOM);
    text("FINAL SCORE: " + score, 400, 600);
  } else if (lives > 0) {
    fill(255, 0, 0);
    textFont(gameFont, 12);
    textAlign(LEFT, TOP);
    text(`Score: ${score}`, 10, 10);
    text(`Lives: ${lives}`, 200, 10);

    image(vegeta, mouseX, mouseY, 200, 146);

    for (let i = 0; i < planes.length; i++) {
      planes[i].show();
      planes[i].move();

      if (planes[i].offScreen()) {
        planes.splice(i, 1);
        planes.push(new Plane(750, random(100, 700), speed_r));
        lives--;
      }

      if (attacks.length > 0) {
        attacks[0].show();
        attacks[0].move();

        let d = abs(dist(planes[i].x, planes[i].y, attacks[0].x, attacks[0].y));
        if (d < 100) {
          planes.splice(i, 1);
          planes.push(new Plane(750, random(100, 700), speed_r));
          attacks.splice(0, 1);
          score++;
          if (score % 10 == 0) {
            lives++;
            speed_r *= 1.25;
          }
        }
      }

      if (attacks.length > 0) {
        if (attacks[0].offScreen()) {
          attacks.splice(0, 1);
        }
      }
    }
  }
}

function mousePressed() {
  if (attacks.length == 0) {
    attacks.push(new Attack(mouseX, mouseY, speed_l));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Attack {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  move() {
    this.x += this.speed;
  }

  show() {
    image(orbLeft, this.x, this.y, 100, 86);
  }

  offScreen() {
    return this.x < 0;
  }
}

class Plane {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  move() {
    this.x += this.speed;
  }

  show() {
    image(nirmala, this.x, this.y, 100, 79);
  }

  offScreen() {
    return this.x > 800 || this.x < 0;
  }
}
