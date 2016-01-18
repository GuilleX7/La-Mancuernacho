states.INTRO = function () {
    this.logo = new Sprite(this, assets.image.intro_logo);
    this.logo.alpha = 0;
    this.logo.tween.start([["alpha", 1.5]], 120, Tween.modes.LINEAR, false, function () {
        this.alpha = 1;
        assets.sound.coin1.play();
        this.tween.start([["alpha", 0]], 90, Tween.modes.LINEAR, false, function () {
            state.timer.start(30, false, function () {
                ctx.globalAlpha = 1;
                state = new states.DIFFICULTY();
            });
        });
    });
    
    this.timer = new Timer();
};

states.INTRO.prototype.update = function () {
    ctx.clearRect(0, 0, 704, 396);
    this.logo.update();
    this.timer.update();
};
