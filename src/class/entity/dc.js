entity.DC = function (parent) {
    Sprite.call(this, parent, assets.image.meriworld_dc_big, -229, 94);
    this.animation.add("speak", [0, 2]);
    this.setFrame(0); //Quiet
    this.shown = false;
    this.speaking = false;
    this.shouting = false;
    
    this.bubble = new Sprite(this, assets.image.bubble, 48, 293);
    this.bubble.alpha = 0;
    
    this.text = new Text(this, "", 0, 0, "pixel", 0, "#000000");
    this.text.letterIndex = 0;
    this.text.timer = new Timer(this);
    
    this.timer = new Timer(this);
    
    assets.sound.dc_speak.loop = true;
    assets.sound.dc_shout.loop = true;
};

entity.DC.extends(Sprite);

entity.DC.texts = [
    //LEVEL SPEECHS
    {text: "El hogar de todo merirocoso", x: 40, y: 30, size: 40, multiline: false},
    {text: "Yo también fui programador de M4", x: 25, y: 30, size: 35, multiline: false},
    {text: "Aquí puedes ver todas tus insignias", x: 25, y: 30, size: 32, multiline: false},
    {text: "¡Camarero! ¡un poco más de PRISA, por favor!", x: 23, y: 35, size: 26, multiline: false},
    {text: "yo, yo lo kiero! de donde eres?", x: 40, y: 30, size: 35, multiline: false},
    //INTRO SPEECH
    {text: "Bienvenid@ a Meriworld./Mi nombre es DC, y estoy aquí para ayudarte./(...)", x: 11, y: 10, size: 24, multiline: true},
    {text: "Desde este menú podrás elegir los distintos/escenarios del planeta Meristation una vez/hayas conseguido desbloquearlos. (...)", x: 11, y: 10, size: 24, multiline: true},
    {text: "Si tienes alguna duda, no dudes en pulsar Q para/revisar el tutorial./Encandado de haberte conocido. (...)", x: 11, y: 10, size: 24, multiline: true},
    //LOCKED SPEECH
    {text: "Lo siento, este nivel se encuentra cerrado./Si deseas acceder a él, ¡ve a conseguir los puntos/de los cojones!", x: 8, y: 10, size: 24, multiline: true, shout: 207}
];

entity.DC.prototype.show = function (index) {
    this.setFrame(0);
    this.bubble.tween.start([["alpha", 1]], 20);
    this.tween.start([["x", 16]], 20, Tween.modes.EASEOUT, false, function () {
        this.shown = true;
        if (index !== undefined) {
            this.speak(index);
        }
    });
};

entity.DC.prototype.speak = function (index) {
    if (this.shown === false)
        return this.show(index);
        
    var tmp = entity.DC.texts[index];
    this.text.text = "";
    this.text.letterIndex = 0;
    this.text.x = this.bubble.x + tmp.x;
    this.text.y = this.bubble.y + tmp.y;
    this.text.size = tmp.size;
    this.text.alpha = 1;
    this.text.multiline = tmp.multiline;
    this.text.modifiers = "";
    this.text.fontString = Text.createFontTag(this.text);
    this.text.cText = tmp.text;
    this.text.timer.start(3, tmp.text.length + 1, this.stopSpeaking, this.nextLetter);
    
    this.speaking = true;
    this.shouting = false;
    this.animation.play("speak", true, 6);
    assets.sound.dc_speak.currentTime = 0;
    assets.sound.dc_speak.play();
        
    //Shouting time defined?
    if (tmp.shout === undefined) {
        //No, maybe random time
        var rnd = rndInt(10, 30);
        if (rnd > 25) {
            this.timer.start(rnd, false, this.shout);
        }
    } else {
        //Yes!
        this.timer.start(tmp.shout, false, this.shout);
    }
};

entity.DC.prototype.nextLetter = function () {
    this.text.text += (this.shouting === false) ? this.text.cText[this.text.letterIndex] : this.text.cText[this.text.letterIndex].toUpperCase();
    this.text.letterIndex++;
};

entity.DC.prototype.shout = function () {
    this.shouting = true;
    this.text.modifiers = "bold";
    this.text.fontString = Text.createFontTag(this.text);
    this.text.text = this.text.text.toUpperCase();
    this.animation.pause();
    this.setFrame(1);
    assets.sound.dc_speak.pause();
    assets.sound.dc_shout.currentTime = 0;
    assets.sound.dc_shout.play();
    state.camera.shake(20);
};

entity.DC.prototype.stopSpeaking = function () {
    this.animation.pause();
    this.timer.pause();
    this.setFrame(0);
    this.speaking = false;
    assets.sound.dc_speak.pause();
    assets.sound.dc_shout.pause();
    this.text.modifiers = "";
    this.text.fontString = Text.createFontTag(this.text);
    this.text.text = this.text.cText;
    this.text.timer.pause();
};

entity.DC.prototype.hide = function () {
    this.bubble.tween.start([["alpha", 0]], 20);
    this.text.alpha = 0;
    if (this.speaking === true) {
        this.stopSpeaking();
    }
    this.tween.start([["x", -229]], 20, Tween.modes.EASEOUT, false, function () {
        this.shown = false;
    });
};

entity.DC.prototype.update = function () {
    //@OVERRIDE
    this.animation.update();
    this.tween.update();
    this.timer.update();
    this.draw();
    
    this.bubble.tween.update();
    this.bubble.draw();
    
    this.text.timer.update();
    this.text.update();
};
