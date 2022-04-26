
function calcReynolds(){

}

function calcCSarea(ID) {
    return Math.PI * Math.pow(ID,2) / 4;
}

function calcVelocity(vflow, CSarea) {
    return vflow/CSarea;
}



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

function calcDeltaPfitting(Kinput){

    let v;
    const g = 9.81 // m/s²
    return k*Math.pow(v,2)/2*g;
}

function calculateAll(){
    const Ktot = calcKtot();
    const pipesegments = $(".tr-editable");
    const $vflowinput = $("#vflowinput");
    const $densityinput = $("#densityinput");
    const rho = $densityinput.val();
    const $viscosityinput = $("#viscosityinput");
    const mu = $viscosityinput.val();
    for(var i=0;i<pipesegments.length;i++){
        const $pipesegmenttr = $(pipesegments[i]);
        let ID = $pipesegmenttr.find(".pipe-ID-input").last().val();
        ID = milimiter2meter(ID);
        const CSarea = calcCSarea(ID);
        const vflow = $vflowinput.val()/hour2second(1);
        const velocity = calcVelocity(vflow, CSarea);
        const $velocityinput = $pipesegmenttr.find(".pipe-velocity-input");
        $velocityinput.val(velocity);
        const Re = rho*ID*velocity/mu;
        const $reynoldsinput = $pipesegmenttr.find(".pipe-reynolds-input");
        $reynoldsinput.val(Re);
    }
}

const $systeminputs = $("[form='system-form'], #system-form");
for (var i=0;i<$systeminputs.length;i++){
    $systeminputs[i].addEventListener("change", calculateAll);
}
