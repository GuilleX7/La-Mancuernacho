entity.Cristian = function (parent, x, y) {
    Sprite.call(this, parent, assets.image.trophyroom_cristian, x, y);
    this.animation.add("playing", [0, 1]);
    this.animation.play("playing", true, 60);
    
    this.eyes = new Sprite(this, assets.image.trophyroom_cristian_eyes, x + 96, y + 54);
    this.eyes.setFrame(0);
    this.eyes.animation.add("blink", [0, 1]);
    this.eyes.timer = new Timer(this.eyes);
    this.eyes.timer.start(180, true, null, function () {
        this.animation.play("blink", 2, 6, function () {
            this.setFrame(0);
        });
    });
    
    this.shadow = new Sprite(this, assets.image.trophyroom_cristian_shadow, x - 21, y - 20);
    
    this.bubble = new Sprite(this, assets.image.bubble, 42, 291);
    this.bubble.alpha = 0;
    this.bubble.shown = false;
    
    this.text = new Text(this, "", 0, 0, "pixel", 0, "#000000");
    this.text.letterIndex = 0;
    this.text.timer = new Timer(this);
    
    this.speaking = false;
};

entity.Cristian.extends(Sprite);

entity.Cristian.texts = [
    //TROPHIES SPEECHS
    {text: "Todavía recuerdo aquella noche. Repenta me pidió/una foto, y desde entonces, la situación dio un/giro de 360...", x: 12, y: 8, size: 24, multiline: true},
    {text: "Si eres alérgico a los huevos, ¡habértelo pensado/antes de desbloquearlo!.../¿Qué Foremon habrá dentro?", x: 12, y: 8, size: 24, multiline: true},
    {text: "¿Te imaginas que Depeche Mode utilizase su katana/de viento cortante en un fórmula a 300km por hora?/¿Qué sería de nosotros?", x: 11, y: 8, size: 24, multiline: true},
    {text: "Oye, ya que no consigues serlo en Meristation, al/menos aquí te consuelas./¡Felicidades por tu jamón!", x: 11, y: 8, size: 24, multiline: true},
    {text: "¿Cuánto podría valer en una casa de subastas?/Este cigarrillo no mata, ¡te soluciona la vida!", x: 23, y: 18, size: 24, multiline: true},
    {text: "Un ejemplo de vida. Sonrió hasta el final a pesar/de todo, y nos dejó con el corazón en un puño./¡Descanse en paz, Crazy_Androide!", x: 12, y: 8, size: 24, multiline: true},
    //INTRO SPEECH
    {text: "Bienvenid@ a la sala de Miniaturas./Los puntos que Nacho sume durante la partida se/sumarán al contador que tengo a mi derecha. (...)", x: 13, y: 10, size: 24, multiline: true},
    {text: "Dicha puntuación servirá para desbloquearlas./Espero que sepas apreciarlas, ¡les guardo mucho/cariño! (...)", x: 13, y: 10, size: 24, multiline: true},
    //LOCKED SPEECH
    {text: "¿Acaso pensabas que te dejaría ver la miniatura/sin desbloquearla antes?/¡Ve y consigue más puntos!", x: 20, y: 8, size: 24, multiline: true}
];

entity.Cristian.prototype.showBubble = function (index) {
    this.bubble.shown = true;
    this.bubble.tween.start([["alpha", 1]], 20, Tween.modes.LINEAR, false, function () {
        this.parent.speak(index);
    });
};

entity.Cristian.prototype.speak = function (index) {
    if (this.bubble.alpha !== 1)
        return this.showBubble(index);
    
    var tmp = entity.Cristian.texts[index];
    this.text.text = "";
    this.text.alpha = 1;
    this.text.x = this.bubble.x + tmp.x;
    this.text.y = this.bubble.y + tmp.y;
    this.text.size = tmp.size;
    this.text.fontString = Text.createFontTag(this.text);
    this.text.multiline = tmp.multiline;
    this.text.cText = tmp.text;
    this.text.letterIndex = 0;
    this.text.timer.start(3, tmp.text.length + 1, this.stopSpeaking, this.nextLetter);
    this.speaking = true;
};

entity.Cristian.prototype.nextLetter = function () {
    this.text.text += this.text.cText[this.text.letterIndex];
    this.text.letterIndex++;
};

entity.Cristian.prototype.stopSpeaking = function (quit) {
    quit = quit || false;
    
    if (quit) {
        this.text.text = "";
        this.text.tween.start([["alpha", 0]], 20);
        this.bubble.tween.start([["alpha", 0]], 20);
        this.bubble.shown = false;
    } else {
        this.text.text = this.text.cText;
    }
    
    this.text.timer.pause();
    this.speaking = false;
};

entity.Cristian.prototype.update = function () {
    //@OVERRIDE
    this.shadow.draw();
    
    this.animation.update();
    this.draw();
    
    this.eyes.update();
    this.eyes.timer.update();
};
