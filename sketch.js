/**
 * @typedef {import("./p5/types/index")} Graphics
 * @typedef {Object} Cubo
 * @property {number} x
 * @property {number} y
 * @property {number} z
 * @property {number} size
 * @property {number} color
 * @property {Function} rotationFunction
 */

//

/** @type {Cubo[]} */
let cubi = [];

let copie = 30;

/** @type {Graphics} */
let g;

function setup() {
  createCanvas(windowWidth, windowHeight, "webgl");

  g = createGraphics(100, 100);

  let distanza = 500;
  for (let i = 0; i < copie; i++) {
    let cubo = {
      x: random(-distanza, distanza),
      y: random(-distanza, distanza),
      z: random(-distanza, distanza),
      size: 500,
      color: random(["pink", "yellow", "blue"]),
      rotationFunction: random([rotateX, rotateY]),
    };
    cubi.push(cubo);
  }
}

function draw() {
  background(220);
  orbitControl();
  rotateY(frameCount * 0.001);
  noStroke();

  for (let cubo of cubi) {
    push();
    translate(cubo.x, cubo.y, cubo.z);

    let velocita = frameCount * 0.005;
    cubo.rotationFunction(velocita);
    rotateZ(velocita);

    //fill(cubo.color);
    box(cubo.size);
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
