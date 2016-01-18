entity.Car = function (parent, x, y) {
    Sprite.call(this, parent, assets.image.credits_car, x, y);
    this.setFrame(0);
    this.frame = 0;
    
    this.wheels = new Sprite(this, assets.image.credits_car_wheels, x + 5, y + 131);
    this.wheels.animation.add("rotating", [0, 1]);
    this.wheels.animation.play("rotating", true, 2);
    
    this.spoiler = new Sprite(this, assets.image.credits_car_spoiler, x + 45, y + 67);
    
    this.extras = new Sprite(this, assets.image.credits_car_extras, x + 84, y + 20);
    this.extras.animation.add("moving", [0, 1, 2]);
    this.extras.animation.play("moving", true, 3);
    
    this.shadow = new Sprite(this, assets.image.credits_car_shadow, x - 6, y + 153);
    
    this.timer = new Timer(this);
    this.restartTimer();
    
    this.bouncing = false;
};

entity.Car.extends(Sprite);

entity.Car.prototype.restartTimer = function () {
    this.timer.start(120, true, undefined, function () {
        this.bouncing = true;
        this.bounce();
        this.timer.start(8, false, function () {
            this.bounce();
            this.restartTimer();
        });
    });
};

entity.Car.prototype.bounce = function () {
    this.tween.start([["y", this.y + 2]], 2, Tween.modes.LINEAR, false, function () {
        this.tween.start([["y", this.y - 2]], 2, Tween.modes.LINEAR, false, function () {
            this.bouncing = false;
            this.spoiler.tween.start([["y", this.spoiler.y + 2]], 2, Tween.modes.LINEAR, false, function () {
                this.tween.start([["y", this.y - 2]], 2, Tween.modes.LINEAR);
            });
        });
    })
};

entity.Car.prototype.changeFrame = function (frame) {
    if (this.frame !== frame) {
        this.parent.dieses.create(0);
        this.frame = frame;
        this.setFrame(frame);
    }
};

entity.Car.prototype.input = function () {
    if (keyboard.key.n) { //Nacho
        if (keyboard.key.k) {
            if (keyboard.key.s) {
                //Nacho, Karen and Sereo
                this.changeFrame(7);
            } else {
                //Nacho and Karen
                this.changeFrame(6);
            }
        } else if (keyboard.key.s) {
            //Nacho and Sereo
            this.changeFrame(5);
        } else {
            //Nacho
            this.changeFrame(4);
        }
    } else if (keyboard.key.k) {
        if (keyboard.key.s) {
            //Karen and Sereo
            this.changeFrame(3);
        } else {
            //Karen
            this.changeFrame(2);
        }
    } else if (keyboard.key.s) { //Sereo
        this.changeFrame(1);
    } else {
        this.changeFrame(0);
    }
    
    if (keyboard.key.leftarrow && this.x > 150) {
        //Go left
        this.x--;
        this.shadow.x--;
        this.extras.x--;
        this.spoiler.x--;
        this.wheels.x--;
    } else if (keyboard.key.rightarrow && this.x < 260) {
        //Go right
        this.x++;
        this.shadow.x++;
        this.extras.x++;
        this.spoiler.x++;
        this.wheels.x++;
    }
    
    if (keyboard.wasPressed("c")) {
        assets.sound.horn.play();
    }
};

entity.Car.prototype.update = function () {
    //@OVERRIDE
    this.input();
    this.timer.update();
    
    this.shadow.draw();
    
    this.wheels.update();
    
    this.tween.update();
    this.draw();
    
    this.spoiler.update();
    
    if (this.bouncing) {
        this.extras.y = this.y + 20;
    }
    this.extras.update();
};
