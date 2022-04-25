function setRough($selectEl){
    const newRough = $selectEl.val();

    const $Roughinput = $selectEl.parent().find(".pipe-roughness-input");
    $Roughinput.val(newRough);
}

function resetRough(checkboxEl){
    const $td = $(checkboxEl).parent();
    const $selectEl = $td.find(".pipe-material-select");
    setRough($selectEl);
}