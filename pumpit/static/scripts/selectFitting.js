$('.table-clickable-1K').on('click', 'tr', function (e) {
    const tr1ktable = e.currentTarget;
    const fitting = tr1ktable.cells[0].textContent;
    const type = tr1ktable.cells[1].textContent;
    const K = tr1ktable.cells[2].textContent;

    const $tdfittingselection = $(tr1ktable).closest(".td-fitting-selection");
    const $fittingTypeInput = $tdfittingselection.find(".fitting-custom-type-text")[0]
    const $fittingKInput = $tdfittingselection.find(".fitting-k-input")[0]
    $fittingTypeInput.value=fitting + ", " + type;
    $fittingKInput.value=K;
})