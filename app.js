const canvas = document.querySelector("canvas");
const w = Math.floor(innerWidth / 2);
const h = Math.floor(innerHeight / 2);

const mouse = {
  x: 0,
  y: 0
};

window.addEventListener("resize", () => {
  canvas.width = w;
  canvas.height = h;
});

canvas.addEventListener("mousemove", e => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.x - rect.left;
  mouse.y = e.y - rect.top;
});

canvas.width = w;
canvas.height = h;

const c = canvas.getContext("2d");

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class Circle {
  constructor(x, y, r, dx, dy, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.r, Math.PI * 2, false);
    c.strokeStyle = this.color;
    c.stroke();
    c.closePath();
  }

  update(particles) {
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];
      const calcDist =
        getDistance(this.x, this.y, particle.x, particle.y) - this.r * 2;

      if (this === particle) continue;
      if (calcDist < 0) {
        console.log("has collided");
      }
    }

    if (this.x > w - this.r || this.x < this.r) this.dx = -this.dx;
    if (this.y > h - this.r || this.y < this.r) this.dy = -this.dy;

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

function getDistance(x1, y1, x2, y2) {
  const xDistance = x2 - x1;
  const yDistance = y2 - y1;
  const powX = Math.pow(xDistance, 2);
  const powY = Math.pow(yDistance, 2);

  return Math.sqrt(powX + powY);
}

let particles = [];
(function init() {
  for (let i = 0; i < 2; i++) {
    const r = 30;
    let x = randomInt(r, w - r);
    let y = randomInt(r, h - r);
    let dx = randomInt(1, 3);
    let dy = randomInt(-1, 3);

    if (i !== 0) {
      for (let j = 0; j < particles.length; j++) {
        const particle = particles[j];
        if (getDistance(x, y, particle.x, particle.y) - r * 2 < 0) {
          x = randomInt(r, w - r);
          y = randomInt(r, h - r);
          j = -1;
        }
      }
    }

    particles.push(new Circle(x, y, r, dx, dy, "red"));
  }
})();

(function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => particle.update(particles));
})();
