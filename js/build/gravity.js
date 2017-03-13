"use strict";

var gravity = 20;
var FPS = 10;
var SIZE_MULTIPLIER = .6;
var DAMPING = 0;

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

        this.coords.x += 0;
        this.coords.y += 0;
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
                    x: this.velocity.x * (1 - DAMPING / 100000) + a.x,
                    y: this.velocity.y * (1 - DAMPING / 100000) + a.y
                };
            }

            //        this.coords.x += this.velocity.x*FPS/30;
            //        this.coords.y += this.velocity.y*FPS/30;
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

    saves.manyRepellersRandom();

    //    setInterval(function () {
    //        updatePositions()
    //    }, 1000 / FPS);
    //
    //    setInterval(function () {
    //        redraw();
    //    }, 1000 / FPS);
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
    ctx.clearRect(-2000, -2000, 4000, 4000);
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
//var timestamps = [0];
function repeat(time) {
    //    timestamps.push(time);
    updatePositions();
    redraw();
    window.requestAnimationFrame(repeat);
    //    var n = timestamps.length -1;
    //    console.log(1000/ (timestamps[n] - timestamps[n-1]));
}

window.requestAnimationFrame(repeat);

var saves = {
    singleOrbiter: function singleOrbiter() {
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
    },
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
    },
    manyRepellers: function manyRepellers() {
        fixedBodies.push(new FixedBody(30, { x: -300, y: -300 }, true));
        fixedBodies.push(new FixedBody(30, { x: 300, y: -300 }, true));
        fixedBodies.push(new FixedBody(30, { x: -300, y: 300 }, true));
        fixedBodies.push(new FixedBody(30, { x: 300, y: 300 }, true));
        fixedBodies.push(new FixedBody(30, { x: 450, y: 0 }, true));
        fixedBodies.push(new FixedBody(30, { x: -450, y: 0 }, true));
        fixedBodies.push(new FixedBody(30, { x: 0, y: 450 }, true));
        fixedBodies.push(new FixedBody(30, { x: 0, y: -450 }, true));
        fixedBodies.push(new FixedBody(20, { x: 60, y: 30 }, true));
        for (var a = 0; a < 30; a++) {
            for (var b = 0; b < 30; b++) {
                movableBodies.push(new MovableBody(5, { x: -200.5 + a * 15 + Math.random() * .5, y: -200.5 + b * 15 + Math.random() * .5 }, { x: 0, y: 0 }, false));
            }
        }
    },
    manyRepellersRandom: function manyRepellersRandom() {
        //        for (let a = 0; a < 3; a++) {
        //            fixedBodies.push(new FixedBody(10 + Math.random()*30, {x: -500 + Math.random()*1000,y: -500 + Math.random()*1000}, true));    
        //        }

        fixedBodies.push(new FixedBody(20 + Math.random() * 5, { x: -500 + Math.random() * 100, y: -500 + Math.random() * 100 }, true));
        fixedBodies.push(new FixedBody(20 + Math.random() * 5, { x: -300 + Math.random() * 100, y: 300 + Math.random() * 100 }, true));
        fixedBodies.push(new FixedBody(20 + Math.random() * 5, { x: 400 + Math.random() * 100, y: -200 + Math.random() * 100 }, true));

        for (var a = 0; a < 50; a++) {
            for (var b = 0; b < 50; b++) {
                movableBodies.push(new MovableBody(5, { x: -500.5 + a * 20 + Math.random() * .5, y: -500.5 + b * 20 + Math.random() * .5 }, { x: 0, y: 0 }, false));
            }
        }
    },
    oneAttractorManyPlanets: function oneAttractorManyPlanets() {
        //        for (let a = 0; a < 3; a++) {
        //            fixedBodies.push(new FixedBody(10 + Math.random()*30, {x: -500 + Math.random()*1000,y: -500 + Math.random()*1000}, true));    
        //        }

        fixedBodies.push(new FixedBody(20 + Math.random() * 5, { x: -100 + Math.random() * 200, y: -100 + Math.random() * 200 }, false));

        for (var a = 0; a < 50; a++) {
            for (var b = 0; b < 50; b++) {
                movableBodies.push(new MovableBody(5, { x: -500.5 + a * 20 + Math.random() * .5, y: -500.5 + b * 20 + Math.random() * .5 }, { x: 2, y: 0 }, false));
            }
        }
    },
    oneAttractorManyPlanets2: function oneAttractorManyPlanets2() {
        //        for (let a = 0; a < 3; a++) {
        //            fixedBodies.push(new FixedBody(10 + Math.random()*30, {x: -500 + Math.random()*1000,y: -500 + Math.random()*1000}, true));    
        //        }

        fixedBodies.push(new FixedBody(30 + Math.random() * 5, { x: -100 + Math.random() * 200, y: -100 + Math.random() * 200 }, false));

        for (var a = 0; a < 25; a++) {
            for (var b = 0; b < 25; b++) {
                movableBodies.push(new MovableBody(5, { x: -300.5 + a * 4 + Math.random() * .5, y: -300.5 + b * 4 + Math.random() * .5 }, { x: 1, y: 0 }, false));
            }
        }
    },
    oneAttractorManyPlanets3: function oneAttractorManyPlanets3() {
        var origin = {
            x: -200,
            y: -200
        };
        var radius = 50;
        //        for (let a = 0; a < 3; a++) {
        //            fixedBodies.push(new FixedBody(10 + Math.random()*30, {x: -500 + Math.random()*1000,y: -500 + Math.random()*1000}, true));    
        //        }
        var layers = 10;
        var dotsPerLayer = 20;

        fixedBodies.push(new FixedBody(60 + Math.random() * 5, { x: -100 + Math.random() * 200, y: -100 + Math.random() * 200 }, false));

        for (var layer = 1; layer <= layers; layer++) {
            for (var a = 0; a < dotsPerLayer; a++) {
                movableBodies.push(new MovableBody(5, { x: origin.x + radius * (layer / layers) * Math.sin(a * 360 / dotsPerLayer / 180 * Math.PI), y: origin.y + radius * (layer / layers) * Math.cos(Math.PI * (a * 360 / dotsPerLayer) / 180) }, { x: 1, y: -1 }, false));
            }
            dotsPerLayer += 5;
        }
    }
};