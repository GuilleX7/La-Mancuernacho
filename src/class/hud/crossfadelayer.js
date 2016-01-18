entity.HUD.CrossfadeLayer = function (parent, width, height) {
    this.parent = parent;
    this.alpha = 1;
    this.width = width;
    this.height = height;
    this.tween = new Tween(this);
};

entity.HUD.CrossfadeLayer.prototype.draw = function () {
    if (this.alpha === 0)
        return;
    
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = "#101010";
    ctx.fillRect(0, 0, this.width, this.height);
};

entity.HUD.CrossfadeLayer.prototype.update = function () {
    this.tween.update();
    this.draw();
};
