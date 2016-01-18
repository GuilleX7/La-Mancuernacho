entity.HUD.Achievement = function (parent) {
    Sprite.call(this, parent, assets.image.achievement, 480, -100);
    this.alpha = 0;
    this.timer = new Timer(this);
};

entity.HUD.Achievement.extends(Sprite);

entity.HUD.Achievement.prototype.check = function () {
    var totalScore = SD.total_score + state.nacho.score,
        achievementUnlocked = 0;
    
    if (totalScore >= 10000) {
        if (SD.trophies[0] === 0) SD.trophies[0] = achievementUnlocked = 1;
        if (totalScore >= 30000) {
            if (SD.trophies[1] === 0) SD.trophies[1] = achievementUnlocked = 1;
            if (totalScore >= 50000) {
                if (SD.trophies[2] === 0) SD.trophies[2] = achievementUnlocked = 1;
                if (totalScore >= 70000) {
                    if (SD.trophies[3] === 0) SD.trophies[3] = achievementUnlocked = 1;
                }
            } 
        }
    }
    
    if (achievementUnlocked === 1) {
        this.show();
    }
    
    SD.total_score = (totalScore > 99999) ? 99999 : totalScore;
    
    if (SD.stages < state.stage) {
        SD.stages = state.stage;
    }
    
    saveData();
};

entity.HUD.Achievement.prototype.show = function () {
    state.musicTween.start([["volume", 0.5]], 10);
    this.tween.start([["alpha", 1], ["y", 12]], 30, Tween.modes.EASEOUT, false, function () {
        this.timer.start(150, false, this.hide);
    });
    assets.sound.trophy_unlock.currentTime = 0;
    assets.sound.trophy_unlock.play();
};

entity.HUD.Achievement.prototype.hide = function () {
    this.tween.start([["alpha", 0], ["y", -100]], 30, Tween.modes.EASEIN, false);
    state.musicTween.start([["volume", 1]], 30);
};

entity.HUD.Achievement.prototype.update = function () {
    this.timer.update();
    this.tween.update();
    this.draw();
};
