var difficulty = 0;

states.DIFFICULTY = function () {
    this.selector = new Sprite(this, assets.image.difficulty_selector, 352, 220, 0, 0);
    this.selector.setFrame(0);
    this.selector.alpha = 0;
    this.selected = 0;
    this.selectable = false;
    
    this.upArrow = new Sprite(this, assets.image.difficulty_arrow, 352, 174, 0, 0);
    this.upArrow.setFrame(1);
    this.upArrow.alpha = 0;
    
    this.downArrow = new Sprite(this, assets.image.difficulty_arrow, 352, 266, 0, 0);
    this.downArrow.setFrame(0);
    this.downArrow.alpha = 0;
    
    this.difficultyText = new Text(this, "Dificultad", 300, 124, "pixel", 20, "#FFFFFF", 0, "bold");
    
    this.selector.tween.start([["alpha", 1], ["x", 271], ["y", 184], ["width", 162], ["height", 73]], 15, Tween.modes.EASEOUT, false, function () {
        state.upArrow.tween.start([["alpha", 1], ["x", 344], ["y", 165], ["width", 16], ["height", 19]], 15, Tween.modes.EASEOUT);
        state.downArrow.tween.start([["alpha", 1], ["x", 344], ["y", 257], ["width", 16], ["height", 19]], 15, Tween.modes.EASEOUT, false, function () {
            state.selectable = true;
        });
    });
    this.difficultyText.tween.start([["alpha", 1]], 15);
    
    assets.sound.difficulty_start.play();
    
    keyboard.reset();
};

states.DIFFICULTY.prototype.input = function () {
    if (this.selectable === false)
        return;
        
    if (keyboard.wasPressed("uparrow") && this.selected > 0) {
        this.changeSelected(-1);
    } else if (keyboard.wasPressed("downarrow") && this.selected < 3) {
        this.changeSelected(1);
    } else if (keyboard.wasPressed("spacebar")) {
        this.selectionDone();
    }
    
    keyboard.reset();
};

states.DIFFICULTY.prototype.changeSelected = function (selection) {
    this.selected += selection;
    this.selector.setFrame(this.selected);
    this.selectable = false;
    
    if (selection === -1) {
        this.upArrow.tween.start([["y", this.upArrow.y - 5]], 5, Tween.modes.LINEAR, 2, function () {
            state.selectable = true;
        });
    } else {
        this.downArrow.tween.start([["y", this.downArrow.y + 5]], 5, Tween.modes.LINEAR, 2, function () {
            state.selectable = true;
        });
    }
    
    assets.sound.difficulty_select.currentTime = 0;
    assets.sound.difficulty_select.play();
};

states.DIFFICULTY.prototype.selectionDone = function () {
    this.selectable = false;
    
    difficulty = this.selected;
    
    this.difficultyText.tween.start([["alpha", 0]], 20);
    this.upArrow.tween.start([["alpha", 0]], 20);
    this.downArrow.tween.start([["alpha", 0]], 20);
    this.selector.tween.start([["alpha", 0]], 20, Tween.modes.LINEAR, false, function () {
        state = new states.OPENING();
    });
    
    assets.sound.difficulty_selected.play();
};

states.DIFFICULTY.prototype.update = function () {
    ctx.clearRect(0, 0, 704, 396);
    this.input();
    this.difficultyText.update();
    this.selector.update();
    this.upArrow.update();
    this.downArrow.update();
};
