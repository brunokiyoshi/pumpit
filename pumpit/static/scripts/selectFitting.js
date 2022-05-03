$(document).on('click', '.table-clickable-1K tr', function (e) {
    const tr1ktable = e.currentTarget;
    const fitting = tr1ktable.cells[0].textContent;
    const type = tr1ktable.cells[1].textContent;
    const K = tr1ktable.cells[2].textContent;

    const $tdfittingselection = $(tr1ktable).closest(".td-fitting-selection");
    const $fittingTypeInput = $tdfittingselection.find(".fitting-custom-type-text")[0]
    const $fittingKInput = $tdfittingselection.find(".fitting-k-input")[0]
    $fittingTypeInput.value = fitting + ", " + type;
    $fittingKInput.value = K;
    $fittingKInput.attr("data-is3k","false")
    colorclickedrow(e);
    calculateAll();
})





$(document).on('click', '.table-clickable-3K tr', function (e) {
    const tr3ktable = e.currentTarget;
    const fitting = tr3ktable.cells[0].textContent;
    const type = tr3ktable.cells[1].textContent;
    const K1 = tr3ktable.cells[2].textContent;
    const Kinf = tr3ktable.cells[3].textContent;
    const Kd = tr3ktable.cells[4].textContent;

    const $tdfittingselection = $(tr3ktable).closest(".td-fitting-selection");
    const $fittingTypeInput = $tdfittingselection.find(".fitting-custom-type-text")[0];
    const $fittingKInput = $($tdfittingselection.find(".fitting-k-input")[0]);
    const $fittingKinfInput = $tdfittingselection.find(".fitting-kinf-input")[0];
    const $fittingK1fInput = $tdfittingselection.find(".fitting-k1-input")[0];
    const $fittingKdfInput = $tdfittingselection.find(".fitting-kd-input")[0];

    $fittingTypeInput.value = fitting + ", " + type;
    $fittingKinfInput.value = Kinf;
    $fittingK1fInput.value = K1;
    $fittingKdfInput.value = Kd;

    calc3Kmethod($fittingKInput);

    $fittingKInput.attr("data-is3k","true")
    colorclickedrow(e);
    calculateAll();
})

function colorclickedrow(e) {
    const $tr = $(e.currentTarget);
    const bothtbodies = find1Kand3Ktables($tr);
    for (let j = 0; j < bothtbodies.length; j++) {
        const rows = $(bothtbodies[j]).find('tr');
        for (let i = 0; i < rows.length; i++) {
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