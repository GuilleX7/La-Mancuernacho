/*
 * La Mancuernacho
 * 
 * Copyright 2016 GuilleX7 <GuillermoX7@gmail.com>, FBurning
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
 
var canvas, ctx, state, assets = new Loader(), fullscreenMode = false, allowFullscreen = true;

window.requestAnimFrame = function(){
    return (
        window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function (callback){
            window.setTimeout(callback, 1000 / 60);
        }
    );
}();

function rndInt (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function range (min, max) {
    var array = [min];
    for (var i = min + 1; i <= max; i++) {
        array.push(i);
    }
    return array;
}

var degInRad = Math.PI / 180,
    radInDeg = 180 / Math.PI;

function deg2Rad (deg) {
    return degInRad * deg;
}

function rad2Deg (rad) {
    return radInDeg * rad;
}

function setup () {
    canvas = document.getElementById("game"); //Get canvas
    ctx = canvas.getContext("2d"); //Get canvas context
    keyboard.setup(); //Setup keyboard
    
    state = new states.PRELOAD(); //Change state
    update(); //Request the first frame!
}

function update () {
    window.requestAnimFrame(update); //Request new frame
    state.update(); //Main loop
}

function requestFullscreen () {
    if (allowFullscreen === false)
        return;
    
    //Request fullscreen mode
    if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
        canvas.webkitRequestFullscreen();
    } else if (canvas.mozRequestFullScreen) {
        canvas.mozRequestFullScreen();
    } else if (canvas.msRequestFullscreen) {
        canvas.msRequestFullscreen();
    } else {
        return;
    }
}

function requestExitFullscreen () {
    if (document.fullscreenElement === null &&
        document.webkitFullscreenElement === null &&
        document.mozFullScreenElement === null &&
        document.msFullscreenElement === null) {
        return 2; //Not in fullscreen mode
    }
    
    //Request leaving
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozExitFullScreen) {
        document.mozExitFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else {
        return 1; //Not supported
    }
    
    return 0; //Success
}

window.addEventListener("load", setup, false); //Add loading listener
