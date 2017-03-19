"use strict";

var DEFAULT_UNIVERSE_SETTINGS = {
    gravity: 20,
    sizeMultiplier: 5,
    damping: 0,
    eraseTrails: false
};

var canvas,
    ctx,
    n = 0;

function Universe(settings) {

    var fixedBodies = [],
        movableBodies = [];

    this.addBody = function (bodySettings) {
        switch (bodySettings.type) {
            case "fixed":
                fixedBodies.push(new MovableBody(bodySettings.mass, bodySettings.coords, bodySettings.isRepeller));
                break;
            case "movable":
                movableBodies.push(new MovableBody(bodySettings.mass, bodySettings.coords, bodySettings.velocity, false));
                break;
            default:
                break;
        }
    };
}

function Body(mass, coords, velocity, isRepeller) {
    var self = this;
    this.id = n;
    this.isActive = true;
    n++;
    this.mass = mass;
    this.coords = coords;
    this.velocity = velocity;
    //    this.radius = this.mass * DEFAULT_UNIVERSE_SETTINGS.sizeMultiplier / 2;
    this.radius = DEFAULT_UNIVERSE_SETTINGS.sizeMultiplier * Math.pow(mass / Math.PI * (3 / 4), 1 / 3);
    this.isRepeller = isRepeller;
    //    this.fillStyle = `rgb(0,${Math.round(100 + Math.random()*155)},${Math.round(100 + Math.random()*155)})`;
    this.fillStyle = isRepeller ? "red" : "blue";

    this.draw = function () {
        ctx.fillStyle = this.fillStyle;
        ctx.beginPath();
        ctx.arc(this.coords.x, this.coords.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
    };

    this.draw();
}

function FixedBody(mass, coords, velocity, isRepeller) {
    Body.call(this, mass, coords, velocity, isRepeller);
    this.update = function () {

        this.velocity = {
            x: this.velocity.x * (1 - DEFAULT_UNIVERSE_SETTINGS.damping / 100000),
            y: this.velocity.y * (1 - DEFAULT_UNIVERSE_SETTINGS.damping / 100000)
        };

        this.coords.x += this.velocity.x;
        this.coords.y += this.velocity.y;
    };
}

function MovableBody(mass, coords, velocity, isRepeller) {
    Body.call(this, mass, coords, velocity, isRepeller);

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

        force.total = DEFAULT_UNIVERSE_SETTINGS.gravity * this.mass * other.mass / Math.pow(distance.total, 2);

        force.direction = Math.atan2(distance.y, distance.x);
        force.directionDegs = force.direction * 180 / Math.PI;

        return force;
    };

    this.update = function () {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = movableBodies[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var movableBody = _step.value;

                console.log(movableBody === this);
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

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = fixedBodies[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var fixedBody = _step2.value;

                var force = this.calcForceFromOther(fixedBody);
                var a = {};
                a.total = force.total / this.mass;
                a.x = -a.total * Math.cos(force.direction);
                a.x = fixedBody.isRepeller ? -a.x : a.x;
                a.y = -a.total * Math.sin(force.direction);
                a.y = fixedBody.isRepeller ? -a.y : a.y;
                this.velocity = {
                    x: this.velocity.x * (1 - DEFAULT_UNIVERSE_SETTINGS.damping / 100000) + a.x,
                    y: this.velocity.y * (1 - DEFAULT_UNIVERSE_SETTINGS.damping / 100000) + a.y
                };
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

        this.coords.x += this.velocity.x;
        this.coords.y += this.velocity.y;
    };
};

function MovableBodyV2(mass, coords, velocity, isRepeller, bodyList) {
    Body.call(this, mass, coords, velocity, isRepeller);

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

        force.total = DEFAULT_UNIVERSE_SETTINGS.gravity * this.mass * other.mass / Math.pow(distance.total, 2);

        force.direction = Math.atan2(distance.y, distance.x);
        force.directionDegs = force.direction * 180 / Math.PI;

        if (distance.total < 1.2 * (this.radius + other.radius)) {
            force.total = 0;
            console.log("too close");
        }

        return force;
    };

    this.update = function () {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = bodyList[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var otherBody = _step3.value;

                if (otherBody !== this && this.isActive && otherBody.isActive) {
                    var force = this.calcForceFromOther(otherBody);
                    var a = {};
                    a.total = force.total / this.mass;
                    a.x = -a.total * Math.cos(force.direction);
                    a.x = this.isRepeller !== otherBody.isRepeller ? -a.x : a.x;
                    a.y = -a.total * Math.sin(force.direction);
                    a.y = this.isRepeller !== otherBody.isRepeller ? -a.y : a.y;
                    this.velocity = {
                        x: this.velocity.x * (1 - DEFAULT_UNIVERSE_SETTINGS.damping / 100000) + a.x,
                        y: this.velocity.y * (1 - DEFAULT_UNIVERSE_SETTINGS.damping / 100000) + a.y
                    };
                    if (this.calcDistanceFrom(otherBody).total < this.radius + otherBody.radius) {
                        this.remove();
                        otherBody.remove();
                        this.combine(otherBody);

                        console.log(bodyList);
                    }
                }
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

        this.coords.x += this.velocity.x;
        this.coords.y += this.velocity.y;
    };

    this.remove = function () {
        this.isActive = false;
        var index = bodyList.indexOf(this);
        if (index > -1) {
            bodyList.splice(index, 1);
        }
    };

    this.combine = function (other) {
        var newCoords = this.coords;
        var newMass;
        var newVelocity = {
            x: (this.mass * this.velocity.x + other.mass * other.velocity.x) / (this.mass + other.mass),
            y: (this.mass * this.velocity.y + other.mass * other.velocity.y) / (this.mass + other.mass)
        };

        if (this.isRepeller === other.isRepeller) {
            newMass = this.mass + other.mass;
            console.log(newMass);
            bodyList.push(new MovableBodyV2(newMass, newCoords, newVelocity, this.isRepeller, bodyList));
        } else {
            if (this.mass > other.mass) {
                newMass = this.mass - other.mass;
                bodyList.push(new MovableBodyV2(newMass, newCoords, newVelocity, this.isRepeller, bodyList));
            } else if (this.mass < other.mass) {
                newMass = other.mass - this.mass;
                bodyList.push(new MovableBodyV2(newMass, newCoords, newVelocity, other.isRepeller, bodyList));
            }
        }

        console.log(this.mass + " + " + other.mass + " = " + newMass);
    };
};

var fixedBodies = [];
var movableBodies = [];
var movableBodiesV2 = [];
var sun, sun2, sun3, earth, mars;

$(document).ready(function () {

    //        fixedBodies.push(new FixedBody(30, {x: 0, y: 0}, {x: .2, y: .1}, false));

    //        movableBodies.push(new MovableBody(5, {x: -700, y: -200}, {x: 1, y: -1}, false));


});
var scale = 1;
var originx = 0;
var originy = 0;

var clickOrigin = {};
var clickDestination = {};

document.addEventListener("DOMContentLoaded", function (event) {
    initializeCanvas();

    // Redo
    canvas.onmousewheel = function (event) {
        ctx.clearRect(-5000, -5000, 10000, 10000);
        var mousex = event.clientX - canvas.offsetLeft;
        var mousey = event.clientY - canvas.offsetTop;
        var wheel = event.wheelDelta / 120; //n or -n

        var zoom = 1 + wheel / 6;

        ctx.translate(originx, originy);
        ctx.scale(zoom, zoom);
        ctx.translate(-(mousex / scale + originx - mousex / (scale * zoom)), -(mousey / scale + originy - mousey / (scale * zoom)));

        originx = mousex / scale + originx - mousex / (scale * zoom);
        originy = mousey / scale + originy - mousey / (scale * zoom);
        scale *= zoom;
    };
});

// resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvas, false);

/* --- Event functions --- */

function initializeCanvas() {
    canvas = document.getElementById("field");
    canvas.addEventListener("mousedown", onMouseDown, false);
    canvas.addEventListener("mouseup", onMouseUp, false);
    canvas.addEventListener('contextmenu', function (evt) {
        evt.preventDefault();
    }, false);
    ctx = canvas.getContext("2d");
    resizeCanvas();
}

function onMouseDown(e) {
    clickOrigin = {
        x: e.pageX,
        y: e.pageY
    };
}

function onMouseUp(e) {

    clickDestination = {
        x: e.pageX,
        y: e.pageY
    };

    // Right mouse button? If so, make a repeller
    var isRepeller = e.button === 2 ? true : false;

    var newVelocity = {
        x: clickDestination.x - clickOrigin.x,
        y: clickDestination.y - clickOrigin.y
    };

    movableBodiesV2.push(new MovableBodyV2(5, { x: clickOrigin.x, y: clickOrigin.y }, { x: newVelocity.x / 100, y: newVelocity.y / 100 }, isRepeller, movableBodiesV2));
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //    ctx.translate(window.innerWidth / 2, window.innerHeight / 2);
    ctx.imageSmoothingEnabled = true;
}

function updatePositions() {
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
        for (var _iterator4 = fixedBodies[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var fixedBody = _step4.value;

            fixedBody.update();
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

            movableBody.update();
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

    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
        for (var _iterator6 = movableBodiesV2[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var movableBody2 = _step6.value;

            movableBody2.update();
        }
    } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion6 && _iterator6.return) {
                _iterator6.return();
            }
        } finally {
            if (_didIteratorError6) {
                throw _iteratorError6;
            }
        }
    }
}

function redraw() {
    //        if (DEFAULT_UNIVERSE_SETTINGS.eraseTrails) ctx.clearRect(-2000, -2000, 4000, 4000);
    ctx.fillStyle = "rgba(0, 0, 0, .02)";
    ctx.fillRect(-2000, -2000, 4000, 4000);
    var _iteratorNormalCompletion7 = true;
    var _didIteratorError7 = false;
    var _iteratorError7 = undefined;

    try {
        for (var _iterator7 = fixedBodies[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var fixedBody = _step7.value;

            fixedBody.draw();
        }
    } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion7 && _iterator7.return) {
                _iterator7.return();
            }
        } finally {
            if (_didIteratorError7) {
                throw _iteratorError7;
            }
        }
    }

    var _iteratorNormalCompletion8 = true;
    var _didIteratorError8 = false;
    var _iteratorError8 = undefined;

    try {
        for (var _iterator8 = movableBodies[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            var movableBody = _step8.value;

            movableBody.draw();
        }
    } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion8 && _iterator8.return) {
                _iterator8.return();
            }
        } finally {
            if (_didIteratorError8) {
                throw _iteratorError8;
            }
        }
    }

    var _iteratorNormalCompletion9 = true;
    var _didIteratorError9 = false;
    var _iteratorError9 = undefined;

    try {
        for (var _iterator9 = movableBodiesV2[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
            var movableBody2 = _step9.value;

            movableBody2.draw();
        }
    } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion9 && _iterator9.return) {
                _iterator9.return();
            }
        } finally {
            if (_didIteratorError9) {
                throw _iteratorError9;
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
        fixedBodies.push(new FixedBody(30, { x: -1000, y: -1000 }, { x: .2, y: .1 }, false));

        movableBodies.push(new MovableBody(5, { x: -800, y: -800 }, { x: 1, y: -1 }, false));
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
        fixedBodies.push(new FixedBody(20 + Math.random() * 5, { x: -100 + Math.random() * 200, y: -100 + Math.random() * 200 }, false));

        for (var a = 0; a < 50; a++) {
            for (var b = 0; b < 50; b++) {
                movableBodies.push(new MovableBody(5, { x: -500.5 + a * 20 + Math.random() * .5, y: -500.5 + b * 20 + Math.random() * .5 }, { x: 2, y: 0 }, false));
            }
        }
    },
    oneAttractorManyPlanets2: function oneAttractorManyPlanets2() {
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