

function calcKtot(){
    const $k_inputs = $(".fitting-k-input");
    var Ktot = 0;
    for (var i = 0; i < $k_inputs.length; i++){
        $k = $k_inputs[i];
        k = $k.valueAsNumber;
        Ktot = Ktot + k;
    }
    console.log("Ktot="+Ktot);
    return Ktot;
}

function calculateAll(){
    var Ktot = calcKtot();
}

const $systeminputs = $("[form='system-form'], #system-form");
for (var i=0;i<$systeminputs.length;i++){
    $systeminputs[i].addEventListener("change", calculateAll);
}