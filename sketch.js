let particles = [];
let gravityOn = false;

function setup() {
  createCanvas(400, 400);

  for (let i = 0; i < 20; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  background(0, 25);

  for (let particle of particles) {
    particle.display();
    particle.update();
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    this.size = random(5, 15);
    this.gravity = createVector(0, 0.02);
  }

  update() {
    if (gravityOn) {
      this.acc.add(this.gravity);
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    if (this.pos.x > width || this.pos.x < 0) {
      this.vel.x *= -1;
    }
    if (this.pos.y > height || this.pos.y < 0) {
      this.vel.y *= -0.9;
      this.pos.y = constrain(this.pos.y, 0, height);
    }
  }

  display() {
    noStroke();
    fill(255, 150);
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}

function mousePressed() {
  particles.push(new Particle(mouseX, mouseY));
}

function keyPressed() {
  if (key === '1') {
    gravityOn = true;
  }
}
