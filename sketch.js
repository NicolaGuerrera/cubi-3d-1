/**
 * @typedef {import("./p5/types").Image} Image
 *
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

let copie = 25;

/** @type {Image} */
let planetTexture;

function preload() {
  planetTexture = loadImage("./planet.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight, "webgl");

  let distanza = 1000;
  for (let i = 0; i < copie; i++) {
    let cubo = {
      x: random(-distanza, distanza),
      y: random(-distanza, distanza),
      z: random(-distanza, distanza),
      size: 500,
      color: random(["red", "yellow", "blue", "green"]),
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
    noFill(); //riempimento
    stroke(cubo.color);
    strokeWeight(10);
    ellipse(0, 0, cubo.size);
    // torus(cubo.size / 2, cubo.size / 8);

    noStroke();
    texture(planetTexture);
    sphere(cubo.size / 4);

    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
