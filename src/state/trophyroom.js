states.TROPHYROOM = function () {
    this.background = new Sprite(this, assets.image.trophyroom_background, 0, 0);
    
    this.crossfadeLayer = new entity.HUD.CrossfadeLayer(this, 704, 396);
    this.crossfadeLayer.tween.start([["alpha", 0]], 60, Tween.modes.LINEAR, false, this.checkIntro);
    
    this.cristian = new entity.Cristian(this, 350, 51);
    
    this.display = new Sprite(this, assets.image.trophyroom_display, 172, 144);
    this.display.text = new Text(this.display, SD.total_score, 310, 150, "lcd", 40, "#6c8f67");
    for (var i = 0, tmp = SD.total_score; i < 6; i++) {
        tmp /= 10;
        if (tmp < 1) break;
    }
    this.display.text.x -= i * 22;
    
    this.trophyCrossfadeLayer = new entity.HUD.CrossfadeLayer(this, 704, 396);
    this.trophyCrossfadeLayer.alpha = 0;
    
    this.trophies = [
        new Sprite(this, assets.image.trophyroom_trophy1, 16, 44, 82, 61),
        new Sprite(this, assets.image.trophyroom_trophy2, 108, 48, 82, 57),
        new Sprite(this, assets.image.trophyroom_trophy3, 200, 23, 82, 82),
        new Sprite(this, assets.image.trophyroom_trophy4, 292, 24, 82, 81)
    ];
    this.trophies[0].minimized = {x: 16, y: 44, width: 82, height: 61};
    this.trophies[0].maximized = {x: 229, y: 96, width: 246, height: 184};
    this.trophies[1].minimized = {x: 108, y: 48, width: 82, height: 57};
    this.trophies[1].maximized = {x: 229, y: 113, width: 246, height: 171};
    this.trophies[2].minimized = {x: 200, y: 23, width: 82, height: 82};
    this.trophies[2].maximized = {x: 229, y: 35, width: 246, height: 247};
    this.trophies[3].minimized = {x: 292, y: 24, width: 82, height: 81};
    this.trophies[3].maximized = {x: 229, y: 37, width: 246, height: 243};
    for (var i = 0, trophy; i < 4; i++) {
        trophy = this.trophies[i];
        trophy.setFrame(SD.trophies[i]);
    }
    
    this.selector = new Sprite(this, assets.image.pausemenu_selector, 43, 165, 57, 33);
    this.selector.positions = [
        {x: 50, y: 140, angle: deg2Rad(-270)},
        {x: 43, y: 165, angle: deg2Rad(-90)},
        {x: 135, y: 165, angle: deg2Rad(-90)},
        {x: 227, y: 165, angle: deg2Rad(-90)},
        {x: 319, y: 165, angle: deg2Rad(-90)},
        {x: 600, y: 230, angle: deg2Rad(-90)}
    ];
    this.selector.pivot = {x: 28.5, y: 16.5};
    this.selector.angle = deg2Rad(-90);
    this.selector.alpha = 0;
    
    this.selectorTag = new Text(this, "", 16, 0, "pixel", 18, "#FFFFFF");
    this.selectorTag.alpha = 0;
    this.selectorTag.texts = ["10.000", "30.000", "50.000", "70.000"];
    this.selectorTag.positions = [31, 122, 216, 305];
    
    this.selected = 1;
    this.selectable = false;
    this.maximized = false;
    this.introIndex = 6;
    
    assets.sound.trophyroom.volume = 0;
    assets.sound.trophyroom.currentTime = 0;
    assets.sound.trophyroom.loop = true;
    this.musicTween = new Tween(assets.sound.trophyroom);
    this.musicTween.start([["volume", 1]], 120, Tween.modes.EASEIN, false);
    assets.sound.trophyroom.play();
    
    this.exiting = false;
};

states.TROPHYROOM.prototype.checkIntro = function () {
    if (SD.first_time_trophyroom) {
        state.cristian.speak(state.introIndex);
    } else {
        state.stopIntro();
    }
};

states.TROPHYROOM.prototype.stopIntro = function () {
    this.introIndex = 0;
    
    if (SD.trophies[0] === 1) {
        this.trophies[0].tween.start([["y", this.trophies[0].y - 10]], 60, Tween.modes.EASEINOUT, true);
    } else {
        this.moveSelectorTag();
    }
    
    this.selector.tween.start([["alpha", 1]], 10, Tween.modes.LINEAR, false, function () {
        state.selectable = true;
    });
};

states.TROPHYROOM.prototype.input = function () {    
    if (this.selectable) {
        if (this.maximized) {
            if (keyboard.wasPressed("q")) {
                this.minimizeTrophy(this.selected);
                this.cristian.stopSpeaking(true);
            } else if (keyboard.wasPressed("spacebar") && this.cristian.speaking) {
                this.cristian.stopSpeaking();
            }
        } else {
            if (keyboard.wasPressed("leftarrow") && this.selected > 0) {
                this.changeSelected(-1);
                if (this.selected === 0) {
                    this.cristian.speak(this.selected);
                } else if (this.cristian.bubble.shown) {
                    this.cristian.stopSpeaking(true);
                }
            } else if (keyboard.wasPressed("rightarrow") && this.selected < 5) {
                this.changeSelected(1);
                if (this.selected === 5) {
                    this.cristian.speak(this.selected);
                } else if (this.cristian.bubble.shown) {
                    this.cristian.stopSpeaking(true);
                }
            } else if (keyboard.wasPressed("spacebar")) {
                if (this.selected < 5 && this.selected > 0) {
                    if (SD.trophies[this.selected - 1] === 0) {
                        this.selectorTag.color = "#FF0000";
                        this.cristian.speak(8);
                        assets.sound.denied.currentTime = 0;
                        assets.sound.denied.play();
                        return;
                    }
                    
                    this.maximizeTrophy();
                    this.cristian.speak(this.selected);
                } else if (this.cristian.speaking) {
                    this.cristian.stopSpeaking();
                }
            } else if (keyboard.wasPressed("q")) {
                this.selectable = false;
                this.exit();
            }
        }
    } else if (this.introIndex > 0) {
        if (keyboard.wasPressed("spacebar")) {
            if (this.cristian.speaking) {
                this.cristian.stopSpeaking();
            } else if (this.cristian.bubble.alpha === 1) {
                this.introIndex++;
                if (this.introIndex > 7) {
                    this.cristian.stopSpeaking(true);
                    SD.first_time_trophyroom = false;
                    saveData();
                    this.stopIntro();
                } else {
                    this.cristian.speak(this.introIndex);
                }
            }
        }
    }
    
    keyboard.reset();
};

states.TROPHYROOM.prototype.changeSelected = function (selection) {
    var oldTrophyIndex = this.selected - 1;
    this.selected += selection;
    var newTrophyIndex = this.selected - 1;
    
    if (this.selected > 0 && this.selected < 5) {
        if (SD.trophies[oldTrophyIndex] === 1) {
            this.trophies[oldTrophyIndex].tween.start([["y", this.trophies[oldTrophyIndex].minimized.y]], 10);
        }
        
        if (SD.trophies[newTrophyIndex] === 1) {
            this.trophies[newTrophyIndex].tween.start([["y", this.trophies[newTrophyIndex].y - 10]], 60, Tween.modes.EASEINOUT, true);
        }
    }
    
    var newPos = this.selector.positions[this.selected];
    this.selector.x = newPos.x;
    this.selector.y = newPos.y;
    this.selector.angle = newPos.angle;
    
    this.moveSelectorTag();
        
    assets.sound.select.currentTime = 0;
    assets.sound.select.play();
};

states.TROPHYROOM.prototype.moveSelectorTag = function () {
    if (this.selected === 5 || this.selected === 0 || SD.trophies[this.selected - 1] === 1) {
        this.selectorTag.tween.start([["alpha", 0]], 10);
    } else {
        var trophyIndex = this.selected - 1;
        this.selectorTag.text = this.selectorTag.texts[trophyIndex];
        this.selectorTag.alpha = 0;
        this.selectorTag.x = this.selectorTag.positions[trophyIndex];
        this.selectorTag.y = 20;
        this.selectorTag.color = "#FFFFFF";
        this.selectorTag.tween.start([["y", 10], ["alpha", 1]], 10);
    }
};

states.TROPHYROOM.prototype.maximizeTrophy = function () {
    var trophy = this.trophies[this.selected - 1];
    this.selectable = false;
    this.maximized = true;
    assets.sound.select.currentTime = 0;
    assets.sound.select.play();
        
    this.trophyCrossfadeLayer.tween.start([["alpha", 0.7]], 30);
    trophy.tween.start([["x", trophy.maximized.x], ["y", trophy.maximized.y], ["width", trophy.maximized.width], ["height", trophy.maximized.height]], 30, Tween.modes.EASEINOUT, false, function () {
        state.selectable = true;
    });
};

states.TROPHYROOM.prototype.minimizeTrophy = function () {
    var trophy = this.trophies[this.selected - 1];
    this.selectable = false;
    this.maximized = false;
    this.trophyCrossfadeLayer.tween.start([["alpha", 0]], 30);
    trophy.tween.start([["x", trophy.minimized.x], ["y", trophy.minimized.y], ["width", trophy.minimized.width], ["height", trophy.minimized.height]], 30, Tween.modes.EASEINOUT, false, function () {
        this.tween.start([["y", this.y - 10]], 60, Tween.modes.EASEINOUT, true);
        state.selectable = true;
    });
};

states.TROPHYROOM.prototype.exit = function () {
    if (this.exiting)
        return;
        
    this.exiting = true;
    this.musicTween.start([["volume", 0]], 60);
    this.crossfadeLayer.tween.start([["alpha", 1]], 60, Tween.modes.LINEAR, false, function () {
        state = new states.MERIWORLD();
    });
};

states.TROPHYROOM.prototype.update = function () {
    this.input();
    
    this.background.draw();
    this.cristian.update();
    
    this.display.draw();
    this.display.text.draw();

    this.selector.update();
    this.trophyCrossfadeLayer.update();
    for (var i = 4; i--;)
        this.trophies[i].update();
        
    this.selectorTag.update();
    
    this.cristian.bubble.update();
    this.cristian.text.timer.update();
    this.cristian.text.update();
    
    this.crossfadeLayer.update();
    this.musicTween.update();
};
