var newSD = {
    first_time_meriworld: true,
    first_time_trophyroom: true,
    total_score: 0,
    stages: 0,
    trophies: [0, 0, 0, 0]
}, SD;

function checkData () {
    if (localStorage === undefined || localStorage.savedata === undefined) {
        return false;
    }
    return true;
}

function newData () {
    SD = newSD;
    saveData();
}

function loadData () {
    SD = JSON.parse(localStorage.savedata);
}

function saveData () {
    localStorage.savedata = JSON.stringify(SD);
}

function encrypt () {
    var abecedary = "ABCDEFGHIJ",
        a = (SD.first_time_meriworld === true) ? "1" : "0",
        b = (SD.first_time_trophyroom === true) ? "1": "0",
        c = SD.stages.toString(),
        d = SD.trophies.toString().replace(/,/g, "");
        x = SD.total_score.toString(),
        string = a + b + c + d + x,
        cString = "",
        i = 0;
        
    for (; i < string.length; i++) {
        cString += abecedary[string.charAt(i)];
    }

    return cString;
}

function decrypt (cString) {
    if (cString.length < 8) {
        return 1; //Too short
    } else if (cString.length > 12) {
        return 1; //Too long
    }
    
    var abecedary = "ABCDEFGHIJ",
        string = "",
        i = 0,
        index;
        
    for (; i < cString.length; i++) {
        index = search(cString.charAt(i), abecedary);
        if (index === -1) {
            return 1; //Char not allowed
        }
        string += index.toString();
    }
    
    var a = (string.charAt(0) === "1") ? true : false,
        b = (string.charAt(1) === "1") ? true : false,
        c = parseInt(string.charAt(2)),
        d = [parseInt(string.charAt(3)), parseInt(string.charAt(4)),
            parseInt(string.charAt(5)), parseInt(string.charAt(6))],
        x = parseInt(string.substr(7));
    
    return {
        first_time_meriworld: a,
        first_time_trophyroom: b,
        stages: c,
        trophies: d,
        total_score: x
    };
}

function search (char, string) {
    for (var e = 0; e < string.length; e++) {
        if (char === string[e]) {
            return e;
        }
    }
    return -1;
}
