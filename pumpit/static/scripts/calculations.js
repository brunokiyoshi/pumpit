function calcReynolds() {

}

function calcCSarea(ID) {
    return Math.PI * Math.pow(ID, 2) / 4;
}

function calcVelocity(vflow, CSarea) {
    return vflow / CSarea;
}


function calcKtot() {
    const $k_inputs = $(".fitting-k-input");
    var Ktot = 0;
    for (var i = 0; i < $k_inputs.length; i++) {
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
            let x = 100;
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
    const Ktot = calcKtot();
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
        const CSarea = calcCSarea(ID);
        const vflow = $vflowinput.val() / hour2second(1);
        const velocity = calcVelocity(vflow, CSarea);
        const $velocityinput = $pipesegmenttr.find(".pipe-velocity-input");
        $velocityinput.val(velocity);
        const Re = rho * ID * velocity / mu;
        const $reynoldsinput = $pipesegmenttr.find(".pipe-reynolds-input");
        $reynoldsinput.val(Re);
        const f = frictionFactor($pipesegmenttr);
        console.log(f)
    }
}

const $systeminputs = $("[form='system-form'], #system-form");
for (let i = 0; i < $systeminputs.length; i++) {
    $systeminputs[i].addEventListener("change", calculateAll);
}
