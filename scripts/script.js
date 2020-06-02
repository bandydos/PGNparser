$(document).ready(() => {
    $('#table-moves').hide();
    $('#btn-parse').click(() => {
        $('#table-moves').show();
        fillTable();
    });
});

function parsedMoves() {
    const full = $('#input-pgn').val();
    const moves = full.substring(full.lastIndexOf(']') + 1);
    const splitted = moves.split(/\s/);
    const reg = /[0-9]+\./;
    const filtered = splitted.filter((x) => {
        return !reg.test(x) && x; // Filter out by regex + empty strings.
    });
    return filtered;
}

function fillTable() {
    const moves = parsedMoves();
    for(let i = 0; i < moves.length; i++){
        $('#tbody-moves').append(`<tr><td>${moves[i]}</td></tr>`);
    }
}
