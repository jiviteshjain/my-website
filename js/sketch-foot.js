new p5(function (p) {

    window.addEventListener('resize', function () {
        var mywidth = window.innerWidth;
        p.resizeCanvas(mywidth, 30);
    })
    var t = 0;
    p.setup = function () {
        var mywidth = window.innerWidth;
        var canvas = p.createCanvas(mywidth, 30);

    }

    p.draw = function () {
        p.background(255);
        p.noStroke();
        p.fill('#555555');

        p.beginShape();
        for (var x = 0; x < p.width; x = x + 0.1) {
            var y = p.map(p.noise(x / 400, t), 0, 1, 0, 30);
            p.vertex(x, p.height - y);
        }
        p.vertex(p.width, p.height);
        p.vertex(0, p.height);
        p.endShape(p.CLOSE);
        t = t + 0.005;
        if (t < 0) {
            t = 0;
        }
    }
}, 'footer-animation');