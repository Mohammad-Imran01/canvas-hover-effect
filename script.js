// import { method } from "../../../02. Programming/03. JavaScript/04. Jonas JavaScript/00. Master-Code/17-Modern-JS-Modules-Tooling/final/dist/script.0b6e4fd3";
'use strict'

// import { matches } from "../../../02. Programming/03. JavaScript/04. Jonas JavaScript/00. Master-Code/17-Modern-JS-Modules-Tooling/final/dist/script.0b6e4fd3";

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const particlesArray = []
let hue = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
  x: undefined,
  y: undefined,
};

// clear canvas
function cls() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
// Canvas shape won't change while window resize
window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

canvas.addEventListener('click', function (e) {
  mouse.x = e.x;
  mouse.y = e.y;

  for (let i = 0; i < 10; i++)
    particlesArray.push(new Particle());
});
window.addEventListener('mousemove', function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
  for (let i = 0; i < 3; i++)
    particlesArray.push(new Particle());
});

class Particle {
  constructor() {

    this.x = mouse.x;
    this.y = mouse.y;
    // this.x = Math.random() * canvas.width;
    // this.y = Math.random() * canvas.height;

    this.size = Math.random() * 15 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = 'hsl(' + hue + ', 100%, 50%)';
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.15;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
};

// function init() {
//   for (let i = 0; i < 100; i++) {
//     particlesArray.push(new Particle());
//   }
// }
// init();

function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    for (let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;

      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = particlesArray[i].color;
        ctx.lineWidth = 0.2;

        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }
    if (particlesArray[i].size <= 0.3) {
      particlesArray.splice(i, 1);
      console.log(particlesArray.length);
      i--;
    }
  }
}

function animate() {
  cls();
  // ctx.fillStyle = 'rbga(0,0,0,0.02)';
  // ctx.fillRect(0, 0, canvas.width, canvas.height)
  handleParticles();
  hue += 1;
  requestAnimationFrame(animate);
}
animate();


