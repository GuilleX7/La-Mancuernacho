states.FIDELIDATION = function () {
    this.camera = new Camera(this, 0, 544);
    
    this.nacho = new entity.Nacho(this, 68, 110, 0.48);
    this.karen = new entity.Karen(this, 460, 170, 0.32);
    
    this.fantometer = new entity.HUD.Fantometer(this, 10, 10);
    this.fantometer.alpha = 0;
    this.dieses = new entity.HUD.Dieses(this);
    this.arrow = new entity.HUD.Arrow(this, 470, 0);
    this.pauseMenu = new entity.HUD.PauseMenu(this);
    this.crossfadeLayer = new entity.HUD.CrossfadeLayer(this, 704, 396);
    this.nachoCrossfadeLayer = new entity.HUD.CrossfadeLayer(this, 704, 396);
    this.nachoCrossfadeLayer.alpha = 0;
    this.achievement = new entity.HUD.Achievement(this);
    this.stageTimer = new entity.HUD.StageTimer(this, 645, 337, 90);
    this.stageTimer.alpha = 0;
    
    this.keyicon_f = new Sprite(this, assets.image.keyicon_f, 35, 100);
    this.keyicon_f.animation.add("blink", [0, 1]);
    this.keyicon_f.alpha = 0;
    
    this.text_listo = new Sprite(this, assets.image.text_listo, 82, 116);
    this.text_listo.animation.add("show", [0, 1, 2]);
    this.text_listo.alpha = 0;
    this.text_ya = new Sprite(this, assets.image.text_ya, 202, 135);
    this.text_ya.animation.add("show", [0, 1, 2]);
    this.text_ya.alpha = 0;
    this.text_pruebasuperada = new Sprite(this, assets.image.text_pruebasuperada, 89, 83);
    this.text_pruebasuperada.animation.add("show", [0, 1, 2]);
    this.text_pruebasuperada.alpha = 0;
    this.text_tiempoagotado = new Sprite(this, assets.image.text_tiempoagotado, 86, 73);
    this.text_tiempoagotado.animation.add("show", [0, 1, 2]);
    this.text_tiempoagotado.alpha = 0;
    
    this.text_superrocoso = new Sprite(this, assets.image.text_superrocoso, 0, 110);
    this.text_superrocoso.animation.add("show", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    this.text_superrocoso.alpha = 0;
    this.text_megarocoso = new Sprite(this, assets.image.text_megarocoso, 0, 110);
    this.text_megarocoso.animation.add("show", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    this.text_megarocoso.alpha = 0;
    this.text_fantarocoso = new Sprite(this, assets.image.text_fantarocoso, 0, 0);
    this.text_fantarocoso.animation.add("show", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    this.text_fantarocoso.alpha = 0;
    
    this.background = new Sprite(this, assets.image.stage_fidelitation, 0, 0);
    this.background_hirai = new Sprite(this, assets.image.stage_fidelitation_hirai, 193, 470);
    this.background_hirai.setFrame(0);
    this.background_hirai.animation.add("greet", [0, 1]);
    this.background_hirai.animation.play("greet", true, 60);
    this.background_people = new Sprite(this, assets.image.stage_fidelitation_people, 0, 523);
    this.background_people.setFrame(0);
    this.background_people.animation.add("cheer", [0, 1]);
    this.background_people.animation.play("cheer", true, 60);
    this.spotlight_shadow = new Sprite(this, assets.image.stage_fidelitation_spotlight_shadow, 0, 0);
    this.spotlight_shadow.alpha = 0;
    this.spotlight_anim = new Sprite(this, assets.image.stage_fidelitation_spotlight_anim, 297, 110);
    this.spotlight_anim.alpha = 0;
    this.spotlight_anim.setFrame(0);
    this.spotlight_anim.animation.add("give", [0, 0, 1, 2, 2]);
    this.spotlight_light = new Sprite(this, assets.image.stage_fidelitation_spotlight_light, 220, 18);
    this.spotlight_light.alpha = 0;
    
    this.crossfadeLayer.tween.start([["alpha", 0]], 180, Tween.modes.LINEAR, false, function () {
        state.camera.tween.start([["y", 0]], 380, Tween.modes.EASEINOUT, false, function () {
            state.background_hirai.alpha = 0;
            state.background_hirai.animation.pause();
            state.background_people.alpha = 0;
            state.background_people.animation.pause();
            state.arrow.initAnims();
            state.stageTimer.tween.start([["alpha", 1]]);
            state.fantometer.text_rocosidad.tween.start([["alpha", 1]]);
            state.fantometer.lights.tween.start([["alpha", 1]]);
            state.fantometer.text_dieses.tween.start([["alpha", 1]]);
            state.fantometer.tween.start([["alpha", 1]], 60, Tween.modes.LINEAR, false, function () {
                assets.sound.karen.play();
                state.text_listo.alpha = 1;
                state.text_listo.animation.play("show", false, 2, function () {
                    this.tween.start([["x", this.x - 30], ["y", this.y - 15], ["width", this.width + 60], ["height", this.height + 30]], 50, Tween.modes.LINEAR, false, function () {
                        this.tween.start([["alpha", 0], ["x", this.x - 30], ["y", this.y - 15], ["width", this.width + 60], ["height", this.height + 30]], 30);
                        state.text_ya.alpha = 1;
                        state.text_ya.animation.play("show", false, 2, function () {
                            this.tween.start([["x", this.x - 30], ["y", this.y - 30], ["width", this.width + 60], ["height", this.height + 60]], 30, Tween.modes.LINEAR, false, function () {
                                state.nacho.playable = true;
                                state.stageTimer.start();
                                this.tween.start([["alpha", 0], ["x", this.x - 30], ["y", this.y - 30], ["width", this.width + 60], ["height", this.height + 60]], 15);
                            });
                        });
                    });
                });
            });
        });
    });
    
    this.stage = 4;
    
    assets.sound.music4.volume = 0;
    assets.sound.music4.currentTime = 0;
    assets.sound.music4.loop = true;
    this.musicTween = new Tween(assets.sound.music4);
    this.musicTween.start([["volume", 1]], 300, Tween.modes.LINEAR, false);
    assets.sound.music4.play();
    
    assets.sound.fidelidation_crowd.currentTime = 0;
    assets.sound.fidelidation_crowd.loop = true;
    assets.sound.fidelidation_crowd.play();
    
    keyboard.reset();

    window.addEventListener("blur", this.pause, false);
};

states.FIDELIDATION.prototype.setMusicVolume = function (volume) {
    assets.sound.fidelidation_crowd.volume = volume - 0.25;
    assets.sound.music4.volume = volume;
};

states.FIDELIDATION.prototype.pause = function () {
    state.pauseMenu.show();
};

states.FIDELIDATION.prototype.exit = function (invocator) {
    window.removeEventListener("blur", this.pause);
    assets.sound.fidelidation_crowd.pause();
    assets.sound.music4.pause();
    if (invocator === 1) {
        state = new states.CREDITS();
    }
};

states.FIDELIDATION.prototype.nachoGotMegaLevel = function () {
    this.spotlight_light.alpha = 1;
    this.spotlight_shadow.alpha = 1;
    assets.sound.fidelidation_surprise.play();
    assets.sound.fidelidation_spotlight.play();
    this.spotlight_anim.tween.start([["alpha", 1]], 30, Tween.modes.LINEAR, false, function () {
        this.animation.play("give", false, 45, function () {
            this.tween.start([["alpha", 0]], 10);
            this.parent.spotlight_light.tween.start([["alpha", 0]], 10);
            this.parent.spotlight_shadow.tween.start([["alpha", 0]], 10);
        });
    });
};

states.FIDELIDATION.prototype.update = function () {
    this.pauseMenu.update();
    if (this.pauseMenu.paused === true)
        return;
        
    this.camera.update();
    this.background.update(this.camera);
    this.background_hirai.update(this.camera);
    this.background_people.update(this.camera);
    this.dieses.update();
    this.nachoCrossfadeLayer.update();
    this.karen.update(this.camera);
    this.nacho.update(this.camera);
    this.spotlight_shadow.update(this.camera);
    ctx.globalCompositeOperation = "lighter";
    this.spotlight_light.update(this.camera);
    ctx.globalCompositeOperation = "source-over";
    this.spotlight_anim.update(this.camera);
    this.fantometer.update();
    this.arrow.update();
    this.keyicon_f.update();
    this.text_superrocoso.update();
    this.text_megarocoso.update();
    this.text_fantarocoso.update();
    this.text_listo.update();
    this.text_ya.update();
    this.text_pruebasuperada.update();
    this.text_tiempoagotado.update();
    this.achievement.update();
    this.stageTimer.update();
    this.crossfadeLayer.update();
    this.musicTween.update();
    keyboard.reset();
};
