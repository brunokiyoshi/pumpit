function updatePipeOptions() {
    const $pipeselects = $(document).find(".fitting-pipe-select");
    const $pipes = $(document).find(".tr-editable-pipe");

    for (let i = 0; i < $pipes.length; i++) {
        const $pipe = $($pipes[i]);
        const pipeuid = $pipe.attr("data-uid");


        const pipetag = $pipe.find('.pipe-tag-input').val();
        const pipeIsCustom = $pipe.find(".pipe-custom-type-input").is(":checked");
        let text;
        if (pipeIsCustom) {
            const pipeCustomText = $pipe.find(".pipe-custom-type-text").val();
            const pipeID = $pipe.find('.pipe-ID-input').val() + " mm";

            text = pipetag + " (" + pipeCustomText + ", ID=" + pipeID + ")";
        } else {
            const pipeType = $pipe.find(".pipe-type-select option:selected").text();
            text = pipetag + " (" + pipeType + ")";
        }
        let $options = $(document).find("[data-pipe=" + pipeuid + "]")
        if ($options.length === 0) {

            $options = $(document.createElement("option"));
            $options.attr("data-pipe", pipeuid);
            for (let i = 0; i < $pipeselects.length; i++) {
                $pipeselects[i].append($options[0])
            }
        }
        for (let i = 0; i < $options.length; i++) {
            const option = $($options[i]);
            option.val(pipeuid);
            option.html(text);
            option.attr("class", pipetag);
        }


    }

}
function setReynolds(){

}

$(document).on("change", ".tr-editable-pipe input", updatePipeOptions);

$(document).ready(updatePipeOptions);