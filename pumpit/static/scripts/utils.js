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

function getFittingVelocityFromAnywhereInTr($el) {

    const $fittingtr = $el.closest(".tr-fitting");
    const $fittingpipeselect = $fittingtr.find(".fitting-pipe-select");
    const pipeuid = $fittingpipeselect.val();
    const $pipetr = $(document).find("[data-uid="+ pipeuid + "]").last();
    return $pipetr.find(".pipe-velocity-input").last().val();
}
