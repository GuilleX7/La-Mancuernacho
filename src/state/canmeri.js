states.CANMERI = function () {
    this.camera = new Camera(this, -1051, 0);
    
    this.nacho = new entity.Nacho(this, -40, 0, 1.2);
    this.karen = new entity.Karen(this, 375, 170, 0.66);
    
    this.fantometer = new entity.HUD.Fantometer(this, 10, 10);
    this.fantometer.alpha = 0;
    this.dieses = new entity.HUD.Dieses(this, 146, 0, 331, 70);
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
    
    this.background = new Sprite(this, assets.image.stage_canmeri, -1051, 0);
    this.background_people = new Sprite(this, assets.image.stage_canmeri_people, -1051, 269);
    this.background_people.animation.add("drink", [0, 1]);
    this.background_people.animation.play("drink", true, 60);
    this.background_linketo = new Sprite(this, assets.image.stage_canmeri_linketo, 287, 176);
    this.background_linketo.animation.add("climb", [0, 1]);
    this.background_linketo.animation.play("climb", true, 60);

    this.crossfadeLayer.tween.start([["alpha", 0]], 180, Tween.modes.LINEAR, false, function () {
        state.camera.tween.start([["x", 0]], 380, Tween.modes.EASEINOUT, false, function () {
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
    
    assets.sound.music3.volume = 0;
    assets.sound.music3.currentTime = 0;
    assets.sound.music3.loop = true;
    this.musicTween = new Tween(assets.sound.music3);
    this.musicTween.start([["volume", 1]], 300, Tween.modes.LINEAR, false);
    assets.sound.music3.play();
    keyboard.reset();

    window.addEventListener("blur", this.pause, false);
};

states.CANMERI.prototype.setMusicVolume = function (volume) {
    assets.sound.music3.volume = volume;
};

states.CANMERI.prototype.pause = function () {
    state.pauseMenu.show();
};

states.CANMERI.prototype.exit = function (invocator) {
    window.removeEventListener("blur", this.pause);
    assets.sound.music3.pause();
    if (invocator === 1) {
        state = new states.MERIWORLD();
    }
};

states.CANMERI.prototype.update = function () {
    this.pauseMenu.update();
    if (this.pauseMenu.paused === true)
        return;
        
    this.camera.update();
    this.background.update(this.camera);
    this.background_people.update(this.camera);
    this.background_linketo.update(this.camera);
    this.dieses.update();
    this.arrow.update();
    this.nachoCrossfadeLayer.update();
    this.karen.update(this.camera);
    this.nacho.update(this.camera);
    this.fantometer.update();
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
