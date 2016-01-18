states.MERIWORLD = function (tweenSpeed) {
    tweenSpeed = tweenSpeed || 120;
    
    this.camera = new Camera(this, 0, 275);
    this.camera.tween.start([["y", 0]], tweenSpeed, Tween.modes.EASEINOUT, false, this.checkIntro);
    
    this.crossfadeLayer = new entity.HUD.CrossfadeLayer(this, 704, 396);
    this.crossfadeLayer.tween.start([["alpha", 0]], 60);
    
    this.background = new Sprite(this, assets.image.meriworld_background, -129, -157);
    
    this.logo = new Sprite(this, assets.image.meriworld_logo, 704, 17);
    this.logo.width = 200;
    
    this.planetOne = new Sprite(this, assets.image.meriworld_planet_1, 145, 196);
    this.planetOne.animation.add("rotating", [0, 1, 2]);
    this.planetOne.animation.play("rotating", true, 15);
    this.planetOne.angleConst = degInRad / 12;
    this.planetOne.pivot = {x: -207, y: -208};
    this.planetTwo = new Sprite(this, assets.image.meriworld_planet_2, 529, 244);
    this.planetTwo.animation.add("rotating", [0, 1, 2]);
    this.planetTwo.animation.play("rotating", true, 15);
    this.planetTwo.pivot = {x: 117, y: -160};
    this.planetThree = new Sprite(this, assets.image.meriworld_planet_3, 94, 697);
    this.planetThree.animation.add("rotating", [0, 1, 2]);
    this.planetThree.animation.play("rotating", true, 15);
    this.planetThree.pivot = {x: -258, y: 293};
    this.planetFour = new Sprite(this, assets.image.meriworld_planet_4, 586, 690);
    this.planetFour.animation.add("rotating", [0, 1, 2]);
    this.planetFour.animation.play("rotating", true, 15);
    this.planetFour.pivot = {x: 234, y: 286};
    
    this.planet = new Sprite(this, assets.image.meriworld_planet, 14, 164);
    this.planet.setFrame((SD.stages > 2) ? SD.stages - 1 : SD.stages);
    this.planet.angles = [
        [deg2Rad(90), deg2Rad(33), deg2Rad(57), deg2Rad(90), deg2Rad(90)],
        [deg2Rad(-90), deg2Rad(-90), deg2Rad(-33), deg2Rad(-57), deg2Rad(-90)]
    ];
    this.planetGrass = new Sprite(this, assets.image.meriworld_planet_grass, 125, 281);
    this.planetShadow = new Sprite(this, assets.image.meriworld_planet_shadow, 148, 283);
    this.planetTexture = new Sprite(this, assets.image.meriworld_planet_texture, 148, 283);
    
    this.tag = new Sprite(this, assets.image.meriworld_tags, 301, 200);
    this.tag.setFrame(0);
    this.tag.alpha = 0;
    this.tag.positions = [133, 103, 128, 143, 133];

    this.sun = new Sprite(this, assets.image.meriworld_sun, 0, -8);
    this.sun.angleConst = deg2Rad(30);
    this.sun.timer = new Timer(this.sun);
    this.sun.timer.start(120, true, undefined, function () {
        if (this.angle === 360)
            this.angle = 0;
            
        this.tween.start([["angle", this.angle + this.angleConst]], 30, Tween.modes.EASEINOUT);
    });
    
    this.rotoPlanet = new Sprite(this, assets.image.meriworld_roto2, 322, 64);
    this.rotoPlanet.animation.add("rotating", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                                               11, 11, 12, 13, 14, 15, 16, 17, 18,
                                               19]);
    this.rotoPlanet.animation.play("rotating", true, 5);
    this.rotoPlanet.pivot.x = 0;
    this.rotoPlanet.pivot.y = -300;
    this.rotoPlanet.angleConst = degInRad / 4;
    
    this.dcSmall = new Sprite(this, assets.image.meriworld_dc_small, 340, 229);
    this.dcSmall.animation.add("walkRight", [0, 1, 2]);
    this.dcSmall.animation.add("walkLeft", [3, 4, 5]);
    this.dcSmall.setFrame(6); //Stand
    
    this.dc = new entity.DC(this);
    
    this.selectable = false;
    this.locked = false;
    this.selected = 0;
    this.introIndex = 5;
    
    assets.sound.meriworld.volume = 0;
    assets.sound.meriworld.currentTime = 0;
    assets.sound.meriworld.loop = true;
    this.musicTween = new Tween(assets.sound.meriworld);
    this.musicTween.start([["volume", 1]], 120, Tween.modes.EASEIN, false);
    assets.sound.meriworld.play();
};

states.MERIWORLD.prototype.checkIntro = function () {
    if (SD.first_time_meriworld) {
        state.dc.speak(state.introIndex);
    } else {
        state.stopIntro();
    }
};

states.MERIWORLD.prototype.stopIntro = function () {  
    this.introIndex = 0;    
    this.logo.tween.start([["x", 478]], 20, Tween.modes.EASEOUT, false, function () {
         this.tween.start([["x", 444], ["width", 234]], 5);
    });
    this.dc.speak(this.selected);
    this.tag.setFrame(this.selected);
    this.tag.tween.start([["y", this.tag.positions[this.selected]], ["alpha", 1]], 10, Tween.modes.EASEOUT);
    this.selectable = true;
};

states.MERIWORLD.prototype.input = function () {
    if (this.selectable) {
        if (keyboard.wasPressed("leftarrow")) {
            this.changeSelected("walkLeft", 1);
        } else if (keyboard.wasPressed("rightarrow")) {
            this.changeSelected("walkRight", -1);
        } else if (keyboard.wasPressed("spacebar")) {
            this.selectionDone();
        } else if (keyboard.wasPressed("q")) {
            this.showTutorial();
        }
    } else if (this.introIndex >= 5 && this.dc.shown) {
        if (keyboard.wasPressed("spacebar")) {
            if (this.dc.speaking) {
                this.dc.stopSpeaking();
            } else {
                this.introIndex++;
                if (this.introIndex < 8) {
                    this.dc.speak(this.introIndex);
                } else {
                    SD.first_time_meriworld = false;
                    saveData();
                    this.stopIntro();
                }
            }
        }
    }
    
    keyboard.reset();
};

states.MERIWORLD.prototype.changeSelected = function (anim, selection) {
    if (Math.abs(this.planet.angle) === 360)
        this.planet.angle = 0; //Reset angle
    
    this.selectable = false;
    this.dc.hide();
    this.tag.tween.start([["y", 200], ["alpha", 0]], 10, Tween.modes.EASEOUT);
    
    var tmpAngle = (selection === 1) ? this.planet.angles[0][this.selected] : this.planet.angles[1][this.selected];
    
    this.selected += selection;
    if (this.selected < 0)
        this.selected = 4;
    else if (this.selected > 4)
        this.selected = 0;
    
    this.dcSmall.animation.play(anim, true, 6);
    this.planet.tween.start([["angle", this.planet.angle + tmpAngle]], 60, Tween.modes.LINEAR, false, function () {
        state.dcSmall.animation.pause();
        state.dcSmall.setFrame(6); //Stand
        state.selectable = true;
        
        if (state.selected <= SD.stages || state.selected === 2) {
            state.locked = false;
            state.dc.speak(state.selected);
            state.tag.setFrame(state.selected);
            state.tag.tween.start([["y", state.tag.positions[state.selected]], ["alpha", 1]], 10, Tween.modes.EASEOUT);
        } else {
            state.locked = true;
        }
    });
    
    assets.sound.select.play();
};

states.MERIWORLD.prototype.selectionDone = function () {
    if (this.locked) {
        state.dc.speak(8);
        assets.sound.denied.currentTime = 0;
        assets.sound.denied.play();
        return;
    }

    this.selectable = false;
    this.dcSmall.setFrame(7); //Entering
    this.dc.hide();
    if (state.selected === 2) {
        assets.sound.stage_unlock.play();
    } else {
        assets.sound.selected.play();
    }
    
    this.musicTween.start([["volume", 0]], 30, Tween.modes.LINEAR, false, function () {        
        state.crossfadeLayer.tween.start([["alpha", 1]], 60, Tween.modes.LINEAR, false, function () {
            if (state.selected === 0)
                state = new states.GIMNACHO();
            else if (state.selected === 1)
                state = new states.OFFICE();
            else if (state.selected === 2)
                state = new states.TROPHYROOM();
            else if (state.selected === 3)
                state = new states.CANMERI();
            else if (state.selected === 4)
                state = new states.FIDELIDATION();
        });
    });
};

states.MERIWORLD.prototype.showTutorial = function () {
    this.musicTween.start([["volume", 0]], 20);
    this.crossfadeLayer.tween.start([["alpha", 1]], 20, Tween.modes.LINEAR, false, function () {
        state.dc.hide();
        state = new states.TUTORIAL();
    });
};

states.MERIWORLD.prototype.update = function () {
    //Manage input
    this.input();
    
    //Camera
    this.camera.update();
    
    //Background
    this.background.update(this.camera);
    this.background.angle += this.planetOne.angleConst;
    if (this.background.angle === 360)
        this.background.angle = 0;
    
    //Sun
    this.sun.timer.update();
    this.sun.update(this.camera);
    
    //Small planets
    this.planetOne.update(this.camera);
    this.planetOne.angle += this.planetOne.angleConst;
    this.planetTwo.update(this.camera);
    this.planetTwo.angle += this.planetOne.angleConst;
    this.planetThree.update(this.camera);
    this.planetThree.angle += this.planetOne.angleConst;
    this.planetFour.update(this.camera);
    this.planetFour.angle += this.planetOne.angleConst;
    if (this.planetOne.angle === 360)
        this.planetOne.angle = this.planetTwo.angle = this.planetThree.angle = this.planetFour.angle = 0;
    
    //Roto2 planet
    this.rotoPlanet.update(this.camera);
    this.rotoPlanet.angle += this.rotoPlanet.angleConst;
    
    //Big planet
    this.planet.update(this.camera);
    this.planetShadow.draw(this.camera);
    this.planetGrass.angle = this.planet.angle;
    this.planetGrass.drawRotated(this.camera);
    this.planetTexture.angle = this.planet.angle;
    this.planetTexture.drawRotated(this.camera);
    
    //Small DC
    this.dcSmall.update(this.camera);
    
    //Big DC
    this.dc.update();
    
    //HUD
    this.tag.update();
    this.logo.update();
    this.crossfadeLayer.update();
    
    //Music
    this.musicTween.update();
};
