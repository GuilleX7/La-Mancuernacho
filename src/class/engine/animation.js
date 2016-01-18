function Animation (parent) {
    this.parent = parent;
    this.anims = {};
    this.anim = undefined;
    this.counter = 0;
    this.fCounter = 0;
    this.frame = 0;
    this.loop = false;
    this.speed = 0;
    this.onLoop = undefined;
    this.onComplete = undefined;
    this.paused = true;
}

Animation.prototype.add = function (name, frames) {
    this.anims[name] = frames;
};

Animation.prototype.play = function (name, loop, speed, onComplete, onLoop) {
    this.anim = this.anims[name];
    this.counter = 0;
    this.loop = loop || false;
    this.speed = speed || 6;
    this.fCounter = 0;
    this.frame = this.anim[this.fCounter];
    this.onComplete = onComplete || undefined;
    this.onLoop = onLoop || undefined;
    this.paused = false;
    this.updateParent();
};

Animation.prototype.pause = function () {
    this.paused = true;
};

Animation.prototype.resume = function () {
    this.paused = false;
};

Animation.prototype.setFrame = function (index) {
    this.frame = index;
};

Animation.prototype.updateParent = function () {
    this.parent.setFrame(this.frame);
};

Animation.prototype.update = function () {
    if (this.paused) return;
    
    this.counter++;
    if (this.counter === this.speed) {
        this.counter = 0;
        if (this.fCounter === this.anim.length - 1) {
            if (this.loop === false) {
                //No loop
                this.pause();
                
                if (this.onComplete !== undefined)
                    return this.onComplete.call(this.parent);
            } else if (this.loop === true) {
                //Infinite loop
                this.fCounter = 0;
                this.frame = this.anim[this.fCounter];
                if (this.onLoop !== undefined)
                    this.onLoop.call(this.parent);
            } else {
                //Numerical loop
                this.loop--;
                if (this.loop !== 0) {
                    this.fCounter = 0;
                    this.frame = this.anim[this.fCounter];
                    if (this.onLoop !== undefined)
                        this.onLoop.call(this.parent);
                } else {
                    this.pause();
                    
                    if (this.onComplete !== undefined)
                        return this.onComplete.call(this.parent);
                }
            }
        } else {
            this.fCounter++;
            this.frame = this.anim[this.fCounter];
        }
        
        this.updateParent();
    }
};
