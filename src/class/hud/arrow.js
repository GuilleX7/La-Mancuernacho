entity.HUD.Arrow = function (parent, x, y) {
    Sprite.call(this, parent, assets.image.arrow, x, y, 270, 0);
    
    this.level = 0;
    
    this.text_karencitrometro = new Sprite(this, assets.image.text_karencitrometro, x + 20, y + 10);
    this.text_karencitrometro.alpha = 0;
    
    this.heart_one = new Sprite(this, assets.image.heart, x + 135, y + 89, 0, 0);
    this.heart_one.alpha = 0;
    this.heart_two = new Sprite(this, assets.image.heart, x + 135, y + 169, 0, 0);
    this.heart_two.alpha = 0;
    this.heart_three = new Sprite(this, assets.image.heart, x + 135, y + 249, 0, 0);
    this.heart_three.alpha = 0;
    
    this.timer = new Timer(this);
};

entity.HUD.Arrow.extends(Sprite);

entity.HUD.Arrow.prototype.heartbeat = function () {
    if (this.level > 0)
        this.heart_one.tween.start([["x", this.heart_one.x - 15], ["y", this.heart_one.y - 15], ["width", this.heart_one.width + 30], ["height", this.heart_one.height + 30]], 10, Tween.modes.LINEAR, 4);
    
    if (this.level > 1)
        this.heart_two.tween.start([["x", this.heart_two.x - 15], ["y", this.heart_two.y - 15], ["width", this.heart_two.width + 30], ["height", this.heart_two.height + 30]], 10, Tween.modes.LINEAR, 4);
    
    if (this.level > 2)
        this.heart_three.tween.start([["x", this.heart_three.x - 15], ["y", this.heart_three.y - 15], ["width", this.heart_three.width + 30], ["height", this.heart_three.height + 30]], 10, Tween.modes.LINEAR, 4);
};

entity.HUD.Arrow.prototype.initAnims = function () {
    this.tween.start([["height", 396]], 30, Tween.modes.EASEOUT, false, function () {
        this.text_karencitrometro.tween.start([["alpha", 1]]);
        this.heart_one.tween.start([["alpha", 1], ["x", this.heart_one.x - 25], ["y", this.heart_one.y - 24], ["width", 50], ["height", 48]], 15, Tween.modes.LINEAR, false, function () {
            this.parent.heart_two.tween.start([["alpha", 1], ["x", this.parent.heart_two.x - 25], ["y", this.parent.heart_two.y - 24], ["width", 50], ["height", 48]], 15, Tween.modes.LINEAR, false, function () {
                this.parent.heart_three.tween.start([["alpha", 1], ["x", this.parent.heart_three.x - 25], ["y", this.parent.heart_three.y - 24], ["width", 50], ["height", 48]], 15, Tween.modes.LINEAR, false, function () {
                    this.parent.timer.start(90, true, undefined, this.parent.heartbeat);
                });
            });
        });
    });
};

entity.HUD.Arrow.prototype.update = function () {
    //@OVERRIDE
    this.timer.update();
    
    this.tween.update();
    this.animation.update();
    this.draw();
    
    this.text_karencitrometro.update();
    
    this.heart_one.update();
    this.heart_two.update();
    this.heart_three.update();
};
