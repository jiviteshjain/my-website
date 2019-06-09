function Ball(x, y, r, str) {
    var options = {
        angle: PI / 4,
        density: 10,
        restitution: 0.8,
        friction: 0.5
    };
    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
    this.str = str;
    World.add(world, this.body);

    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);

        ellipse(0, 0, this.r);

        textFont('Open Sans Condensed');
        text(this.str, 0, 0);

        pop();
    }
}

function Box(x, y, w, h, static) {
    var options = {
        isStatic: static
    };
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    World.add(world, this.body);

    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);

        rect(0, 0, this.w, this.h);

        pop();
    }
}



const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;

var engine;
var world;

var b;
var bounds = [];

function setup() {
    var canvas = createCanvas(400, 400);
    angleMode(RADIANS);
    ellipseMode(RADIUS);
    rectMode(CENTER);

    engine = Engine.create();
    world = engine.world;

    b = new Ball(200, 200, 20, 'sdjf');

    var g = new Box(width / 2, -50, width, 100, true);
    bounds.push(g);

    var g = new Box(width / 2, height + 50, width, 100, true);
    bounds.push(g);

    var g = new Box(-50, height / 2, 100, height, true);
    bounds.push(g);

    var g = new Box(width + 50, height / 2, 100, height, true);
    bounds.push(g);

    var canvasmouse = Mouse.create(canvas.elt);
    canvasmouse.pixelRatio = pixelDensity();
    options = {
        mouse: canvasmouse
    };
    var mConstraint = MouseConstraint.create(engine, options);
    World.add(world, mConstraint);

}

function draw() {
    background(220, 220, 220);
    Engine.update(engine, delta = 1000 / 60);
    b.show()
}