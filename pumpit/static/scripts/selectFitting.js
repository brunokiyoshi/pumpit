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
})

function calculate3Kmethod($fittingKInput) {
    const ID=getFittingIDFromAnywhereInTr($fittingKInput);
    const Re=getFittingReynoldsFromAnywhereInTr($fittingKInput);
    const K1 = upDownFetcher($fittingKInput, ".tr-fitting", ".fitting-k1-input").last().val();
    const Kd = upDownFetcher($fittingKInput, ".tr-fitting", ".fitting-kd-input").last().val();
    const Kinf = upDownFetcher($fittingKInput, ".tr-fitting", ".fitting-kinf-input").last().val();
    const K=(K1/Re)+Kinf*(1+(Kd/(ID**0.3)));
    $fittingKInput.val(K);
    return K;
}

function upDownFetcher($el, selectorUp, selectorDown){
    const $targetup = $el.closest(selectorUp);
    return $targetup.find(selectorDown);
}

function getFittingReynoldsFromAnywhereInTr($el) {

    const $fittingtr = $el.closest(".tr-fitting");
    const $fittingpipeselect = $fittingtr.find(".fitting-pipe-select");
    const pipeuid = $fittingpipeselect.val();
    const $pipetr = $(document).find("[data-uid="+ pipeuid + "]").last();
    return $pipetr.find(".pipe-reynolds-input").last().val();
}

function getFittingIDFromAnywhereInTr($el) {

    const $fittingtr = $el.closest(".tr-fitting");
    const $fittingpipeselect = $fittingtr.find(".fitting-pipe-select");
    const pipeuid = $fittingpipeselect.val();
    const $pipetr = $(document).find("[data-uid="+ pipeuid + "]").last();
    return $pipetr.find(".pipe-ID-input").last().val();
}



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

    calculate3Kmethod($fittingKInput);

    $fittingKInput.attr("data-is3k","true")
    colorclickedrow(e);
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