function Tween (parent) {
    this.parent = parent;
    this.data = [];
    this.tick = 0;
    this.duration = 0;
    this.loop = false;
    this.mode = undefined;
    this.playing = false;
    this.onComplete = undefined;
    this.onLoop = undefined;
}

Tween.modes = {
    LINEAR: 0,
    SMOOTH: 1,
    EASEIN: 2,
    EASEOUT: 3,
    EASEINOUT: 4
};

Tween.linear = function (initial, duration, ticks, change) {
    return initial + (ticks / duration) * change;
};

Tween.smooth = function (initial, duration, ticks, change) {
    return Math.round(this.linear(initial, duration, ticks, change));
};

Tween.easein = function (initial, duration, ticks, change) {
    ticks /= duration;
    return initial + (ticks * ticks) * change;
};

Tween.easeout = function (initial, duration, ticks, change) {
    ticks /= duration;
    return initial + (ticks * (ticks - 2)) * -change;
};

Tween.easeinout = function (initial, duration, ticks, change) {
    ticks /= duration / 2;
    if (ticks < 1)
        return initial + change / 2 * ticks * ticks;
    
    ticks--;
    return initial + -change / 2 * (ticks * (ticks - 2) - 1);
};

Tween.prototype.start = function (data, duration, mode, loop, onComplete, onLoop) {
    this.data = [];
    for (var i = 0, aData, name; i < data.length; i++) {
        aData = data[i];
        name = aData[0];
        this.data.push({
            name: name,
            initial: this.parent[name],
            change: aData[1] - this.parent[name]
        });
    }
    this.duration = duration || 60;
    this.tick = 0;
    this.mode = mode || Tween.modes.LINEAR;
    this.loop = loop || false;
    this.onComplete = onComplete || undefined;
    this.onLoop = onLoop || undefined;
    this.playing = true;
    return this;
};

Tween.prototype.stop = function () {
    this.playing = false;
};

Tween.prototype.update = function () {
    if (!this.playing)
        return;
    
    this.tick++;
    for (var i = 0, aData; i < this.data.length; i++) {
        aData = this.data[i];
        switch (this.mode) {
            case Tween.modes.LINEAR:
                this.parent[aData.name] = Tween.linear(aData.initial, this.duration, this.tick, aData.change);
                break;
            case Tween.modes.SMOOTH:
                this.parent[aData.name] = Tween.smooth(aData.initial, this.duration, this.tick, aData.change);
                break;
            case Tween.modes.EASEIN:
                this.parent[aData.name] = Tween.easein(aData.initial, this.duration, this.tick, aData.change);
                break;
            case Tween.modes.EASEOUT:
                this.parent[aData.name] = Tween.easeout(aData.initial, this.duration, this.tick, aData.change);
                break;
            case Tween.modes.EASEINOUT:
                this.parent[aData.name] = Tween.easeinout(aData.initial, this.duration, this.tick, aData.change);
                break;
            default:
                break;
        }
    }
    
    if (this.tick === this.duration) {
        if (this.loop === false) {
            //No loop
            this.stop();
            
            if (this.onComplete !== undefined)
                this.onComplete.call(this.parent);
        } else if (this.loop === true) {
            //Infinite loop
            for (var i = 0, aData; i < this.data.length; i++) {
                aData = this.data[i];
                aData.initial = this.parent[aData.name];
                aData.change = -aData.change;
                this.tick = 0;
            }
            
            if (this.onLoop !== undefined)
                this.onLoop.call(this, parent);
        } else {
            //Numerical loop
            this.loop--;
            if (this.loop !== 0) {
                for (var i = 0, aData; i < this.data.length; i++) {
                    aData = this.data[i];
                    aData.initial = this.parent[aData.name];
                    aData.change = -aData.change;
                    this.tick = 0;
                }
                
                if (this.onLoop !== undefined)
                    this.onLoop.call(this.parent);
            } else {
                this.stop();
                
                if (this.onComplete !== undefined)
                    this.onComplete.call(this.parent);
            }
        }
    }
};
