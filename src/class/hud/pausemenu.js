entity.HUD.PauseMenu = function (parent) {
    this.parent = parent;
    
    this.selected = 0;
    this.paused = false;
    this.usable = false;
    
    this.screenshot = document.createElement("canvas");
    this.screenshot.width = 704;
    this.screenshot.height = 396;
    this.screenshotCtx = this.screenshot.getContext("2d");
    this.menu = new Sprite(this, assets.image.pausemenu_menu, 209, -272);
    this.menu.alpha = 0;
    this.selector = new Sprite(this, assets.image.pausemenu_selector, -85, 131);
    this.selector.alpha = 0;
};

entity.HUD.PauseMenu.positions = [132, 216];

entity.HUD.PauseMenu.prototype.show = function () {
    if (this.paused === true)
        return;
        
    this.paused = true;
    this.usable = false;
    
    this.parent.setMusicVolume(0.25);
    assets.sound.pausemenu_show.play();
    
    this.screenshotCtx.fillRect(0, 0, 704, 396);
    this.screenshotCtx.drawImage(canvas, 0, 0);
    this.menu.tween.start([["alpha", 1], ["y", 62]], 15, Tween.modes.EASEOUT);
    this.selector.tween.start([["alpha", 1], ["x", 140]], 15, Tween.modes.EASEOUT, false, function () {
        keyboard.reset();
        this.parent.usable = true;
    });
};

entity.HUD.PauseMenu.prototype.hide = function (mode) {
    mode = mode || 0;
    this.usable = false;
    
    assets.sound.pausemenu_hide.play();
    
    this.menu.tween.start([["alpha", 0], ["y", -272]], 30, Tween.modes.EASEINOUT);
    this.selector.tween.start([["alpha", 0], ["x", -85]], 30, Tween.modes.EASEINOUT, false, function () {
        if (mode === 0) {
            state.setMusicVolume(1);
            this.parent.paused = false;
        } else {
            state.exit(0);
            state = new states.MERIWORLD();
        }
    });
};

entity.HUD.PauseMenu.prototype.changeSelected = function (selection) {
    this.selected += selection;
    
    if (this.selected > 1)
        this.selected = 0;
    else if (this.selected < 0)
        this.selected = 1;
        
    this.selector.y = entity.HUD.PauseMenu.positions[this.selected];
    
    if (assets.sound.select.currentTime === 0)
        assets.sound.select.play();
    else
        assets.sound.select.currentTime = 0;
};

entity.HUD.PauseMenu.prototype.selectionDone = function () {
    assets.sound.selected.play();
    this.hide(this.selected); //0: do not exit, 1: exit
};

entity.HUD.PauseMenu.prototype.update = function () {
    if (keyboard.wasPressed("q")) {
        if (this.paused === false) {
            this.show();
        } else if (this.usable === true) {
            this.hide();
        }
    }
    
    if (this.paused === true) {
        if (this.usable === true) {
            if (keyboard.wasPressed("uparrow")) {
                this.changeSelected(-1);
            } else if (keyboard.wasPressed("downarrow")) {
                this.changeSelected(1);
            } else if (keyboard.wasPressed("spacebar")) {
                this.selectionDone();
            }
        }
        
        ctx.globalAlpha = 1; //Restore alpha to draw the screenshot
        ctx.drawImage(this.screenshot, 0, 0); //Low-level drawing
        this.menu.update();
        this.selector.update();
    }
};
