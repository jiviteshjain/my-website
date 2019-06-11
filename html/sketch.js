var t = 0;

window.onresize = function () {
    var mywidth = window.innerWidth;
    resizeCanvas(mywidth, 30);
}

function setup() {
    var mywidth = window.innerWidth;
    var canvas = createCanvas(mywidth, 30);

}

function draw() {
    background(255);
    noStroke();
    fill('#555555');

    beginShape();
    for (var x = 0; x < width; x = x + 0.1) {
        var y = map(noise(x / 400, t), 0, 1, 0, 40);
        vertex(x, height - y);
    }
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
    t = t + 0.005;
}