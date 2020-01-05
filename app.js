const canvas = document.querySelector("canvas");
const w = Math.floor(innerWidth / 1.3);
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
  constructor(x, y, r, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.r, Math.PI * 2, false);
    c.strokeStyle = this.color;
    c.stroke();
    c.closePath();
  }

  update() {
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
  for (let i = 0; i < 4; i++) {
    const r = 50;
    const x = randomInt(r, w - r);
    const y = randomInt(r, h - r);

    particles.push(new Circle(x, y, r, "red"));

    if (particles[i - 1]) {
      const prevData = particles[i - 1];
      const data = particles[i];

      if (getDistance(data.x, data.y, prevData.x, prevData.y) - r * 2 < 0) {
        particles[i].x = randomInt(r, w - r);
        particles[i].y = randomInt(r, h - r);
      }
    }
  }
})();

(function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => particle.update());
})();
