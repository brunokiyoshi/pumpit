function switchtextselect(checkbox) {
    const $row = $(checkbox).closest(".tr-editable");
    const $typetd = $(checkbox).closest("td");
    const $typeselect = $typetd.find("select");
    const $typecustomtext = $typetd.find("input[type=text]");
    const $typecustomnumvalue = $typetd.find("input[type=number]");
    if ($(checkbox).is(":checked")){
        $typeselect.hide();
        $typecustomtext.show();
        $typecustomnumvalue.prop( "disabled", false );
    }
    else{
        $typeselect.show();
        $typecustomtext.hide();
        $typecustomnumvalue.prop( "disabled", true );
    }
    console.log(checkbox.value)
}