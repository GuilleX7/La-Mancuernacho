states.CREDITS = function () {
    this.crossfadeLayer = new entity.HUD.CrossfadeLayer(this, 704, 396);
    
    this.background = new Sprite(this, assets.image.credits_background, 0, 0);
    
    this.clouds = new Sprite(this, assets.image.credits_clouds, 0, 0);
    this.clouds.tween.start([["y", -239]], 13680);
    
    this.sun = new Sprite(this, assets.image.credits_sun, 160, 51);
    this.sun.tween.start([["y", 71]], 13680);
    
    this.dieses = new entity.HUD.Dieses(this, 0, 0, 660, 195);
    
    this.road = new Sprite(this, assets.image.credits_road, 0, 228);    
    this.road.animation.add("moving", range(0, 5));
    this.road.animation.play("moving", true, 6);
    
    this.streetlights = new Sprite(this, assets.image.credits_streetlights, 0, 0);
    this.streetlights.animation.add("moving", [0, 1]);
    this.streetlights.animation.play("moving", true, 8);
    
    this.city_landscape = new Sprite(this, assets.image.credits_city_landscape, 0, 200);
    this.city_landscape.tween.start([["y", 115]], 13680);
    
    this.city_glow = new Sprite(this, assets.image.credits_city_glow, 0, 0);
    this.city_glow.tween.start([["alpha", 0]], 2280);
    
    this.car = new entity.Car(this, 210, 170);
    
    this.gradient = ctx.createLinearGradient(0, 10, 0, 60);
    this.gradient.addColorStop(0, "#FFFFFF");
    this.gradient.addColorStop(0.5, "#FFFFFF");
    this.gradient.addColorStop(0.51, "#BDBCBF");
    this.gradient.addColorStop(1, "#BDBCBF");
    
    this.title = new Text(this, "", 0, 0, "pixel", 50, this.gradient, 1, "bold", false, {blur: 0, offsetX: 2, offsetY: 2, color: "#000000"});
    this.content = [];
    this.textIndex = 0;
    this.contentIndex = 0;
    this.text = states.CREDITS.texts[this.textIndex];
    
    this.text_descubre = new Text(this, "¡Descubre las teclas ocultas!", 3, 377, "timer", 13, "#FFFFFF");
    
    this.timer = new Timer(this);
    
    this.thanks = new Sprite(this, assets.image.credits_thanks, 0, 0);
    this.thanks.animation.add("thanks", [0, 1]);
    this.thanks.alpha = 0;
    this.thanksShown = false;
    
    assets.sound.credits.currentTime = 0;
    assets.sound.credits.volume = 0;
    assets.sound.credits.play();
    
    assets.sound.car.currentTime = 0;
    assets.sound.car.volume = 0;
    assets.sound.car.loop = true;
    assets.sound.car.play();
    
    this.musicTween = new Tween(assets.sound.credits);
    this.musicTween.start([["volume", 1]], 110, Tween.modes.LINEAR, false, function () {
        state.crossfadeLayer.tween.start([["alpha", 0]], 10);
        state.timer.start(300, false, state.showTitle);
    });
    
    this.paused = false;
    this.exiting = false;
    
    window.addEventListener("blur", this.pause, false);
    window.addEventListener("focus", this.resume, false);
};

states.CREDITS.prototype.pause = function () {
    state.paused = true;
    assets.sound.credits.pause();
    assets.sound.car.pause();
};

states.CREDITS.prototype.resume = function () {
    state.paused = false;
    assets.sound.credits.play();
    assets.sound.car.play();
};

states.CREDITS.prototype.exit = function () {
    this.exiting = true;
    
    window.removeEventListener("blur", this.pause);
    window.removeEventListener("focus", this.resume);
    
    this.musicTween.start([["volume", 0]], 300, Tween.modes.LINEAR, false, function () {
        assets.sound.credits.pause();
        assets.sound.car.pause();
    });
    
    this.crossfadeLayer.tween.start([["alpha", 1]], 300, Tween.modes.LINEAR, false, function () {
        state.thanksShown = true;
        state.timer.start(90, false, function () {
            state.thanks.animation.play("thanks", true, 6);
            state.thanks.tween.start([["alpha", 1]], 120, Tween.modes.LINEAR, false, function () {
                state.timer.start(420, false, function () {
                    state.thanks.tween.start([["alpha", 0]], 120, Tween.modes.LINEAR, false, function () {
                        state.timer.start(90, false, function () {
                            state = new states.MERIWORLD();
                        });
                    });
                });
            });
        });
    });
};

states.CREDITS.prototype.showTitle = function () {
    if (this.textIndex === states.CREDITS.texts.length) {
        this.title.alpha = 0;
        this.exit();
        return;
    }
    
    this.text = states.CREDITS.texts[this.textIndex];
    this.title.text = this.text.title;
    this.title.y = 10;
    var width = this.title.measure().width;
    this.title.x = -width;
    this.title.tween.start([["x", 352 - (width / 2)]], 120, Tween.modes.EASEOUT, false, function () {
        state.showContent();
        state.timer.start(360, true, undefined, state.showContent);
    });
    this.contentIndex = 0;
    this.textIndex++;
};

states.CREDITS.prototype.hideTitle = function () {
    state.title.tween.start([["x", 704]], 60, Tween.modes.EASEIN, false, function () {
        state.showTitle();
    });
};

states.CREDITS.prototype.showContent = function () {
    var text = new Text(this, this.text.content[this.contentIndex], 0, 150, "pixel", 25, "#FFFFFF", 0, "", false, {blur: 0, offsetX: 2, offsetY: 2, color: "#000000"});
    text.x = 352 - (text.measure().width / 2);
    
    this.contentIndex++;
    if (this.contentIndex === this.text.content.length) {
        this.timer.pause();
        text.tween.start([["y", 140], ["alpha", 1]], 60, Tween.modes.LINEAR, false, function () {
            this.tween.start([["y", 70]], 420, Tween.modes.LINEAR, false, function () {
                this.tween.start([["y", 60], ["alpha", 0]], 60, Tween.modes.LINEAR, false, state.hideTitle);
            });
        });
    } else {
        text.tween.start([["y", 140], ["alpha", 1]], 60, Tween.modes.LINEAR, false, function () {
            this.tween.start([["y", 70]], 420, Tween.modes.LINEAR, false, function () {
                this.tween.start([["y", 60], ["alpha", 0]], 60);
            });
        });
    }
    
    this.content.push(text);
};

states.CREDITS.texts = [
    {
        title: "DESARROLLO",
        content: [
            "guille7",
            "FBurning"
        ]
    },
    {
        title: "VOCES",
        content: [
            "guille7",
            "FBurning",
            "Nacho Ortiz",
            "Karen Hernández"
        ]
    },
    {
        title: "PERSONAJES",
        content: [
            "Nacho Ortiz",
            "Pep Sánchez",
            "Karen Hernández",
            "Trollaso",
            "Andy Hug",
            "Seiyaburgos",
            "Sereo3"
        ]
    },
    {
        title: "MÚSICA",
        content: [
            "Gonna Fly Now (Metal cover)",
            "Sad Theme - DarkWalker2090",
            "Nebula - Dudeguy021",
            "Valrens Fight - Kid2Will",
            "Interrupt - TRSBand",
            "Cyberspace Escape - BlackOrWhit3",
            "Gun Dumb - WarmanSteve",
            "What Is Love (Metal cover)"
        ]
    },
    {
        title: "AGRADECIMIENTOS A",
        content: [
            "Nacho Ortiz",
            "Karen Hernández",
            "¡A ti por jugar!"
        ]
    }
];

states.CREDITS.prototype.input = function () {
    if (keyboard.wasPressed("q") && this.exiting === false) {
        this.exit();
    }
};

states.CREDITS.prototype.update = function () {
    if (this.thanksShown === false) {
        if (this.paused === true)
            return;
            
        this.input();
        
        this.background.update();
        this.sun.update();
        this.city_landscape.update();
        this.dieses.update();
        this.clouds.update();
        this.road.update();
        this.streetlights.update();
        this.car.update();
        this.city_glow.update();
        
        this.timer.update();
        this.title.update();
        for (var i = 0; i < this.content.length; i++) {
            this.content[i].update();
            if (this.content[i].tween.playing === false) {
                this.content.splice(i, 1);
                i--;
            }
        }
        
        this.text_descubre.update();
        this.crossfadeLayer.update();
        this.musicTween.update();
        assets.sound.car.volume = assets.sound.credits.volume;
        
        keyboard.reset();
    } else {
        this.timer.update();
        ctx.clearRect(0, 0, 704, 396);
        this.thanks.update();
    }
};
