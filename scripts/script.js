$(document).ready(() => {
    $('#table-moves').hide();
    $('#btn-parse').click(() => {
        $('#tbody-moves tr').remove();
        $('#table-moves').show();
        fillTable();
    });
});

function parsedMoves() {
    const full = $('#input-pgn').val();
    const moves = full.substring(full.lastIndexOf(']') + 1);
    const reg = /[0-9]+\./;
    const splitted = moves.split(reg);
    const filtered = splitted.filter((x) => {
        return x; // Filter out empty strings.
    });
    return filtered;
}

function fillTable() {
    const moves = parsedMoves();
    for(let i = 0; i < moves.length; i++){
        $('#tbody-moves').append(`<tr><td>${moves[i]}</td></tr>`);
    }
}
