$(document).ready(() => {
    $('#table-moves').hide();
    const inputFile = document.getElementById('input-file');
    $('#btn-open').click(() => {
        inputFile.click();
    })
    inputFile.addEventListener('change', () => {
        const data = readFile(inputFile);
        console.log(data);
    })
    $('#btn-parse').click(() => {
        $('#tbody-moves tr').remove();
        $('#table-moves').show();
        fillTable();
    });

});

function cb() {
    console.log('ham')
}

readFile()

function readFile(input, callback) {
    let file = input.files[0];
    let reader = new FileReader();
    let pgnData;

    reader.readAsText(file);

    reader.onload = () => {
        callback(reader.result)
        pgnData = reader.result;
    };
    reader.onerror = () => {
        pgnData = reader.error;
    };

    return pgnData;
}

// Parse PGN text to array of moves.
function parsedFullMoves() {
    const full = $('#input-pgn').val();

    const firstMove = /1\.\s?([a-h]|[NBRQK])/ // Search first move.
    const moves = full.substring(full.search(firstMove));

    const reg = /[0-9]+\./; // Numbering regex.
    const splitted = moves.split(reg); // Split per move.

    const filtered = splitted.filter((x) => {
        return x; // Filter out empty strings.
    });

    return filtered;
}

function parsedSeperateMoves() {
    const fullMoves = parsedFullMoves();

    // Split array further.
    let tempMoves = [];
    for (let i = 0; i < fullMoves.length; i++) {
        tempMoves.push(fullMoves[i].split(/\s/));
    }

    // Store each element in new array.
    let seperate = [];
    for (let i = 0; i < tempMoves.length; i++) {
        for (let j = 0; j < tempMoves[i].length; j++) {
            seperate.push(tempMoves[i][j]);
        }
    }

    let filtered = seperate.filter((x) => {
        return x;  // Filter out empty strings.
    });

    return filtered;
}

function isValid() {
    const moves = parsedSeperateMoves();
    let valid;
    let validOutcome;
    let validMove;

    // Test moves.
    const regMove = /^([NBRQK])?([a-h])?([1-8])?(x)?([a-h][1-8])(=[NBRQK])?(\+|#)?$|^O-O(-O)?$/;
    for (let i = 0; i < moves.length - 1; i++) {
        if (regMove.test(moves[i])) validMove = true;
        else return false;
    }

    // Test outcome.
    const regOutcome = /^1-0$|^0-1$|^1\/2-1\/2$/;
    if (regOutcome.test(moves[moves.length - 1])) validOutcome = true;
    else return false;

    // Combine.
    if (validMove === true && validOutcome === true) valid = true;
    else return false;
    return valid;
}



function fillTable() {
    const moves = parsedSeperateMoves();
    const valid = isValid();

    if (valid === true) {
        $('#h4-message').hide();
        for (let i = 0; i < moves.length; i++) {
            $('#tbody-moves').append(`<tr><td>${moves[i]}</td></tr>`);
        }
    } else {
        $('#table-moves').hide();
        $('#h4-message').text('Something went wrong, check input please.');
    }
}

class GameDetails {
    constructor(white, black, date, result, whiteelo, blackelo, moves) {
        this.white = white;
        this.black = black;
        this.date = date;
        this.result = result;
        this.whiteelo = whiteelo;
        this.blackelo = blackelo;
        this.moves = moves;
    }
}



const getDetailsList = () => {
    const full = $('#input-pgn').val();
    const regSplit = /\]\s*\[/;
    const details = full.substring(full.indexOf('[') + 1, full.lastIndexOf(']'))
    const splitted = details.split(regSplit);
    return splitted;
}


function findProp(prop) {
    let det = getDetailsList();

    let fullProps = [];
    for (let i = 0; i < det.length; i++) {
        fullProps.push([det[i].substring(0, det[i].indexOf('"')),
        det[i].substring(det[i].indexOf('"') + 1, det[i].lastIndexOf('"'))]);
    }

    let propDetail;
    for (let i = 0; i < fullProps.length; i++) {
        for (let j = 0; j < fullProps[i].length; j++) {
            fullProps[i][j] = fullProps[i][j].trim()
            fullProps[i][0] = fullProps[i][0].toLowerCase()
        }
        if (fullProps[i][0] == prop) {
            propDetail = fullProps[i][1];
        }
    }
    return propDetail;
}

function fillDetails() {
    let details = new GameDetails;
    for (let property in details) {
        details[property] = findProp(property);
    }
    details.moves = parsedSeperateMoves();
    return details
}

// Idee voor uitbreiding mobiele applicatie => scanner implementeren.

