var keyboard = {
    key: { //Real-time
        q: false,
        s: false,
        a: false,
        f: false,
        d: false,
        n: false,
        k: false,
        spacebar: false,
        leftarrow: false,
        rightarrow: false,
        uparrow: false,
        downarrow: false
    },

    pressed: { //It was pressed
        q: false,
        s: false,
        a: false,
        f: false,
        d: false,
        n: false,
        k: false,
        spacebar: false,
        leftarrow: false,
        rightarrow: false,
        uparrow: false,
        downarrow: false
    }
};

keyboard.onKeyDown = function (e) {
    switch (e.keyCode) {
        case 81: //Q
            keyboard.key.q = true;
            keyboard.pressed.q = true;
            break;
        case 83: //S
            keyboard.key.s = true;
            keyboard.pressed.s = true;
            break;
        case 65: //A
            keyboard.key.a = true;
            keyboard.pressed.a = true;
            break;
        case 70: //F
            keyboard.key.f = true;
            keyboard.pressed.f = true;
            break;
        case 68: //D
            keyboard.key.d = true;
            keyboard.pressed.d = true;
            break;
        case 75: //K
            keyboard.key.k = true;
            keyboard.pressed.k = true;
            break;
        case 78: //N
            keyboard.key.n = true;
            keyboard.pressed.n = true;
            break;
        case 67: //C
            keyboard.key.c = true;
            keyboard.pressed.c = true;
        case 32: //Spacebar
            keyboard.key.spacebar = true;
            keyboard.pressed.spacebar = true;
            break;
        case 122: //F11
            e.preventDefault();
            requestFullscreen();
            break;
        case 13: //Enter
            requestFullscreen();
            break;
        case 37: //Left arrow
            keyboard.key.leftarrow = true;
            keyboard.pressed.leftarrow = true;
            break;
        case 39: //Right arrow
            keyboard.key.rightarrow = true;
            keyboard.pressed.rightarrow = true;
            break;
        case 38: //Up arrow
            keyboard.key.uparrow = true;
            keyboard.pressed.uparrow = true;
            break;
        case 40: //Down arrow
            keyboard.key.downarrow = true;
            keyboard.pressed.downarrow = true;
            break;
        default:
            break;
    }
};

keyboard.onKeyUp = function (e) {
    switch (e.keyCode) {
        case 81: //Q
            keyboard.key.q = false;
            break;
        case 83: //S
            keyboard.key.s = false;
            break;
        case 65: //A
            keyboard.key.a = false;
            break;
        case 70: //F
            keyboard.key.f = false;
            break;
        case 68: //D
            keyboard.key.d = false;
            break;
        case 75: //K
            keyboard.key.k = false;
            break;
        case 78: //N
            keyboard.key.n = false;
            break;
        case 67: //C
            keyboard.key.c = false;
            break;
        case 32: //Spacebar
            keyboard.key.spacebar = false;
            break;
        case 37: //Left arrow
            keyboard.key.leftarrow = false;
            break;
        case 39: //Right arrow
            keyboard.key.rightarrow = false;
            break;
        case 38: //Up arrow
            keyboard.key.uparrow = false;
            break;
        case 40: //Down arrow
            keyboard.key.downarrow = false;
            break;
        default:
            break;
    }
};

keyboard.wasPressed = function (key) {
    if (this.pressed[key] === true) {
        this.pressed[key] = false;
        return true;
    }
    return false;
};

keyboard.reset = function () {
    this.pressed = {
        q: false,
        s: false,
        a: false,
        f: false,
        d: false,
        k: false,
        n: false,
        c: false,
        spacebar: false,
        leftarrow: false,
        rightarrow: false,
        uparrow: false,
        downarrow: false
    };
};

keyboard.setup = function () {
    window.addEventListener("keydown", keyboard.onKeyDown, false);
    window.addEventListener("keyup", keyboard.onKeyUp, false);
};
