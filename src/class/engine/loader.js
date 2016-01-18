function Loader () {
    this.image = {};
    this.sound = {};
    this.video = {};
    this.loaded = 0;
    this.total = 0;
    this.finished = false;
    this.parent = undefined;
    this.loadProgress = undefined;
    this.loadComplete = undefined;
}

Loader.type = {
    IMAGE: 0,
    SOUND: 1,
    VIDEO: 2
};

Loader.prototype.load = function (resources, parent, loadProgress, loadComplete) {
    var self = this;
    this.total = resources.length; //Store length
    this.loaded = 0; //Reset loaded
    this.finished = false;
    this.parent = (parent === undefined) ? window : parent;
    this.loadProgress = (loadProgress === undefined) ? undefined : loadProgress;
    this.loadComplete = (loadComplete === undefined) ? undefined : loadComplete;
    
    for (var i = 0, resource, asset; i < this.total; i++) {
        resource = resources[i];
        
        if (resource.type === Loader.type.IMAGE) {
            asset = this.image[resource.name] = document.createElement("canvas"); //Create image
            asset.spritesheetData = resource.spritesheet;
            var img = new Image();
            img.addEventListener("load", function (e) {
                var ctx = this.canvas.getContext("2d");
                this.canvas.width = this.width;
                this.canvas.height = this.height;
                ctx.drawImage(this, 0, 0);
                if (this.canvas.spritesheetData !== undefined)
                    this.canvas.spritesheet = new SpriteSheet(this.canvas, this.canvas.spritesheetData[0], this.canvas.spritesheetData[1], this.canvas.spritesheetData[2]);
                self._loadProgress(e);
            }, false); //Add loading listener
            img.src = resource.url;
            img.canvas = asset;
        } else if (resource.type === Loader.type.SOUND) {
            asset = this.sound[resource.name] = document.createElement("audio"); //Create audio
            asset.addEventListener("loadeddata", function (e) {
                self._loadProgress(e);
            }, false); //Add loading listener
            asset.src = resource.url; //Load it
        } else if (resource.type === Loader.type.VIDEO) {
            asset = this.video[resource.name] = document.createElement("video"); //Create video
            asset.addEventListener("loadeddata", function (e) {
                self._loadProgress(e);
            }, false);
            asset.src = resource.url; //Load it
        } else {
            console.error("[Loader]", "Trying to load an unknown resource type");
            continue;
        }
    }
};

Loader.prototype._loadProgress = function (e) {
    this.loaded++;
    if (this.loadProgress !== undefined)
        this.loadProgress.call(this.parent, e); //Launch progress callback

    if (this.loaded === this.total) {
        this.finished = true;
        if (this.loadComplete !== undefined)
            this.loadComplete.call(this.parent); //Launch finish callback
    }
};

