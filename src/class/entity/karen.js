entity.Karen = function (state, x, y, sizeFactor) {
    Sprite.call(this, state, assets.image.karen, x, y, 245 * sizeFactor, 592 * sizeFactor);
    this.setFrame(0);
    
    this.animation.add("fall", [3, 4, 5, 6]);
    
    this.shadow = new Sprite(this, assets.image.karen_shadow, x + 35 * sizeFactor, y + 550 * sizeFactor, 148 * sizeFactor, 42 * sizeFactor);
    this.shadow.alpha = 0.6;
    
    this.left_weight = new Sprite(this, assets.image.karen_weights, x + 7 * sizeFactor, y + 266 * sizeFactor, 64 * sizeFactor, 54 * sizeFactor);
    this.left_weight.setFrame(1);
    this.left_weight.alpha = 0;
    this.right_weight = new Sprite(this, assets.image.karen_weights, x + 145 * sizeFactor, y + 282 * sizeFactor, 64 * sizeFactor, 54 * sizeFactor);
    this.right_weight.setFrame(0);
    this.right_weight.alpha = 0;
    
    this.hearts = new Sprite(this, assets.image.karen_hearts, x + 85 * sizeFactor, y + 106 * sizeFactor, 64 * sizeFactor, 132 * sizeFactor);
    this.hearts.setFrame(0);
    this.hearts.animation.add("love", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                                       11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                                       21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                                       31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
                                       41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
                                       51, 52, 53]);
    this.hearts.alpha = 0;
};

entity.Karen.extends(Sprite);

entity.Karen.prototype.levelUp = function (level) {
    if (level === 0) {
        this.setFrame(1);
        this.left_weight.alpha = 1;
        this.left_weight.tween.start([["y", this.left_weight.y + this.height / 2]], 10);
        this.right_weight.alpha = 1;
        this.right_weight.tween.start([["y", this.left_weight.y + (this.height / 2) - 10]], 10);
    } else if (level === 1) {
        this.setFrame(2);
    } else {
        this.animation.play("fall");
        this.hearts.alpha = 1;
        this.hearts.animation.play("love", true, 3);
    }
};

entity.Karen.prototype.update = function (camera) {
    //@OVERRIDE
    
    //Karen
    this.shadow.draw(camera);
    
    //Weights
    this.right_weight.update(camera);
    
    //Karen
    this.tween.update();
    this.animation.update();
    this.draw(camera);
    
    //Weights
    this.left_weight.update(camera);
    
    //Hearts
    this.hearts.update();
};
