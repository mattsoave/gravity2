const gravity = 20;
const FPS = 10;
const SIZE_MULTIPLIER = .6;
const DAMPING = 0;

const DEFAULT_UNIVERSE_SETTINGS = {
    gravity: 20,
    sizeMultiplier: .6,
    damping: 0,
    eraseTrails: true
};

var canvas, ctx;

//function Universe(settings) {
//    
//    var fixedBodies = [],
//        movableBodies = [];
//    
//    this.addBody = function(bodySettings) {
//        switch (bodySettings.type) {
//            case "fixed":
//                fixedBodies.push(new MovableBody(bodySettings.mass, bodySettings.coords, bodySettings.isRepeller));
//                break;
//            case "movable":
//                movableBodies.push(new MovableBody(bodySettings.mass, bodySettings.coords, bodySettings.velocity, false));
//                break;
//            default:
//                break;
//        }
//    }
//}


function Body(mass, coords, velocity, isRepeller) {
    var self = this;
    this.mass = mass;
    this.coords = coords;
    this.velocity = velocity;
    this.radius = this.mass * DEFAULT_UNIVERSE_SETTINGS.sizeMultiplier / 2;
    this.isRepeller = isRepeller;
    this.fillStyle = `rgb(0,${Math.round(100 + Math.random()*155)},${Math.round(100 + Math.random()*155)})`;

    this.draw = function () {
        ctx.fillStyle = this.fillStyle;
        ctx.beginPath();
        ctx.arc(this.coords.x - this.radius, this.coords.y - this.radius, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
    }

    this.draw();
}

function FixedBody(mass, coords, velocity, isRepeller) {
    Body.call(this, mass, coords, velocity, isRepeller);
    this.update = function () {
        
        this.velocity = {
                x: this.velocity.x*(1 - DEFAULT_UNIVERSE_SETTINGS.damping/100000),
                y: this.velocity.y*(1 - DEFAULT_UNIVERSE_SETTINGS.damping/100000),
            }
        
        this.coords.x += this.velocity.x;
        this.coords.y += this.velocity.y;
    }
}

function MovableBody(mass, coords, velocity, isRepeller) {
    Body.call(this, mass, coords, velocity, isRepeller);


    this.calcDistanceFrom = function (other) {
        var distance = {};

        distance.x = this.coords.x - other.coords.x;
        distance.y = this.coords.y - other.coords.y;

        distance.total = Math.sqrt(Math.pow(distance.x, 2) + Math.pow(distance.y, 2));

        return distance;
    }

    this.calcForceFromOther = function (other) {
        
        var force = {};
        var distance = this.calcDistanceFrom(other);

        
        force.total = DEFAULT_UNIVERSE_SETTINGS.gravity * this.mass * other.mass / Math.pow(distance.total, 2);
        

        force.direction = Math.atan2(distance.y, distance.x);
        force.directionDegs = force.direction * 180 / Math.PI;
        
        return force;
    }

    this.update = function () {
        for (let fixedBody of fixedBodies) {
            //        for (let fixedBodyIndex = 0; fixedBodyIndex < fixedBodies.length; fixedBodyIndex++) {
            //            var other = fixedBodies[fixedBodyIndex];
            var force = this.calcForceFromOther(fixedBody);
            var a = {};
            a.total = force.total / this.mass;
            a.x = -a.total * Math.cos(force.direction);
            a.x = fixedBody.isRepeller ? -a.x : a.x;
            a.y = -a.total * Math.sin(force.direction);
            a.y = fixedBody.isRepeller ? -a.y : a.y;
            this.velocity = {
                x: this.velocity.x*(1 - DEFAULT_UNIVERSE_SETTINGS.damping/100000) + a.x,
                y: this.velocity.y*(1 - DEFAULT_UNIVERSE_SETTINGS.damping/100000) + a.y,
            }
            
        }

//        this.coords.x += this.velocity.x*FPS/30;
//        this.coords.y += this.velocity.y*FPS/30;
        this.coords.x += this.velocity.x;
        this.coords.y += this.velocity.y;


    }

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

//    saves.singleOrbiter();
    
    
        fixedBodies.push(new FixedBody(30, {x: 0, y: 0}, {x: .2, y: .1}, false));

//        movableBodies.push(new MovableBody(5, {x: -700, y: -200}, {x: 1, y: -1}, false));

     
    
    
    
    
    
    
    
//    setInterval(function () {
//        updatePositions()
//    }, 1000 / FPS);
//
//    setInterval(function () {
//        redraw();
//    }, 1000 / FPS);
});
var scale = 1;
var originx = 0;
var originy = 0;

var clickOrigin = {};
var clickDestination = {};

document.addEventListener("DOMContentLoaded", function (event) {
    initializeCanvas();
    
    // Redo
    canvas.onmousewheel = function (event){
        ctx.clearRect(-5000,-5000,10000,10000);
        var mousex = event.clientX - canvas.offsetLeft;
        var mousey = event.clientY - canvas.offsetTop;
        var wheel = event.wheelDelta/120;//n or -n
        
        var zoom = 1 + wheel/6;

        ctx.translate(
            originx,
            originy
        );
        ctx.scale(zoom,zoom);
        ctx.translate(
            -( mousex / scale + originx - mousex / ( scale * zoom ) ),
            -( mousey / scale + originy - mousey / ( scale * zoom ) )
        );

        originx = ( mousex / scale + originx - mousex / ( scale * zoom ) );
        originy = ( mousey / scale + originy - mousey / ( scale * zoom ) );
        scale *= zoom;
    }
});

// resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvas, false);

function initializeCanvas() {
    canvas = document.getElementById("field");
    canvas.addEventListener("mousedown", onMouseDown, false);
    canvas.addEventListener("mouseup", onMouseUp, false);
    ctx = canvas.getContext("2d");
    resizeCanvas();
}

function onMouseDown(e) {
    
    clickOrigin = {
        x: e.pageX,
        y: e.pageY
    };
    console.log(e);
//        movableBodies.push(new MovableBody(5, {x: 0, y: 0}, {x: Math.random()*2 - 1, y: Math.random()*2 - 1}, false));
}

function onMouseUp(e) {
    
    clickDestination = {
        x: e.pageX,
        y: e.pageY
    };
    
    var newVelocity = {
        x: clickDestination.x - clickOrigin.x,
        y: clickDestination.y - clickOrigin.y
    }
    
    console.log(newVelocity);
    movableBodies.push(new MovableBody(5 + Math.random()*10, {x: clickOrigin.x, y: clickOrigin.y}, {x: newVelocity.x / 100, y: newVelocity.y / 100}, false));
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
//    ctx.translate(window.innerWidth / 2, window.innerHeight / 2);
//    ctx.scale(.3,.3);
    ctx.imageSmoothingEnabled = true;
}

function updatePositions() {
    for (let fixedBody of fixedBodies) {
        fixedBody.update();
    }
    for (let movableBody of movableBodies) {
        movableBody.update();
    }
}

function redraw() {
        if (DEFAULT_UNIVERSE_SETTINGS.eraseTrails) ctx.clearRect(-2000, -2000, 4000, 4000);
    //    ctx.fillStyle = "rgba(0, 0, 0, .04)";
    //    ctx.fillRect(-1000, -1000, 2000, 2000);
    for (let fixedBody of fixedBodies) {
        fixedBody.draw();
    }
    for (let movableBody of movableBodies) {
        movableBody.draw();
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
    singleOrbiter: function() {
        fixedBodies.push(new FixedBody(30, {x: -1000, y: -1000}, {x: .2, y: .1}, false));

//        for (let a = 0; a < 1; a++) {
//            for (let b = 0; b < 1; b++) {
//                movableBodies.push(new MovableBody(5, {
//                    x: a * 5,
//                    y: 300 + b * 3
//                }, {
//                    x: 1 + .2 * (a / 20),
//                    y: -1 + 1 * (b / 30)
//                }, false));
//            }
//        }
        
        movableBodies.push(new MovableBody(5, {x: -800, y: -800}, {x: 1, y: -1}, false));
    },
    twoAttractors1: function () {
        fixedBodies.push(new FixedBody(30, {
            x: 0,
            y: 0
        }, false));
        fixedBodies.push(new FixedBody(10, {
            x: -300,
            y: -300
        }, false));

        for (let a = 0; a < 1; a++) {
            for (let b = 0; b < 30; b++) {
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
    attractorAndRepeller: function () {
        fixedBodies.push(new FixedBody(30, {
            x: 0,
            y: 0
        }, false));
        fixedBodies.push(new FixedBody(10, {
            x: -300,
            y: -300
        }, true));

        for (let a = 0; a < 1; a++) {
            for (let b = 0; b < 30; b++) {
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
    manyRepellers: function() {
        fixedBodies.push(new FixedBody(30, {x: -300,y: -300}, true));
        fixedBodies.push(new FixedBody(30, {x: 300,y: -300}, true));
        fixedBodies.push(new FixedBody(30, {x: -300,y: 300}, true));
        fixedBodies.push(new FixedBody(30, {x: 300,y: 300}, true));
        fixedBodies.push(new FixedBody(30, {x: 450,y: 0}, true));
        fixedBodies.push(new FixedBody(30, {x: -450,y: 0}, true));
        fixedBodies.push(new FixedBody(30, {x: 0,y: 450}, true));
        fixedBodies.push(new FixedBody(30, {x: 0,y: -450}, true));
        fixedBodies.push(new FixedBody(20, {x: 60,y: 30}, true));
        for (let a = 0; a < 30; a++) {
            for (let b = 0; b < 30; b++) {
                movableBodies.push(new MovableBody(5, {x: -200.5 + a*15 +  Math.random()*.5, y: -200.5 + b*15 + Math.random()*.5 }, {x: 0, y: 0}, false)); 
            }
        }
    },
    manyRepellersRandom: function() {
//        for (let a = 0; a < 3; a++) {
//            fixedBodies.push(new FixedBody(10 + Math.random()*30, {x: -500 + Math.random()*1000,y: -500 + Math.random()*1000}, true));    
//        }
        
        fixedBodies.push(new FixedBody(20 + Math.random()*5, {x: -500 + Math.random()*100,y: -500 + Math.random()*100}, true));    
        fixedBodies.push(new FixedBody(20 + Math.random()*5, {x: -300 + Math.random()*100,y: 300 + Math.random()*100}, true));    
        fixedBodies.push(new FixedBody(20 + Math.random()*5, {x: 400 + Math.random()*100,y: -200 + Math.random()*100}, true));    
        
        for (let a = 0; a < 50; a++) {
            for (let b = 0; b < 50; b++) {
                movableBodies.push(new MovableBody(5, {x: -500.5 + a*20 +  Math.random()*.5, y: -500.5 + b*20 + Math.random()*.5 }, {x: 0, y: 0}, false)); 
            }
        }
    },
    oneAttractorManyPlanets: function() {
//        for (let a = 0; a < 3; a++) {
//            fixedBodies.push(new FixedBody(10 + Math.random()*30, {x: -500 + Math.random()*1000,y: -500 + Math.random()*1000}, true));    
//        }
        
        fixedBodies.push(new FixedBody(20 + Math.random()*5, {x: -100 + Math.random()*200,y: -100 + Math.random()*200}, false));    
        
        for (let a = 0; a < 50; a++) {
            for (let b = 0; b < 50; b++) {
                movableBodies.push(new MovableBody(5, {x: -500.5 + a*20 +  Math.random()*.5, y: -500.5 + b*20 + Math.random()*.5 }, {x: 2, y: 0}, false)); 
            }
        }
    },
    oneAttractorManyPlanets2: function() {
//        for (let a = 0; a < 3; a++) {
//            fixedBodies.push(new FixedBody(10 + Math.random()*30, {x: -500 + Math.random()*1000,y: -500 + Math.random()*1000}, true));    
//        }
        
        fixedBodies.push(new FixedBody(30 + Math.random()*5, {x: -100 + Math.random()*200,y: -100 + Math.random()*200}, false));    
        
        for (let a = 0; a < 25; a++) {
            for (let b = 0; b < 25; b++) {
                movableBodies.push(new MovableBody(5, {x: -300.5 + a*4 +  Math.random()*.5, y: -300.5 + b*4 + Math.random()*.5 }, {x: 1, y: 0}, false)); 
            }
        }
    },
    oneAttractorManyPlanets3: function() {
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
        
        fixedBodies.push(new FixedBody(60 + Math.random()*5, {x: -100 + Math.random()*200,y: -100 + Math.random()*200}, false));    
        
        for (var layer = 1 ; layer <= layers; layer++) {
            for (let a = 0; a < dotsPerLayer; a++) {
                movableBodies.push(new MovableBody(5, {x: origin.x + radius*(layer/layers)*Math.sin((a*360/dotsPerLayer)/180 * Math.PI), y: origin.y + radius*(layer/layers)*Math.cos(Math.PI*(a*360/dotsPerLayer)/180)}, {x: 1, y: -1}, false)); 
            }
            dotsPerLayer += 5;
        }
    }
}