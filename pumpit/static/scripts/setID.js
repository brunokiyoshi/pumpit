function setID($selectEl){
    const newIDinches = $selectEl.val();
    const newIDmm = inch2milimiter(newIDinches);

    const $IDinput = $selectEl.parent().find(".pipe-ID-input");
    $IDinput.val(newIDmm);
}

function resetID(checkboxEl){
    const $td = $(checkboxEl).parent();
    const $selectEl = $td.find(".pipe-type-select");
    setID($selectEl);
}