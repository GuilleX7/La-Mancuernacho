function SpriteSheet (asset, nx, ny, limit) {
    this.frames = [];
    
    var cw = asset.width / nx;
        ch = asset.height / ny,
        counter = 0, stopped = false;
        
    for (var y = 0; y < ny; y++) {
        if (stopped)
            break;
            
        for (var x = 0; x < nx; x++) {
            this.frames.push(new Rect(cw * x, ch * y, cw, ch));
            
            if (limit > 0) {
                counter++;
                if (counter === limit) {
                    stopped = true;
                    break;
                }
            }
        }
    }
}
