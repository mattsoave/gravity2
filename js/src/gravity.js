const gravity = 15;
const SIZE_MULTIPLIER = 1.6;


function Body(mass, coords, isRepeller) {
    var self = this;
    this.$el = $("<div></div>");
    this.coords = coords;
    this.mass = mass;
    this.isRepeller = isRepeller;
    this.createEl = function () {
        this.$el.appendTo($("body"));
        this.$el.addClass("body");
        this.$el.css({
            "top": 500 - self.coords.y,
            "left": 800 + self.coords.x,
            "height": self.mass * SIZE_MULTIPLIER,
            "width": self.mass * SIZE_MULTIPLIER
        });
    }

    this.createEl();
}

function FixedBody(mass, coords, isRepeller) {
        Body.call(this, mass, coords, isRepeller);
        this.$el.addClass(isRepeller ? "repeller" : "sun");
    }

function MovableBody(mass, coords, velocity, isRepeller) {
    Body.call(this, mass, coords, isRepeller);
    this.$el.addClass("planet");
    this.$el.css({ 
            "background-color": `rgb(0,${Math.round(100 + Math.random()*155)},${Math.round(100 + Math.random()*155)})`
    });

    this.velocity = velocity;

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

        force.total = gravity * this.mass * other.mass / Math.pow(distance.total, 2);

        force.direction = Math.atan2(distance.y, distance.x);
        force.directionDegs = force.direction * 180 / Math.PI;

        return force;
    }

    this.update = function () {
        for (let fixedBodyIndex of fixedBodies) {
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
                y: this.velocity.y + a.y,
            }
        }

        this.coords.x += this.velocity.x;
        this.coords.y += this.velocity.y;

        this.$el.css({
            top: 500 - this.coords.y,
            left: 800 + this.coords.x
        });
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
    
        fixedBodies.push(new FixedBody(30, {x: 0,y: 0}, false));
//        fixedBodies.push(new FixedBody(1, {x: -300,y: 300}, true));


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
    
    for (let a = 0; a < 1; a++) {
        for (let b = 0; b < 30; b++) {
//            movableBodies.push(new MovableBody(2 + Math.random()*10, {x: a*5, y: b*20 + 250}, {x: 1 , y: 0}, false));    
//            movableBodies.push(new MovableBody(2 + Math.random()*10, {x: a*5, y: 300}, {x: 1 , y: -.5 + .1*b}, false));    
            movableBodies.push(new MovableBody(2 + Math.random()*10, {x: a*5, y: 300}, {x: 1 , y: -1 + Math.random()*2}, false));    
        }
    }
    
//    movableBodies.push(new MovableBody(5, {x: 40, y: 180}, {x: 0, y: 0}, false));
//    movableBodies.push(new MovableBody(10, {x: 200, y: 180}, {x: 0, y: 0}, false));

    setInterval(function () {
        updatePositions()
    }, 5);
});

function updatePositions() {
    for (let b = 0; b < movableBodies.length; b++) {
        movableBodies[b].update();
    }
}