var waitForFinalEvent = (function() {
  var timers = {};
  return function(callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout(timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();

function Ball(x, y, r, str, rgbcolor, small = false) {
  var options = {
    angle: PI / 4,
    density: 10,
    restitution: 0.6,
    friction: 0.5
  };
  this.body = Bodies.circle(x, y, r, options);
  this.r = r;
  this.str = str;
  World.add(world, this.body);

  this.show = function() {
    var pos = this.body.position;
    var angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);

    strokeWeight(5);
    stroke(...rgbcolor);
    ellipse(0, 0, this.r);

    noStroke();
    fill(...rgbcolor);
    // textStyle(BOLD);
    textFont("Open Sans Condensed");
    textAlign(CENTER, CENTER);
    textSize(18);
    if (small) {
      textSize(15);
      textStyle(BOLD);
    }
    var side = Math.sqrt(2) * this.r;
    text(this.str, 0, 0, side, side);

    pop();
  };
}

function Box(x, y, w, h, static) {
  var options = {
    isStatic: static,
    friction: 0.5,
    restitution: 0.6
  };
  this.body = Bodies.rectangle(x, y, w, h, options);
  this.w = w;
  this.h = h;
  World.add(world, this.body);

  this.show = function() {
    var pos = this.body.position;
    var angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);

    rect(0, 0, this.w, this.h);

    pop();
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
  var canvaswidth = $("#sketch-holder").width() - 30;
  var canvasheight = window.innerHeight - 110;

  // if (window.innerWidth <= 810) {
  //     canvasheight = canvasheight * 1.1;
  // } else {
  //     canvasheight = canvasheight - 150;
  // }
  return [canvaswidth, canvasheight];
}

var mywidth = $(window).width();
$(window).resize(function() {
  if ($(this).width() != mywidth) {
    mywidth = $(this).width();
    waitForFinalEvent(
      function() {
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

function addBodies() {
  // Edge Boundaries
  var g = new Box(width / 2, -46, width, 100, true);
  bounds.push(g);

  var g = new Box(width / 2, height + 46, width, 100, true);
  bounds.push(g);

  var g = new Box(-46, height / 2, 100, height, true);
  bounds.push(g);

  var g = new Box(width + 46, height / 2, 100, height, true);
  bounds.push(g);

  // Balls for Achievements
  var b = new Ball(
    -20 + width / 2,
    50,
    65,
    "Qualified for ACM-ICPC 2018 Regionals".toUpperCase(),
    rgbPink
  );
  achievements.push(b);

  var b = new Ball(
    20 + width / 2,
    50,
    55,
    "Founder's Trophy 2018".toUpperCase(),
    rgbPink
  );
  achievements.push(b);

  var b = new Ball(
    -40 + width / 2,
    50,
    60,
    "Dhananjay Mohan Award 2018".toUpperCase(),
    rgbPink
  );
  achievements.push(b);

  var b = new Ball(
    40 + width / 2,
    50,
    75,
    "Scholarship to attend a language course in Germany by the Goethe Institute".toUpperCase(),
    rgbPink,
    true
  );
  achievements.push(b);

  var b = new Ball(
    -60 + width / 2,
    50,
    62,
    "School top-scorer in AISSCE 2018".toUpperCase(),
    rgbPink
  );
  achievements.push(b);

  var b = new Ball(
    60 + width / 2,
    50,
    70,
    "Gold Medallist in Physics at Amity Int'l Science Olympiad'17".toUpperCase(),
    rgbPink,
    true
  );
  achievements.push(b);

  var b = new Ball(
    -40 + width / 2,
    70,
    75,
    "Level C2 on CEFR in English by Cambridge English Language Assessment".toUpperCase(),
    rgbPink,
    true
  );
  achievements.push(b);

  var b = new Ball(
    40 + width / 2,
    70,
    65,
    "Level A2 on CEFR in German by the Goethe Institute".toUpperCase(),
    rgbPink,
    true
  );
  achievements.push(b);

  var b = new Ball(
    -60 + width / 2,
    70,
    65,
    "JEE (Mains): 564\nJEE (Adv.): 2156".toUpperCase(),
    rgbPink
  );
  achievements.push(b);

  // Balls for Involvements
  var b = new Ball(
    -80 + width / 2,
    50,
    65,
    "Head of Web Dev at Metaverse (Amity's Cyber Society)".toUpperCase(),
    rgbGrey,
    true
  );
  involvements.push(b);

  var b = new Ball(
    80 + width / 2,
    50,
    60,
    "Illustrator for Ping! (IIIT's students' magazine)".toUpperCase(),
    rgbGrey,
    true
  );
  involvements.push(b);

  var b = new Ball(
    -20 + width / 2,
    70,
    65,
    "Core member of Tech Team of E-Cell of IIIT".toUpperCase(),
    rgbGrey
  );
  involvements.push(b);

  var b = new Ball(
    20 + width / 2,
    70,
    55,
    "Member of Alumni Cell of IIIT".toUpperCase(),
    rgbGrey
  );
  involvements.push(b);

  // Balls for Skills
  var b = new Ball(-80 + width / 2, 70, 30, "C/C++".toUpperCase(), rgbGreen);
  skills.push(b);

  var b = new Ball(80 + width / 2, 70, 40, "Python".toUpperCase(), rgbGreen);
  skills.push(b);

  var b = new Ball(
    -20 + width / 2,
    30,
    40,
    "Bash Scripting".toUpperCase(),
    rgbGreen
  );
  skills.push(b);

  var b = new Ball(
    20 + width / 2,
    30,
    55,
    "Data Structures and Algorithms".toUpperCase(),
    rgbGreen,
    true
  );
  skills.push(b);

  var b = new Ball(
    -40 + width / 2,
    30,
    65,
    "Front-End Web Dev with HTML, CSS, JS and associated Frameworks".toUpperCase(),
    rgbGreen,
    true
  );
  skills.push(b);

  var b = new Ball(
    40 + width / 2,
    30,
    51,
    "Back-End Web Dev with Python".toUpperCase(),
    rgbGreen,
    true
  );
  skills.push(b);

  var b = new Ball(
    -60 + width / 2,
    30,
    40,
    "x86-64 Assembly".toUpperCase(),
    rgbGreen
  );
  skills.push(b);

  var b = new Ball(
    60 + width / 2,
    30,
    40,
    "ARM-v7 Assembly".toUpperCase(),
    rgbGreen
  );
  skills.push(b);

  var b = new Ball(-80 + width / 2, 30, 42, "Arduino".toUpperCase(), rgbGreen);
  skills.push(b);

  var b = new Ball(
    80 + width / 2,
    30,
    60,
    "Cortex M4 Microcontrollers".toUpperCase(),
    rgbGreen,
    true
  );
  skills.push(b);

  var b = new Ball(-20 + width / 2, 90, 30, "Git".toUpperCase(), rgbGreen);
  skills.push(b);

  var b = new Ball(
    20 + width / 2,
    90,
    45,
    "Sketching and Painting".toUpperCase(),
    rgbGreen,
    true
  );
  skills.push(b);

  var b = new Ball(
    -40 + width / 2,
    90,
    50,
    "Debating and writing".toUpperCase(),
    rgbGreen,
    true
  );
  skills.push(b);
}

function setup() {
  frameRate(60);
  var canvasheight, canvaswidth;
  [canvaswidth, canvasheight] = canvasSize();
  var canvas = createCanvas(canvaswidth, canvasheight);
  canvas.style("display", "block");
  canvas.parent("sketch-holder");

  angleMode(RADIANS);
  ellipseMode(RADIUS);
  rectMode(CENTER);

  engine = Engine.create();
  world = engine.world;

  var canvasmouse = Mouse.create(canvas.elt);
  canvasmouse.pixelRatio = pixelDensity();
  options = {
    mouse: canvasmouse
  };
  var mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);

  // b = new Ball(200, 200, 50, 'sdjf', [233, 30, 90]);
  addBodies();
}

function draw() {
  background(255);
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
