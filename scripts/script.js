$(document).ready(() => {
    $('#table-moves').hide();
    $('#btn-parse').click(() => {
        $('#tbody-moves tr').remove();
        $('#table-moves').show();
        fillTable();
        console.log(parsedSeperateMoves());
    });
});

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
