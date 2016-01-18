entity.HUD = {};

entity.HUD.Fantometer = function (parent, x, y) {
    Sprite.call(this, parent, assets.image.fantometer, x, y + 15);
    this.energyPortion = parent.nacho.maxEnergy / 11;
    this.updateEnergy = true;
    
    this.animation.add("lvupfanta", [10, 11, 12, 13, 14, 15]);
    this.setFrame(0);
    
    this.spheres = 0;
    this.lights = new Sprite(this, assets.image.fantometer_lights, x + 10, y + 65);
    this.lights.alpha = 0;
    this.lights.setFrame(0);
    this.lights.animation.add("light0", [1, 2]);
    this.lights.animation.add("light1", [3, 4]);
    this.lights.animation.add("light2", [5, 6]);
    this.lights.animation.add("delight", [5, 4, 3, 2, 1, 0]);
    
    this.text_rocosidad = new Sprite(this, assets.image.text_rocosidad, x, y);
    this.text_rocosidad.alpha = 0;
    
    this.text_dieses = new Text(this, "0", x + 17, y + 25, "pixel", 30);
    this.text_dieses.alpha = 0;
};

entity.HUD.Fantometer.extends(Sprite);

entity.HUD.Fantometer.prototype.addSphere = function () {
    this.parent.nacho.nextScore += this.parent.nacho.nextScoreDelta;
    
    if (this.spheres === 0) {
        this.spheres = 1;
        this.lights.animation.play("light0", false, 6);
        assets.sound.levelup0.play();
        if (this.parent.nacho.level === 0) {
            return true; //Nacho must level up
        }
    } else if (this.spheres === 1) {
        this.spheres = 2;
        this.lights.animation.play("light1", false, 6);
        assets.sound.levelup1.play();
        if (this.parent.nacho.level === 1) {
            return true; //Nacho must level up
        }
    } else if (this.spheres === 2) {
        this.spheres = 3;
        this.lights.animation.play("light2", false, 6);
        assets.sound.levelup2.play();
        if (this.parent.nacho.level === 2) {
            return true; //Nacho should enter in fanta mode
        }
    }
    
    return false; //No need to level up
};

entity.HUD.Fantometer.prototype.emptySpheres = function () {
    this.lights.animation.play("delight", false, 6);
    this.spheres = 0;
    this.updateEnergy = true;
};

entity.HUD.Fantometer.prototype.update = function () {
    //@OVERRIDE
    if (this.updateEnergy) {
        this.setFrame(Math.ceil(this.parent.nacho.energy / this.energyPortion));
    }
        
    this.animation.update();
    this.tween.update();
    this.draw();
    
    this.lights.update();
    this.text_rocosidad.update();
    this.text_dieses.text = this.parent.nacho.score;
    this.text_dieses.update();
};
