function calcTotalDeltaZ(){
    const $pipingDeltaZs = $(".pipe-deltaz-input");
    let totalDeltaZ=0;
    for (let i=0;i<$pipingDeltaZs.length;i++){
        const $pipe = $pipingDeltaZs[i];
        const dZ = parseFloat($pipe.val());
        totalDeltaZ = totalDeltaZ+dZ;
    }
    return totalDeltaZ;
}

function calcStaticHead(){
    const deltaZPiping=calcTotalDeltaZ();
    //TODO: if target tank is fed from bottom: add tank height to delta Z
    const rho=parseFloat($("#densityinput").val());
    return rho*9.81*deltaZPiping;
}

function calcTotalDeltaPFittings(){
    const fittingDeltaPs=$(".fitting-deltap-input");
    let TotalDeltaPFittings=0;
    for(let i=0;i<fittingDeltaPs.length;i++){
        const newdp=parseFloat($(fittingDeltaPs[i]).val());
        TotalDeltaPFittings = TotalDeltaPFittings+newdp;
    }
    $("#total-fitting-deltaP").val(TotalDeltaPFittings);
    return TotalDeltaPFittings;
}

function calcTotalDeltaPPiping(){
    const pipingDeltaPs=$(".pipe-deltap-input");
    let TotalDeltaPPiping=0;
    for(let i=0;i<pipingDeltaPs.length;i++){
        const newdp = parseFloat($(pipingDeltaPs[i]).val());
        TotalDeltaPPiping = TotalDeltaPPiping + newdp;
    }
    $("#total-piping-deltaP").val(TotalDeltaPPiping);
    return TotalDeltaPPiping;
}

function calcTotalDeltaP(){
    const totalDeltaP = (calcTotalDeltaPPiping()+calcTotalDeltaPFittings())
    $("#total-system-deltaP").val(totalDeltaP);
    return(totalDeltaP);
}

function calc3Kmethod($fittingKInput) {
    const ID=getFittingIDFromAnywhereInTr($fittingKInput);
    const Re=getFittingReynoldsFromAnywhereInTr($fittingKInput);
    const K1 = upDownFetcher($fittingKInput, ".tr-fitting", ".fitting-k1-input").last().val();
    const Kd = upDownFetcher($fittingKInput, ".tr-fitting", ".fitting-kd-input").last().val();
    const Kinf = upDownFetcher($fittingKInput, ".tr-fitting", ".fitting-kinf-input").last().val();
    const K=(K1/Re)+Kinf*(1+(Kd/(ID**0.3)));
    $fittingKInput.val(K.toFixed(4));
    return K;
}

function calculateHf($fitting){
    const K = $fitting.find(".fitting-k-input").val();
    const velocity = getFittingVelocityFromAnywhereInTr($fitting);
    const Hf = K*velocity**2/(2*9.81);
    $fitting.find(".fitting-deltap-input").val(mwg2Kpa(Hf).toFixed(4));
    return Hf;
}

function calcCSarea(ID) {
    return Math.PI * Math.pow(ID, 2) / 4;
}

function calcVelocity(vflow, CSarea) {
    return vflow / CSarea;
}


function calcKtot() {
    const $k_inputs = $(".fitting-k-input");
    let Ktot = 0;
    for (let i = 0; i < $k_inputs.length; i++) {
        $k = $k_inputs[i];
        k = $k.valueAsNumber;
        Ktot = Ktot + k;
    }
    console.log("Ktot=" + Ktot);
    return Ktot;
}

function calcDeltaPfitting(Kinput) {

    let v;
    const g = 9.81 // m/s²
    return k * Math.pow(v, 2) / 2 * g;
}

function frictionFactor($pipesegmenttr) {
    const equation = "colebrookwhite"; //TODO: this is like this because in the future other equations will be available
    let Re = $pipesegmenttr.find(".pipe-reynolds-input").val();
    // no need to convert ID and eps to meters
    let ID = $pipesegmenttr.find(".pipe-ID-input").val();
    let eps = $pipesegmenttr.find(".pipe-roughness-input").val();
    let f;
    if (equation === "colebrookwhite") {
        const solver = "newtonraphson"; //TODO: create other solver options
        if (solver === "newtonraphson") {
            let lastx;
            let cw=1;
            let x = 100; //TODO: implement initial guess calculation
            const err = 1e-5;

            let count = 1;

            while (Math.abs(cw) > err && count < 500) {
                lastx = x;
                const dcw = 251/(50*Re*((10*eps)/(37*ID) + (251*x)/(100*Re))) + 1
                cw = x + 2 * Math.log10((eps / (3.7 * ID)) + (x*2.51 / Re))
                x = lastx - (cw / dcw);
                console.log("count=" + count + ", dcw=" + dcw + ", cw=" + cw + ", x=" + x+", f="+(1/x)**2);
                count++;
            }
            f=(1/x)**2
        }
    }
    return f;
}

function calculateAll() {
    const pipesegments = $(".tr-editable-pipe");
    const $vflowinput = $("#vflowinput");
    const $densityinput = $("#densityinput");
    const rho = $densityinput.val();
    const $viscosityinput = $("#viscosityinput");
    const mu = $viscosityinput.val();

    for (let i = 0; i < pipesegments.length; i++) {
        const $pipesegmenttr = $(pipesegments[i]);
        let ID = $pipesegmenttr.find(".pipe-ID-input").last().val();
        ID = milimiter2meter(ID);
        const L = $pipesegmenttr.find(".pipe-length-input").last().val();
        const CSarea = calcCSarea(ID);
        const vflow = $vflowinput.val() / hour2second(1);
        const velocity = calcVelocity(vflow, CSarea);
        const $velocityinput = $pipesegmenttr.find(".pipe-velocity-input");
        $velocityinput.val(velocity.toFixed(2));
        const Re = rho * ID * velocity / mu;
        const $reynoldsinput = $pipesegmenttr.find(".pipe-reynolds-input");
        $reynoldsinput.val(Re.toFixed(2));
        const fd = frictionFactor($pipesegmenttr).toFixed(2);
        console.log(fd)

        let deltaP = (L*fd*rho*velocity**2)/(2*ID);
        deltaP = deltaP/1000;
        $pipesegmenttr.find(".pipe-deltap-input").val(deltaP.toFixed(4));
    }
    const $Kinputs3k = $("[data-is3k=true]");
    for(let i=0;i<$Kinputs3k.length;i++){
        calc3Kmethod($Kinputs3k);

    }
    const fittings=$('.tr-fitting')
    for(let i=0;i<fittings.length;i++){
        const $fitting = $(fittings[i]);
        calculateHf($fitting);
    }
    calcTotalDeltaP();
    calcStaticHead();
    calcStaticHead();
}

const $systeminputs = $("[form='system-form'], #system-form");
for (let i = 0; i < $systeminputs.length; i++) {
    $systeminputs[i].addEventListener("change", calculateAll);
}
$(document).on("ready",calculateAll);
