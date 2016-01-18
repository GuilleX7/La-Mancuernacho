states.OPENING = function () {
    this.paused = false;
    
    this.videoPlayer = new Sprite(this, assets.video.opening, 0, 0);
    this.videoPlayer.alpha = 0;
    this.videoPlayer.tween.start([["alpha", 1]], 300);
    
    assets.video.opening.loop = false;
    assets.video.opening.addEventListener("ended", this.exit, false);
    assets.video.opening.play();
    assets.sound.opening.loop = true;
    assets.sound.opening.play();
    
    window.addEventListener("blur", this.pause, false);
    window.addEventListener("focus", this.resume, false);
};

states.OPENING.prototype.pause = function () {
    this.paused = true;
    assets.video.opening.pause();
    assets.sound.opening.pause();
};

states.OPENING.prototype.resume = function () {
    this.paused = false;
    assets.video.opening.play();
    assets.sound.opening.play();
};

states.OPENING.prototype.exit = function () {
    window.removeEventListener("blur", state.pause);
    window.removeEventListener("focus", state.resume);
    assets.video.opening.removeEventListener("ended", this.exit);
    state = new states.START();
};

states.OPENING.prototype.update = function () {
    if (this.paused)
        return;
    
    if (keyboard.wasPressed("spacebar"))
        return this.exit();
        
    this.videoPlayer.update();
};
