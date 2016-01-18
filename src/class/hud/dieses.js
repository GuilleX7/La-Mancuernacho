entity.HUD.Dies = function (parent, x, y, frame) {
    Sprite.call(this, parent, assets.image.text_bonus, x, y);
    this.setFrame(frame);
    this.tween.start([["y", this.y - 50], ["alpha", 0]]);
};

entity.HUD.Dies.extends(Sprite);

entity.HUD.Dies.prototype.update = function () {
    //@OVERRIDE
    this.tween.update();
    this.draw();
};

entity.HUD.Dieses = function (parent, x, y, width, height) {
    this.parent = parent;
    this.x = x || 20;
    this.y = y || 219;
    this.width = width || 100;
    this.height = height || 319;
    this.children = [];
};

entity.HUD.Dieses.prototype.create = function (frame) {
    this.children.push(new entity.HUD.Dies(this, rndInt(this.x, this.width), rndInt(this.y, this.height), frame));
};

entity.HUD.Dieses.prototype.update = function () {
    for (var i = this.children.length, child; i--;) {
        child = this.children[i];
        child.update();
        if (!child.tween.playing)
            this.children.splice(i, 1);
    }
};
