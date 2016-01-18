function Camera (parent, x, y) {
    this.parent = parent;
    this.x = x || 0;
    this.y = y || 0;
    this.tween = new Tween(this);
    this.shaking = false;
    this.shakeRange = 0;
    this.oX = 0;
    this.oY = 0;
}

Camera.prototype.shake = function (range) {
    if (this.shaking === true) { //Already shaking
        this.shakingReset();
    }
    
    this.shaking = true;
    this.shakeRange = range;
    this.oX = this.x;
    this.oY = this.y;
};

Camera.prototype.shakingReset = function () {
    this.x = this.oX;
    this.y = this.oY;
    this.shaking = false;
};

Camera.prototype.update = function () {
    this.tween.update();
    if (this.shaking === true) {
        this.x = this.oX + rndInt(-this.shakeRange, this.shakeRange);
        this.y = this.oY + rndInt(-this.shakeRange, this.shakeRange);
        this.shakeRange--;
        if (this.shakeRange === 0) {
            this.shakingReset();
        }
    }
};
