entity.HUD.StageTimer = function (parent, x, y, seconds) {
    Text.call(this, parent, "", x, y, "timer", 42, "#FFFFFF", 1, "bold", false, {blur: 0, offsetX: 0, offsetY: 3, color: "#000000"});
    this.seconds = seconds;
    this.timer = new Timer(this);
};

entity.HUD.StageTimer.extends(Text);

entity.HUD.StageTimer.prototype.start = function () {
    this.timer.start(60, true, undefined, this.secondLapsed);
};

entity.HUD.StageTimer.prototype.secondLapsed = function () {
    if (this.seconds === 0) {
        this.timer.pause();
        assets.sound.start.play();
        if (state.nacho.level === 3) {
            state.nacho.leaveFantaLevel(this.finished);
        } else {
            this.finished();
        }
    } else {
        if (this.seconds <= 10) {
            if (this.seconds === 10) {
                this.color = "#F64883";
                this.x += 10;
            }
            assets.sound.timeout.currentTime = 0;
            assets.sound.timeout.play();
        }
        this.seconds--;
    }
};

entity.HUD.StageTimer.prototype.finished = function () {
    state.nacho.playable = false;
    state.text_tiempoagotado.alpha = 1;
    state.text_tiempoagotado.animation.play("show", false, 2, function () {
        this.tween.start([["x", this.x - 30], ["y", this.y - 15], ["width", this.width + 60], ["height", this.height + 30]], 60, Tween.modes.LINEAR, false, function () {
            this.tween.start([["alpha", 0], ["x", this.x - 30], ["y", this.y - 15], ["width", this.width + 60], ["height", this.height + 30]], 30);
            state.musicTween.start([["volume", 0]], 180);
            state.crossfadeLayer.tween.start([["alpha", 1]], 180, Tween.modes.LINEAR, false, function () {
                state.exit(0);
                state = new states.MERIWORLD();
            });
        });
    });
};

entity.HUD.StageTimer.prototype.update = function () {
    this.timer.update();
    this.text = this.seconds;
    this.tween.update();
    this.draw();
};
