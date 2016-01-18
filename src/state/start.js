states.START = function () {
    this.videoPlayer = new Sprite(this, assets.video.start, 0, 0);
    
    this.text_pressmancuernas = new Sprite(this, assets.image.text_pressmancuernas, 202, 316);
    this.text_pressmancuernas.alpha = 0;
    this.text_pressmancuernas.tween.start([["alpha", 1]], 60, Tween.modes.LINEAR, true);
    
    this.text_new = new Text(this, "Nuevo entrenamiento", 50, 280, "pixel", 23, "#F5B73A", 0);
    this.text_continue = new Text(this, "Continuar entrenamiento", 370, 280, "pixel", 23, "#F5B73A", 0);
    this.text_import = new Text(this, "Importar entrenamiento", 48, 330, "pixel", 23, "#F5B73A", 0);
    this.text_export = new Text(this, "Exportar entrenamiento", 372, 330, "pixel", 23, "#F5B73A", 0);
    
    this.text_message = new Text(this, "", 40, 280, "pixel", 23, "#F5B73A", 0, "", true);
    
    this.musicTween = new Tween(assets.sound.opening);
    
    this.crossfadeLayer = new entity.HUD.CrossfadeLayer(this, 704, 396);
    this.crossfadeLayer.alpha = 0;
    
    this.selector = new Sprite(this, assets.image.pausemenu_selector, 5, 284, 42, 25);
    this.selector.positions = [[5, 326], [284, 330]];
    this.selector.alpha = 0;
    
    this.menuShown = false;
    this.selected = [0, 0];
    this.selectable = false;
    this.alreadySavedata = checkData();
    
    this.sdgroup = document.getElementById("sdgroup");
    this.sdtext = document.getElementById("sdtext");
    this.sdbutton = document.getElementById("sdbutton");
    
    assets.video.start.loop = true;
    assets.video.start.play();
    
    keyboard.reset();
};

states.START.prototype.showMenu = function () {
    this.text_pressmancuernas.tween.stop();
    this.text_pressmancuernas.alpha = 0;
    
    this.text_new.alpha = 1;
    this.text_continue.alpha = 1;
    this.text_import.alpha = 1;
    this.text_export.alpha = 1;
    
    if (this.alreadySavedata === false) {
        this.text_continue.color = "#7F7F7F";
        this.text_export.color = "#7F7F7F";
    }
    
    this.selector.alpha = 1;
    this.selectable = true;
    this.menuShown = true;
    
    assets.sound.selected.play();
};

states.START.prototype.changeSelected = function (xSelection, ySelection) {
    if (ySelection === -1) {
        //X selection
        if (this.selected[0] === xSelection)
            return;
            
        this.selected[0] = xSelection;
        this.selector.x = this.selector.positions[0][xSelection];
    } else {
        //Y selection
        if (this.selected[1] === ySelection)
            return;
            
        this.selected[1] = ySelection;
        this.selector.y = this.selector.positions[1][ySelection];
    }
    
    assets.sound.select.currentTime = 0;
    assets.sound.select.play();
};

states.START.prototype.selectionDone = function () {
    if (this.selected[0] === 0) {
        if (this.selected[1] === 0) {
            this.selectable = false;
            newData();
            this.exit();
        } else {
            this.changeMode(0);
        }
    } else if (this.alreadySavedata === true) {
        if (this.selected[1] === 0) {
            this.selectable = false;
            loadData();
            this.exit();
        } else {
            loadData();
            this.changeMode(1);
        }
    } else {
        assets.sound.denied.currentTime = 0;
        assets.sound.denied.play();
    }
};

states.START.prototype.changeMode = function (mode) {
    allowFullscreen = [false, false, true][mode];
    this.selectable = [false, false, true][mode];
    this.selector.alpha = [0, 0, 1][mode];
    this.text_new.alpha = [0, 0, 1][mode];
    this.text_continue.alpha = [0, 0, 1][mode];
    this.text_import.alpha = [0, 0, 1][mode];
    this.text_export.alpha = [0, 0, 1][mode];
    this.text_message.alpha = [1, 1, 0][mode];
    this.sdgroup.style.display = ["block", "block", "none"][mode];
    this.sdbutton.style.display = ["inline", "none", "none"][mode];
    
    if (mode === 0) {
        //Importing
        requestExitFullscreen();
        this.text_message.text = "Escribe aquí el código de entrenamiento generado/anteriormente y presiona Importar";
        this.sdtext.value = "";
        this.sdtext.readOnly = false;
        this.sdbutton.addEventListener("click", this.import, false);
    } else if (mode === 1) {
        //Exporting
        requestExitFullscreen();
        this.text_message.text = "Guarda este código de entrenamiento para recuperar tu/entrenamiento en cualquier dispositivo";
        this.sdtext.value = encrypt();
        this.sdtext.readOnly = true;
    } else {
        //Start menu
        this.sdbutton.removeEventListener("click", this.import, false);
    }
};

states.START.prototype.import = function () {
    var status = decrypt(state.sdtext.value);
    
    if (status === 1) {
        state.text_message.text = "Error: ¡esto no es un código de entrenamiento!";
        assets.sound.denied.currentTime = 0;
        assets.sound.denied.play();
    } else {
        SD = status;
        saveData();
        state.changeMode(2);
        state.exit();
    }
};

states.START.prototype.exit = function () {
    assets.sound.start.play();
    this.musicTween.start([["volume", 0]], 30);
    this.crossfadeLayer.tween.start([["alpha", 1]], 30, Tween.modes.LINEAR, false, function () {
        assets.video.start.pause();
        assets.sound.opening.pause();
        state = new states.MERIWORLD();
    });
};

states.START.prototype.input = function () {
    if (this.menuShown === false) {
        if (keyboard.wasPressed("spacebar")) {
            this.showMenu();
        }
    } else if (this.selectable === true) {
        if (keyboard.wasPressed("spacebar")) {
            this.selectionDone();
        } else if (keyboard.wasPressed("leftarrow")) {
            this.changeSelected(0, -1);
        } else if (keyboard.wasPressed("rightarrow")) {
            this.changeSelected(1, -1);
        } else if (keyboard.wasPressed("uparrow")) {
            this.changeSelected(-1, 0);
        } else if (keyboard.wasPressed("downarrow")) {
            this.changeSelected(-1, 1);
        }
    } else {
        if (keyboard.wasPressed("q")) {
            this.changeMode(2);
        }
    }
    
    keyboard.reset();
};

states.START.prototype.update = function () {
    this.input();
        
    this.videoPlayer.update();
    this.text_pressmancuernas.update();
    this.text_new.draw();
    this.text_continue.draw();
    this.text_import.draw();
    this.text_export.draw();
    this.text_message.draw();
    this.selector.draw();
    this.crossfadeLayer.update();
    this.musicTween.update();
};
