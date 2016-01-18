function Text (parent, text, x, y, font, size, color, alpha, modifiers, multiline, shadow) {
    this.parent = parent;
    this.text = text;
    this.x = x || 0;
    this.y = y || 0;
    this.font = font || "sans-serif";
    this.size = size || 12;
    this.modifiers = modifiers || "";
    this.fontString = Text.createFontTag(this);
    this.color = color || "#000000";
    this.alpha = (alpha === undefined) ? 1 : alpha;
    this.multiline = multiline || false;
    this.shadow = shadow || false;
    this.tween = new Tween(this);
}

Text.createFontTag = function (text) {
    var str = (text.modifiers === "") ? text.size + "px " + text.font : text.modifiers + " " + text.size + "px " + text.font;
    return str;
};

Text.prototype.measure = function () {
    ctx.font = this.fontString;
    return ctx.measureText(this.text);
};

Text.prototype.draw = function (offset) {
    if (this.alpha === 0)
        return;
    
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.alpha;
    ctx.font = this.fontString;
    
    if (this.shadow !== false) {
        ctx.shadowBlur = this.shadow.blur;
        ctx.shadowOffsetX = this.shadow.offsetX;
        ctx.shadowOffsetY = this.shadow.offsetY;
        ctx.shadowColor = this.shadow.color;
    }
    
    if (offset === undefined)
        offset = {x: 0, y: 0};
    
    if (this.multiline === false) {
        ctx.fillText(this.text, this.x - offset.x, this.y - offset.y);
    } else {
        this.drawMultiLineText(offset);
    }
    
    if (this.shadow !== false) {
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    }
};

Text.prototype.drawMultiLineText = function (offset) {
    var strings = this.text.split("/");
    for (var i = 0; i < strings.length; i++) {
        ctx.fillText(strings[i], this.x - offset.x, this.y - offset.y + i * this.size + i * 5);
    }
};

Text.prototype.update = function (offset) {
    this.tween.update();
    this.draw(offset);
};
