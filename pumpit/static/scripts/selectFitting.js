$('.table-clickable-1K').on('click', 'tr', function (e) {
    const tr1ktable = e.currentTarget;
    const fitting = tr1ktable.cells[0].textContent;
    const type = tr1ktable.cells[1].textContent;
    const K = tr1ktable.cells[2].textContent;

    const $tdfittingselection = $(tr1ktable).closest(".td-fitting-selection");
    const $fittingTypeInput = $tdfittingselection.find(".fitting-custom-type-text")[0]
    const $fittingKInput = $tdfittingselection.find(".fitting-k-input")[0]
    $fittingTypeInput.value = fitting + ", " + type;
    $fittingKInput.value = K;
    colorclickedrow(e);
})

function colorclickedrow(e) {
    const $tr = $(e.currentTarget);
    const bothtbodies = find1Kand3Ktables($tr);
    for (var j = 0; j < bothtbodies.length; j++) {
        const rows = $(bothtbodies[j]).find('tr');
        for (var i = 0; i < rows.length; i++) {
            const $tr = $(rows[i]);
            $tr.css('background-color', '');
        }
    }

    $tr.css('background-color', '#46b8da')

}

function find1Kand3Ktables($onetable) {
    const bothtbodies = $onetable.closest('.tab-content').find('.table-clickable');
    return bothtbodies;
}