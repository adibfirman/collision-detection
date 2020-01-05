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
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    c.closePath();
  }

  update() {
    this.draw();
  }
}

function getDistance(x1, x2, y1, y2) {
  const xDistance = x2 - x1;
  const yDistance = y2 - y1;
  const powX = Math.pow(xDistance, 2);
  const powY = Math.pow(yDistance, 2);

  return Math.sqrt(powX + powY);
}

let circle1;
let circle2;
(function init() {
  circle1 = new Circle(100, 100, 50, "black");
  circle2 = new Circle(10, 10, 10, "aqua");
})();

(function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  circle1.update();
  circle2.update();

  circle2.x = mouse.x;
  circle2.y = mouse.y;

  const distanceObj = getDistance(circle1.x, circle2.x, circle1.y, circle2.y);

  if (distanceObj < circle1.r + circle2.r) {
    circle1.color = "aqua";
  } else circle1.color = "black";
})();
