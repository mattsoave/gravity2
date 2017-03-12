"use strict";

var gravity = 20;
var FPS = 200;
var SIZE_MULTIPLIER = .6;

var canvas, ctx;

function Body(mass, coords, isRepeller) {
    var self = this;
    //    this.$el = $("<div></div>");
    this.coords = coords;
    this.mass = mass;
    this.radius = this.mass * SIZE_MULTIPLIER / 2;
    console.log(this.radius);
    this.isRepeller = isRepeller;
    this.fillStyle = "rgb(0," + Math.round(100 + Math.random() * 155) + "," + Math.round(100 + Math.random() * 155) + ")";
    this.createEl = function () {
        //        this.$el.appendTo($("body"));
        //        this.$el.addClass("body");
        //        this.$el.css({
        //            "top": 500 - self.coords.y,
        //            "left": 800 + self.coords.x,
        //            "height": this.radius,
        //            "width": this.radius
        //        });


        this.draw();
    };

    this.draw = function () {
        ctx.fillStyle = this.fillStyle;
        ctx.beginPath();
        ctx.arc(this.coords.x - this.radius, this.coords.y - this.radius, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
    };

    this.createEl();
}

function FixedBody(mass, coords, isRepeller) {
    Body.call(this, mass, coords, isRepeller);
    //        this.$el.addClass(isRepeller ? "repeller" : "sun");
    this.update = function () {

        this.coords.x += .1;
        this.coords.y += .05;
    };
}

function MovableBody(mass, coords, velocity, isRepeller) {
    Body.call(this, mass, coords, isRepeller);
    //    this.$el.addClass("planet");
    //    this.$el.css({ 
    //            "background-color": `rgb(0,${Math.round(100 + Math.random()*155)},${Math.round(100 + Math.random()*155)})`
    //    });

    this.velocity = velocity;

    this.calcDistanceFrom = function (other) {
        var distance = {};

        distance.x = this.coords.x - other.coords.x;
        distance.y = this.coords.y - other.coords.y;

        distance.total = Math.sqrt(Math.pow(distance.x, 2) + Math.pow(distance.y, 2));

        return distance;
    };

    this.calcForceFromOther = function (other) {
        var force = {};
        var distance = this.calcDistanceFrom(other);

        force.total = gravity * this.mass * other.mass / Math.pow(distance.total, 2);

        force.direction = Math.atan2(distance.y, distance.x);
        force.directionDegs = force.direction * 180 / Math.PI;

        return force;
    };

    this.update = function () {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = fixedBodies[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var fixedBodyIndex = _step.value;

                //        for (let fixedBodyIndex = 0; fixedBodyIndex < fixedBodies.length; fixedBodyIndex++) {
                //            var other = fixedBodies[fixedBodyIndex];
                var other = fixedBodyIndex;
                var force = this.calcForceFromOther(other);
                var a = {};
                a.total = force.total / this.mass;
                a.x = -a.total * Math.cos(force.direction);
                a.x = other.isRepeller ? -a.x : a.x;
                a.y = -a.total * Math.sin(force.direction);
                a.y = other.isRepeller ? -a.y : a.y;
                this.velocity = {
                    x: this.velocity.x + a.x,
                    y: this.velocity.y + a.y
                };
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        this.coords.x += this.velocity.x;
        this.coords.y += this.velocity.y;

        //        this.$el.css({
        //            top: 500 - this.coords.y,
        //            left: 800 + this.coords.x
        //        });
    };
};

var fixedBodies = [];
var movableBodies = [];
var sun, sun2, sun3, earth, mars;

$(document).ready(function () {

    //    fixedBodies.push(new FixedBody(15, {
    //        x: 0,
    //        y: -100
    //    }, true));
    //
    //    fixedBodies.push(new FixedBody(10, {
    //        x: 300,
    //        y: 400
    //    }, true));
    //
    //    fixedBodies.push(new FixedBody(10, {
    //        x: -300,
    //        y: 400
    //    }, true));

    //    fixedBodies.push(new FixedBody(30, {x: -300,y: -300}, true));
    //    fixedBodies.push(new FixedBody(30, {x: 300,y: -300}, true));
    //    fixedBodies.push(new FixedBody(30, {x: -300,y: 300}, true));
    //    fixedBodies.push(new FixedBody(30, {x: 300,y: 300}, true));
    //    fixedBodies.push(new FixedBody(30, {x: 450,y: 0}, true));
    //    fixedBodies.push(new FixedBody(60, {x: -450,y: 0}, true));
    //    fixedBodies.push(new FixedBody(30, {x: 0,y: 450}, true));
    //    fixedBodies.push(new FixedBody(30, {x: 0,y: -450}, true));
    //    fixedBodies.push(new FixedBody(20, {x: 0,y: 0}, true));


    //    movableBodies.push(new MovableBody(5, {
    //        x: 50,
    //        y: 200
    //    }, {
    //        x: 0,
    //        y: 0
    //    }, false));
    //    
    //    movableBodies.push(new MovableBody(5, {
    //        x: 0,
    //        y: 0
    //    }, {
    //        x: -1,
    //        y: 1
    //    }, false));


    //    for (let a = 0; a < 20; a++) {
    //        movableBodies.push(new MovableBody(5, {x: 0, y: 180}, {x: -1.3 + a*(2/10), y: 0}, false));
    //    }

    //    for (let a = 0; a < 20; a++) {
    //        movableBodies.push(new MovableBody(5, {x: a*10, y: 200}, {x: 1, y: -.5}, false)); 
    //    }

    //    movableBodies.push(new MovableBody(5, {x: 40, y: 180}, {x: 0, y: 0}, false));
    //    movableBodies.push(new MovableBody(10, {x: 200, y: 180}, {x: 0, y: 0}, false));

    //    saves.attractorAndRepeller();


    fixedBodies.push(new FixedBody(30, {
        x: 0,
        y: 0
    }, false));

    for (var a = 0; a < 1; a++) {
        for (var b = 0; b < 1; b++) {
            //            movableBodies.push(new MovableBody(2 + Math.random()*10, {x: a*5, y: b*20 + 250}, {x: 1 , y: 0}, false));    
            //            movableBodies.push(new MovableBody(2 + Math.random()*10, {x: a*5, y: 300}, {x: 1 , y: -.5 + .1*b}, false));    
            movableBodies.push(new MovableBody(5, {
                x: a * 5,
                y: 300 + b * 3
            }, {
                x: 1 + .2 * (a / 20),
                y: -1 + 1 * (b / 30)
            }, false));
        }
    }

    setInterval(function () {
        updatePositions();
    }, 1000 / FPS);

    setInterval(function () {
        redraw();
    }, 1000 / FPS);
});

document.addEventListener("DOMContentLoaded", function (event) {
    initializeCanvas();
});

// resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvas, false);

function initializeCanvas() {
    canvas = document.getElementById("field");
    ctx = canvas.getContext("2d");
    resizeCanvas();
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.translate(window.innerWidth / 2, window.innerHeight / 2);
    ctx.imageSmoothingEnabled = true;
}

function updatePositions() {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = fixedBodies[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var fixedBody = _step2.value;

            fixedBody.update();
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = movableBodies[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var movableBody = _step3.value;

            movableBody.update();
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }
}

function redraw() {
    //    ctx.clearRect(0, 0, 1000, 1000);
    //    ctx.fillStyle = "rgba(0, 0, 0, .04)";
    //    ctx.fillRect(-1000, -1000, 2000, 2000);
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
        for (var _iterator4 = fixedBodies[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var fixedBody = _step4.value;

            fixedBody.draw();
        }
    } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
            }
        } finally {
            if (_didIteratorError4) {
                throw _iteratorError4;
            }
        }
    }

    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
        for (var _iterator5 = movableBodies[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var movableBody = _step5.value;

            movableBody.draw();
        }
    } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion5 && _iterator5.return) {
                _iterator5.return();
            }
        } finally {
            if (_didIteratorError5) {
                throw _iteratorError5;
            }
        }
    }
}

var saves = {
    twoAttractors1: function twoAttractors1() {
        fixedBodies.push(new FixedBody(30, {
            x: 0,
            y: 0
        }, false));
        fixedBodies.push(new FixedBody(10, {
            x: -300,
            y: -300
        }, false));

        for (var a = 0; a < 1; a++) {
            for (var b = 0; b < 30; b++) {
                //            movableBodies.push(new MovableBody(2 + Math.random()*10, {x: a*5, y: b*20 + 250}, {x: 1 , y: 0}, false));    
                //            movableBodies.push(new MovableBody(2 + Math.random()*10, {x: a*5, y: 300}, {x: 1 , y: -.5 + .1*b}, false));    
                movableBodies.push(new MovableBody(5, {
                    x: a * 5,
                    y: 300 + b * 3
                }, {
                    x: 1 + .2 * (a / 20),
                    y: -1 + 1 * (b / 30)
                }, false));
            }
        }
    },
    attractorAndRepeller: function attractorAndRepeller() {
        fixedBodies.push(new FixedBody(30, {
            x: 0,
            y: 0
        }, false));
        fixedBodies.push(new FixedBody(10, {
            x: -300,
            y: -300
        }, true));

        for (var a = 0; a < 1; a++) {
            for (var b = 0; b < 30; b++) {
                //            movableBodies.push(new MovableBody(2 + Math.random()*10, {x: a*5, y: b*20 + 250}, {x: 1 , y: 0}, false));    
                //            movableBodies.push(new MovableBody(2 + Math.random()*10, {x: a*5, y: 300}, {x: 1 , y: -.5 + .1*b}, false));    
                movableBodies.push(new MovableBody(5, {
                    x: a * 5,
                    y: 300 + b * 3
                }, {
                    x: 1 + .2 * (a / 20),
                    y: -1 + 1 * (b / 30)
                }, false));
            }
        }
    }

};