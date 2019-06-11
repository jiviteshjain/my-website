var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout(timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();

function Ball(p, x, y, r, str, rgbcolor, small = false) {
  var options = {
    density: 10,
    restitution: 0.6,
    friction: 0.5
  };
  this.body = Bodies.circle(x, y, r, options);
  this.r = r;
  this.str = str;
  this.p = p;
  World.add(world, this.body);

  this.show = function () {
    var p = this.p;
    var pos = this.body.position;
    var angle = this.body.angle;

    p.push();
    p.translate(pos.x, pos.y);
    p.rotate(angle);

    p.strokeWeight(5);
    p.stroke(...rgbcolor);
    p.ellipse(0, 0, this.r);

    p.noStroke();
    p.fill(...rgbcolor);
    // textStyle(BOLD);
    p.textFont("Open Sans Condensed");
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(18);
    if (small) {
      p.textSize(15);
      p.textStyle(p.BOLD);
    }
    var side = Math.sqrt(2) * this.r;
    p.text(this.str, 0, 0, side, side);

    p.pop();
  };
}

function Box(p, x, y, w, h, static) {
  var options = {
    isStatic: static,
    friction: 0.5,
    restitution: 0.6
  };
  this.body = Bodies.rectangle(x, y, w, h, options);
  this.w = w;
  this.h = h;
  this.p = p;
  World.add(world, this.body);

  this.show = function () {
    var p = this.p;
    var pos = this.body.position;
    var angle = this.body.angle;

    p.push();
    p.translate(pos.x, pos.y);
    p.rotate(angle);

    p.rect(0, 0, this.w, this.h);

    p.pop();
  };
}

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;

var engine;
var world;

var bounds = [];
var achievements = [];
var involvements = [];
var skills = [];

const rgbPink = [233, 30, 90];
const rgbGreen = [0, 131, 143];
const rgbGrey = [80, 80, 80];

function canvasSize() {
  var canvaswidth = $("#sketch-holder").width() - 15;
  var canvasheight = window.innerHeight - 110;

  // if (window.innerWidth <= 810) {
  //     canvasheight = canvasheight * 1.1;
  // } else {
  //     canvasheight = canvasheight - 150;
  // }
  return [canvaswidth, canvasheight];
}

var mywidth = $(window).width();
$(window).resize(function () {
  if ($(this).width() != mywidth) {
    mywidth = $(this).width();
    waitForFinalEvent(
      function () {
        alert(
          "Page will be reloaded to resize and re-render the physics engine."
        );
        location.reload();
      },
      500,
      "sketchresize"
    );
  }
});

function addBodies(p) {
  // Edge Boundaries
  let width = p.width;
  let height = p.height;
  var g = new Box(p, width / 2, -46, width, 100, true);
  bounds.push(g);

  var g = new Box(p, width / 2, height + 46, width, 100, true);
  bounds.push(g);

  var g = new Box(p, -46, height / 2, 100, height, true);
  bounds.push(g);

  var g = new Box(p, width + 46, height / 2, 100, height, true);
  bounds.push(g);

  // Balls for Achievements
  var b = new Ball(
    p,
    -20 + width / 2,
    50,
    65,
    "Qualified for ACM-ICPC 2018 Regionals".toUpperCase(),
    rgbPink
  );
  achievements.push(b);

  var b = new Ball(
    p,
    20 + width / 2,
    50,
    55,
    "Founder's Trophy 2018".toUpperCase(),
    rgbPink
  );
  achievements.push(b);

  var b = new Ball(
    p,
    -40 + width / 2,
    50,
    60,
    "Dhananjay Mohan Award 2018".toUpperCase(),
    rgbPink
  );
  achievements.push(b);

  var b = new Ball(
    p,
    40 + width / 2,
    50,
    75,
    "Scholarship to attend a language course in Germany by the Goethe Institute".toUpperCase(),
    rgbPink,
    true
  );
  achievements.push(b);

  var b = new Ball(
    p,
    -60 + width / 2,
    50,
    62,
    "School top-scorer in AISSCE 2018".toUpperCase(),
    rgbPink
  );
  achievements.push(b);

  var b = new Ball(
    p,
    60 + width / 2,
    50,
    70,
    "Gold Medallist in Physics at Amity Int'l Science Olympiad'17".toUpperCase(),
    rgbPink,
    true
  );
  achievements.push(b);

  var b = new Ball(
    p,
    -40 + width / 2,
    70,
    75,
    "Level C2 on CEFR in English by Cambridge English Language Assessment".toUpperCase(),
    rgbPink,
    true
  );
  achievements.push(b);

  var b = new Ball(
    p,
    40 + width / 2,
    70,
    65,
    "Level A2 on CEFR in German by the Goethe Institute".toUpperCase(),
    rgbPink,
    true
  );
  achievements.push(b);

  var b = new Ball(
    p,
    -60 + width / 2,
    70,
    65,
    "JEE (Mains): 564\nJEE (Adv.): 2156".toUpperCase(),
    rgbPink
  );
  achievements.push(b);

  // Balls for Involvements
  var b = new Ball(
    p,
    -80 + width / 2,
    50,
    65,
    "Head of Web Dev at Metaverse (Amity's Cyber Society)".toUpperCase(),
    rgbGrey,
    true
  );
  involvements.push(b);

  var b = new Ball(
    p,
    80 + width / 2,
    50,
    60,
    "Illustrator for Ping! (IIIT's students' magazine)".toUpperCase(),
    rgbGrey,
    true
  );
  involvements.push(b);

  var b = new Ball(
    p,
    -20 + width / 2,
    70,
    65,
    "Core member of Tech Team of E-Cell of IIIT".toUpperCase(),
    rgbGrey
  );
  involvements.push(b);

  var b = new Ball(
    p,
    20 + width / 2,
    70,
    55,
    "Member of Alumni Cell of IIIT".toUpperCase(),
    rgbGrey
  );
  involvements.push(b);

  // Balls for Skills
  var b = new Ball(p, -80 + width / 2, 70, 30, "C/C++".toUpperCase(), rgbGreen);
  skills.push(b);

  var b = new Ball(p, 80 + width / 2, 70, 40, "Python".toUpperCase(), rgbGreen);
  skills.push(b);

  var b = new Ball(
    p,
    -20 + width / 2,
    30,
    40,
    "Bash Scripting".toUpperCase(),
    rgbGreen
  );
  skills.push(b);

  var b = new Ball(
    p,
    20 + width / 2,
    30,
    55,
    "Data Structures and Algorithms".toUpperCase(),
    rgbGreen,
    true
  );
  skills.push(b);

  var b = new Ball(
    p,
    -40 + width / 2,
    30,
    65,
    "Front-End Web Dev with HTML, CSS, JS and associated Frameworks".toUpperCase(),
    rgbGreen,
    true
  );
  skills.push(b);

  var b = new Ball(
    p,
    40 + width / 2,
    30,
    51,
    "Back-End Web Dev with Python".toUpperCase(),
    rgbGreen,
    true
  );
  skills.push(b);

  var b = new Ball(
    p,
    -60 + width / 2,
    30,
    40,
    "x86-64 Assembly".toUpperCase(),
    rgbGreen
  );
  skills.push(b);

  var b = new Ball(
    p,
    60 + width / 2,
    30,
    40,
    "ARM-v7 Assembly".toUpperCase(),
    rgbGreen
  );
  skills.push(b);

  var b = new Ball(p, -80 + width / 2, 30, 42, "Arduino".toUpperCase(), rgbGreen);
  skills.push(b);

  var b = new Ball(
    p,
    80 + width / 2,
    30,
    60,
    "Cortex M4 Microcontrollers".toUpperCase(),
    rgbGreen,
    true
  );
  skills.push(b);

  var b = new Ball(p, -20 + width / 2, 90, 30, "Git".toUpperCase(), rgbGreen);
  skills.push(b);

  var b = new Ball(
    p,
    20 + width / 2,
    90,
    45,
    "Sketching and Painting".toUpperCase(),
    rgbGreen,
    true
  );
  skills.push(b);

  var b = new Ball(
    p,
    -40 + width / 2,
    90,
    50,
    "Debating and writing".toUpperCase(),
    rgbGreen,
    true
  );
  skills.push(b);
}

new p5(function (p) {
  p.setup = function () {
    p.frameRate(60);
    var canvasheight, canvaswidth;
    [canvaswidth, canvasheight] = canvasSize();
    var canvas = p.createCanvas(canvaswidth, canvasheight);
    // canvas.style("display", "block");
    canvas.parent("sketch-holder");

    p.angleMode(p.RADIANS);
    p.ellipseMode(p.RADIUS);
    p.rectMode(p.CENTER);

    engine = Engine.create();
    world = engine.world;

    var canvasmouse = Mouse.create(canvas.elt);
    canvasmouse.pixelRatio = p.pixelDensity();
    options = {
      mouse: canvasmouse
    };
    var mConstraint = MouseConstraint.create(engine, options);
    World.add(world, mConstraint);

    // b = new Ball(200, 200, 50, 'sdjf', [233, 30, 90]);
    addBodies(p);
  }

  p.draw = function () {
    p.background(255);
    Engine.update(engine, (delta = 1000 / 60));
    for (ball of achievements) {
      ball.show();
    }
    for (ball of involvements) {
      ball.show();
    }
    for (ball of skills) {
      ball.show();
    }
  }
}, 'sketch-holder');