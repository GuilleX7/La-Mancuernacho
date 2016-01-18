function Sprite (parent, asset, x, y, width, height, clip, alpha, angle) {
    this.parent = parent;
    this.asset = asset;
    
    this.x = x || 0;
    this.y = y || 0;
    
    if (width !== undefined && height !== undefined) {
        this.setSize(width, height);
    } else if (asset === undefined) {
        this.setSize(0, 0);
    } else if (asset.spritesheet !== undefined) {
        this.setSize(asset.spritesheet.frames[0].width, asset.spritesheet.frames[1].height);
    } else {
        this.setSize(asset.width || asset.videoWidth, asset.height || asset.videoHeight);
    }
    
    if (this.asset !== undefined) {
        this.clip = clip || new Rect(0, 0, this.asset.width || this.asset.videoWidth, this.asset.height || this.asset.videoHeight);
    } else {
        this.clip = new Rect(0, 0, this.width, this.height);
    }
    
    this.alpha = alpha || 1;
    this.angle = angle || 0;
    this.pivot = {
        x: 0,
        y: 0
    };
    
    this.animation = new Animation(this);
    this.tween = new Tween(this);
}

Sprite.prototype.setPos = function (x, y) {
    this.x = x;
    this.y = y;
};

Sprite.prototype.setSize = function (width, height) {
    this.width = width;
    this.height = height;
    this.hWidth = width / 2;
    this.hHeight = height / 2;
};

Sprite.prototype.setFrame = function (index) {
    this.clip = this.asset.spritesheet.frames[index];
};

Sprite.prototype.draw = function (offset) {
    if (this.alpha === 0)
        return;
        
    ctx.globalAlpha = this.alpha;
        
    if (offset === undefined)
        offset = {x: 0, y: 0};
    
    ctx.drawImage(this.asset,
                  this.clip.x, this.clip.y, this.clip.width, this.clip.height,
                  this.x - offset.x, this.y - offset.y, this.width, this.height);
};

Sprite.prototype.drawRotated = function (offset) {
        if (this.alpha === 0)
        return;
        
    ctx.globalAlpha = this.alpha;
        
    if (offset === undefined)
        offset = {x: 0, y: 0};
    
    ctx.save();
    
    var tempX = this.x + this.hWidth - this.pivot.x - offset.x,
        tempY = this.y + this.hHeight - this.pivot.y - offset.y;
        
    ctx.translate(tempX, tempY);
    ctx.rotate(this.angle);
    ctx.translate(-tempX, -tempY);
    
    ctx.drawImage(this.asset,
                  this.clip.x, this.clip.y, this.clip.width, this.clip.height,
                  this.x - offset.x, this.y - offset.y, this.width, this.height);
                      
    ctx.restore();
};

Sprite.prototype.update = function (offset) {
    this.animation.update();
    this.tween.update();
    if (this.angle === 0)
        this.draw(offset);
    else
        this.drawRotated(offset);
};

Sprite.prototype.remove = function () {
    this.alpha = 0;
    this.animation.pause();
    this.tween.stop();
};
