states.TUTORIAL = function () {
    this.camera = new Camera(this, 0, 0);
    
    this.crossfadeLayer = new entity.HUD.CrossfadeLayer(this, 704, 396);
    this.crossfadeLayer.tween.start([["alpha", 0]], 30, Tween.modes.LINEAR, false, function () {
        state.exitable = true;
    });
    
    this.background = new Sprite(this, assets.image.tutorial_background, 0, 0, 704, 1500);
    this.background.alpha = 0;
    this.background.tween.start([["alpha", 1]], 30);
    
    this.updateCameraLimits();
    
    this.tab = new Sprite(this, assets.image.tutorial_tab, 8, 0);
    this.tab.setFrame(0);
    
    this.content1 = new Sprite(this, assets.image.tutorial_content1, 41, 100);
    this.content2 = new Sprite(this, assets.image.tutorial_content2, 41, 100);
    this.content2.alpha = 0;
    
    this.selected = 0;
    this.exitable = false;
    this.exiting = false;
    
    assets.sound.tutorial.currentTime = 0;
    assets.sound.tutorial.volume = 0;
    assets.sound.tutorial.play();
    this.musicTween = new Tween(assets.sound.tutorial);
    this.musicTween.start([["volume", 1]], 30);
    
    assets.sound.tutorial_show.currentTime = 0;
    assets.sound.tutorial_show.play();
    
    keyboard.reset();
};

states.TUTORIAL.prototype.updateCameraLimits = function () {
    this.camera.limitY = this.background.height - 396;
};

states.TUTORIAL.prototype.changeTab = function (selection) {
    if (this.selected === selection)
        return;
    
    if (selection === 0) {
        this.content1.alpha = 1;
        this.content2.alpha = 0;
        this.background.height = 1500;
    } else {
        this.content1.alpha = 0;
        this.content2.alpha = 1;
        this.background.height = 2025;
    }
    
    this.tab.setFrame(selection);
    this.camera.y = 0;
    this.updateCameraLimits();
    this.selected = selection;
    
    assets.sound.tutorial_tabchange.currentTime = 0;
    assets.sound.tutorial_tabchange.play();
};

states.TUTORIAL.prototype.input = function () {
    if (this.exiting === true || this.exitable === false)
        return;
        
    if (keyboard.wasPressed("q")) {
        this.exit();
    } else if (keyboard.key.uparrow) {
        this.moveCamera(-5);
        assets.sound.scroll.play();
    } else if (keyboard.key.downarrow) {
        this.moveCamera(5);
        assets.sound.scroll.play();
    } else if (keyboard.key.leftarrow) {
        this.changeTab(0);
    } else if (keyboard.key.rightarrow) {
        this.changeTab(1);
    }
    
    keyboard.reset();
};

states.TUTORIAL.prototype.moveCamera = function (dY) {
    this.camera.y += dY;
    
    if (this.camera.y > this.camera.limitY) {
        this.camera.y = this.camera.limitY;
    } else if (this.camera.y < 0) {
        this.camera.y = 0;
    }
};

states.TUTORIAL.prototype.exit = function () {
    this.exiting = true;
    this.musicTween.start([["volume", 0]], 30);
    this.crossfadeLayer.tween.start([["alpha", 1]], 30, Tween.modes.LINEAR, false, function () {
        state = new states.MERIWORLD(60);
    });
};

states.TUTORIAL.prototype.update = function () {
    this.input();

    this.background.update(this.camera);
    this.content1.update(this.camera);
    this.content2.update(this.camera);
    this.tab.update();
    this.crossfadeLayer.update();
    
    this.musicTween.update();
};
