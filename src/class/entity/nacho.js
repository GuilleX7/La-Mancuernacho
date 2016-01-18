var entity = {};

entity.Nacho = function (state, x, y, sizeFactor) {
    Sprite.call(this, state, assets.image.nacho, x, y, 412 * sizeFactor, 550 * sizeFactor);
    
    //Level values
    this.level = 0;
    
    //Energy values
    this.maxEnergy = 110;
    this.energy = this.maxEnergy;
    this.halfEnergy = this.maxEnergy / 2;
    this.energyCosts = entity.Nacho.COSTS[difficulty].energy;
    this.energyCost = this.energyCosts[this.level];
    
    //Score values
    this.score = 0;
    this.scoreDeltas = [10, 20, 35, 50];
    this.scoreDelta = this.scoreDeltas[this.level];
    this.maxScore = 9999;
    this.scoreCosts = entity.Nacho.COSTS[difficulty].score;
    this.scoreCost = this.scoreCosts[this.level];
    this.nextScore = 1000;
    this.nextScoreDelta = 1000;

    //Key values
    this.keyIndex = 0;
    this.keys = ["a", "s"];
    this.key = this.keys[this.keyIndex];
    
    //Frame values
    this.frameList = [[0, 1], [2, 3], [4, 5], [21, 22]];
    this.frames = this.frameList[this.level];
    
    //Other values
    this.playable = false;
    this.enteringFantaLevel = false;
    this.allowDobleWorkout = true;
    
    this.animation.add("lvupsuper", [6, 7, 8, 9, 9, 9, 8, 7, 6]);
    this.animation.add("lvupmega", [10, 11, 12, 13, 13, 13, 12, 11, 10]);
    this.animation.add("lvupfanta", [14, 15, 16, 17, 18, 19, 20]);
    this.animation.add("lvdownfanta", [20, 19, 18, 17, 16, 15, 14, 36]);
    this.animation.add("winthrow", [23]);
    this.animation.add("winjump", [24, 25, 26, 27]);
    this.animation.add("wintalk", [29, 28]);
    this.animation.add("winsmell", [30, 31]);
    this.animation.add("dblworkout0", [32, 33]);
    this.animation.add("dblworkout1", [34, 35]);
    this.animation.add("dblworkout2", [36, 37]);
    this.animation.add("dblworkout3", [38, 39]);
    this.setFrame(0);
    
    this.shadow = new Sprite(this, assets.image.nacho_shadow, this.x + 120 * sizeFactor, this.y + 520 * sizeFactor, 173 * sizeFactor, 30 * sizeFactor);
    this.shadow.alpha = 0.6;
    
    this.sweat = new Sprite(this, assets.image.nacho_sweat, this.x + 205 * sizeFactor, this.y + 536 * sizeFactor, 19 * sizeFactor, 5 * sizeFactor);
    this.sweat.alpha = 0;
    this.sweat.sizes = [
        [["alpha", 1], ["x", this.x + 187 * sizeFactor], ["y", this.y + 532 * sizeFactor], ["width", 38 * sizeFactor], ["height", 9 * sizeFactor]],
        [["x", this.x + 168 * sizeFactor], ["y", this.y + 528 * sizeFactor], ["width", 77 * sizeFactor], ["height", 17 * sizeFactor]],
        [["x", this.x + 149 * sizeFactor], ["y", this.y + 524 * sizeFactor], ["width", 115 * sizeFactor], ["height", 26 * sizeFactor]]
    ];
    
    this.shirt = new Sprite(this, assets.image.nacho_shirt, this.x + 127 * sizeFactor, this.y + 104 * sizeFactor, 158 * sizeFactor, 199 * sizeFactor);
    this.shirt.alpha = 0;
    this.shirt.setFrame(0);
    this.shirt.animation.add("break", [0, 1, 2, 3, 4]);
    
    this.fanta_ground = new Sprite(this, assets.image.nacho_fantaground, x - 24 * sizeFactor, y - 24 * sizeFactor, 460 * sizeFactor, 599 * sizeFactor);
    this.fanta_ground.alpha = 0;
    this.fanta_ground.setFrame(0);
    this.fanta_ground.animation.add("fall", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    
    this.timer = new Timer(this);
};

entity.Nacho.extends(Sprite);

entity.Nacho.COSTS = [
    {
        energy: [1, 1.5, 2, 0],
        score: [1, 2, 3, 0]
    },
    {
        energy: [2, 2.5, 3, 0],
        score: [2, 3, 4, 0]
    },
    {
        energy: [3, 3.5, 4, 0],
        score: [3, 4, 5, 0]
    },
    {
        energy: [4, 4.5, 5, 0],
        score: [4, 5, 6, 0]
    }
];

entity.Nacho.prototype.workout = function () {
    this.energy += 10;    
    if (this.energy >= 50) {
        this.score += this.scoreDelta;
        state.dieses.create(this.level);
        if (this.energy > 100) {
            this.energy = 100;
        }
    }
    
    this.changeKey();
    this.updateFrame();
};

entity.Nacho.prototype.dobleWorkout = function () {
    this.energy += 20;
    if (this.energy >= 50) {
        this.score += this.scoreDelta;
        state.dieses.create(this.level);
        if (this.energy > 100) {
            this.energy = 100;
        }
    }
    
    this.allowDobleWorkout = false;
    this.playable = false;
    this.animation.play("dblworkout" + this.level, 1, 3, function () {
        this.playable = true;
    });
};

entity.Nacho.prototype.levelUp = function () {
    if (this.level === 0) {
        this.getSuperLevel();
    } else if (this.level === 1) {
        this.getMegaLevel();
    } else if (this.level === 2) {
        this.activateFantaLevel();
    }
};

entity.Nacho.prototype.getSuperLevel = function () {
    this.playable = false;
    state.stageTimer.timer.pause();
    
    this.animation.play("lvupsuper", false, 6, function () {
        this.updateFrame();
        this.playable = true;
        state.stageTimer.timer.resume();
    });
    
    state.text_superrocoso.alpha = 1;
    state.text_superrocoso.animation.play("show", false, 3, function () {
        this.alpha = 0;
    });
    
    state.karen.levelUp(0);
    state.arrow.level = 1;
    
    state.camera.shake(20);
    
    this.level = 1;
    this.changeFrames();
    this.changeCosts();
};

entity.Nacho.prototype.getMegaLevel = function () {
    this.playable = false;
    state.stageTimer.timer.pause();
    
    this.animation.play("lvupmega", false, 6, function () {
        this.updateFrame();
        this.playable = true;
        state.stageTimer.timer.resume();
    });
    
    this.shirt.alpha = 1;
    this.shirt.animation.play("break", false, 4, function () {
        this.alpha = 0;
    });
    
    state.text_megarocoso.alpha = 1;
    state.text_megarocoso.animation.play("show", false, 3, function () {
        this.alpha = 0;
    });
    
    state.karen.levelUp(1);
    state.arrow.level = 2;
    
    state.camera.shake(25);
    
    this.level = 2;
    this.changeFrames();
    this.changeCosts();
    
    if (state.stage === 4) {
        state.nachoGotMegaLevel();
    }
};

entity.Nacho.prototype.activateFantaLevel = function () {
    this.enteringFantaLevel = true;
    
    state.keyicon_f.animation.play("blink", true, 6);
    state.keyicon_f.alpha = 1;
    
    this.timer.start(300, false, function () {
        this.deactivateFantaLevel();
        state.fantometer.emptySpheres();
    });
};

entity.Nacho.prototype.deactivateFantaLevel = function () {
    this.enteringFantaLevel = false;
    
    state.keyicon_f.animation.pause();
    state.keyicon_f.alpha = 0;
};

entity.Nacho.prototype.getFantaLevel = function () {
    this.playable = false;
    state.stageTimer.timer.pause();
    
    this.animation.play("lvupfanta", false, 6, function () {
        this.updateFrame();
        this.playable = true;
        state.stageTimer.timer.resume();
    });
    
    this.energy = this.maxEnergy;
    
    state.nachoCrossfadeLayer.tween.start([["alpha", 0.7]], 10);
    
    state.text_fantarocoso.alpha = 1;
    state.text_fantarocoso.animation.play("show", false, 3, function () {
        this.alpha = 0;
    });
    
    state.fantometer.animation.play("lvupfanta", false, 6);
    state.fantometer.updateEnergy = false;
    
    this.deactivateFantaLevel();
    
    state.camera.shake(30);
    
    this.level = 3;
    this.changeFrames();
    this.changeCosts();
    
    this.timer.start(300, false, this.leaveFantaLevel);
    
    assets.sound.levelup3.play();
};

entity.Nacho.prototype.leaveFantaLevel = function (func) {
    this.playable = false;
    
    state.nachoCrossfadeLayer.tween.start([["alpha", 0]], 10);
    
    this.timer.pause();
    
    if (func === undefined) {
        this.animation.play("lvdownfanta", false, 6, function () {
            this.updateFrame();
            this.playable = true;
            state.stageTimer.timer.resume();
        });
    } else {
        this.animation.play("lvdownfanta", false, 6, func);
    }
    
    state.fantometer.emptySpheres();
    
    this.level = 2;
    this.changeFrames();
    this.changeCosts();
};

entity.Nacho.prototype.finishStage = function () {
    this.playable = false;
    state.stageTimer.timer.pause();
    
    state.arrow.level = 3;

    assets.sound.start.play();
    state.text_pruebasuperada.alpha = 1;
    state.text_pruebasuperada.animation.play("show", false, 2, function () {
        this.tween.start([["x", this.x - 30], ["y", this.y - 15], ["width", this.width + 60], ["height", this.height + 30]], 60, Tween.modes.LINEAR, false, function () {
            this.tween.start([["alpha", 0], ["x", this.x - 30], ["y", this.y - 15], ["width", this.width + 60], ["height", this.height + 30]], 30);
            state.karen.levelUp(2);
            state.achievement.check();
            state.nacho.animation.play("winthrow", false, 10, function () {
                this.fanta_ground.alpha = 1;
                this.fanta_ground.animation.play("fall", false, 5, function () {
                    this.tween.start([["alpha", 0]], 10, Tween.modes.SMOOTH, 4, function () {
                        this.alpha = 0;
                    });
                });
                this.animation.play("winjump", 2, 16, function () {
                    assets.sound.nacho.play();
                    this.animation.play("wintalk", 6, 8, function () {
                        this.timer.start(30, false, function () {
                            this.animation.play("winsmell", true, 50);
                            this.timer.start(150, false, function () {
                                state.musicTween.start([["volume", 0]], 180);
                                state.crossfadeLayer.tween.start([["alpha", 1]], 180, Tween.modes.LINEAR, false, function () {
                                    state.exit(1);
                                });
                            });
                        });
                    });
                });
            });
        });
    });
};

entity.Nacho.prototype.changeFrames = function () {
    this.frames = this.frameList[this.level];
};

entity.Nacho.prototype.updateFrame = function () {
    this.setFrame(this.frames[this.keyIndex]);
};

entity.Nacho.prototype.changeKey = function () {
    this.keyIndex = (this.keyIndex === 0) ? 1 : 0;
    this.key = this.keys[this.keyIndex];
};

entity.Nacho.prototype.changeCosts = function () {
    this.energyCost = this.energyCosts[this.level];
    this.scoreCost = this.scoreCosts[this.level];
    this.scoreDelta = this.scoreDeltas[this.level];
};

entity.Nacho.prototype.input = function () {
    if (!this.playable)
        return;
        
    if (!this.allowDobleWorkout && (!keyboard.key.a || !keyboard.key.d)) {
        this.allowDobleWorkout = true;
    }
    
    if (keyboard.key.a && keyboard.key.d && this.allowDobleWorkout) {
        this.dobleWorkout();
    } else if (keyboard.wasPressed(this.key)) {
        this.workout();
    } else if (this.enteringFantaLevel && keyboard.wasPressed("f")) {
        this.getFantaLevel();
    } else {
        if (this.energy > this.energyCost) {
            this.energy -= this.energyCost;
        } else {
            this.energy = 0;
        }
        
        if (this.energy < this.halfEnergy) {
            if (this.score > this.scoreCost) {
                this.score -= this.scoreCost;
            } else {
                this.score = 0;
            }
        }
    }
    
    if (this.score >= this.nextScore) {
        if (state.fantometer.addSphere() === true) {
            this.levelUp();
        }
    }
    
    if (this.score >= this.maxScore) {
        this.score = this.maxScore;
        state.stageTimer.timer.pause();
        if (this.level === 3) {
            this.leaveFantaLevel(this.finishStage);
        } else {
            this.finishStage();
        }
    }
};

entity.Nacho.prototype.update = function (camera) {
    this.timer.update();
    this.input();
    
    this.animation.update();
    this.tween.update();
    
    this.shadow.update(camera);
    this.sweat.update(camera);
    this.draw(camera);
    this.shirt.update(camera);
    this.fanta_ground.update(camera);
};
