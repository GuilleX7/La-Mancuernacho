function Timer (parent) {
    this.parent = parent;
    this.playing = false;
    this.time = 0;
    this.onComplete = undefined;
}

Timer.prototype.start = function (time, loop, onComplete, onLoop) {
    this.time = time;
    this.counter = 0;
    this.loop = loop || false;
    this.onComplete = onComplete;
    this.onLoop = onLoop;
    this.playing = true;
};

Timer.prototype.pause = function () {
    this.playing = false;
};

Timer.prototype.resume = function () {
    this.playing = true;
};

Timer.prototype.update = function () {
    if (!this.playing)
        return;
        
    this.counter++;
    if (this.counter === this.time) {
        if (this.loop === false) {
            //No loop
            this.pause();
            
            this.onComplete.call(this.parent);
        } else if (this.loop === true) {
            //Infinite loop
            this.counter = 0;
            
            if (this.onLoop !== undefined)
                this.onLoop.call(this.parent);
        } else {
            //Numerical loop
            this.loop--;
            if (this.loop !== 0) {
                this.counter = 0;
                
                if (this.onLoop !== undefined)
                    this.onLoop.call(this.parent);
            } else {
                this.pause();
                
                if (this.onComplete !== undefined)
                    this.onComplete.call(this.parent);
            }
        }
    }
};
