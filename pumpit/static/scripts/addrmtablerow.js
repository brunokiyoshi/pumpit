const tableIDs = ['#pipingtable', "#fittingstable"];
const tableAddIDs = ["#table-add-piping", "#table-add-fittings"];

// TODO: use better data structure instead of relying on indexes matching
for (let i = 0; i < tableIDs.length; i++) {
    const $tableID = $(tableIDs[i]);
    const $BTN = $('#export-btn');
    const $EXPORT = $('#export');


    // TODO: use better data structure instead of relying on indexes matching
    $(tableAddIDs[i]).on('click', 'i', () => {
        const $clone = $tableID.find('tbody tr').last().clone(true).removeClass('hide table-line');

        if ($tableID.find('tbody tr').length === 0) {
            fetch("/getstdfittingstablerow").then(function (response) {
                return response.text();
            }).then(function (data) {
                $("#fittingstable").find('tbody').append(data);
            }).catch(function () {
                console.log("Couldn't fetch std table row");
            });
        }



        $tableID.find('table').append($clone);
    });

    $tableID.on('click', '.table-remove', function () {
        if (i === 0) {
            if ($tableID.find('tbody tr').length > 1) {
                $(this).parents('tr').detach();
            }
            // if ($tableID.find('tbody tr').length === 2) {
            //     $(this).find('btn').attr("disabled", true);
            // } TODO: find way to disable button of only remaining pipe row and reenable it when it's not the only one anymore
        } else {
            $(this).parents('tr').detach();
        }

    });

    $tableID.on('click', '.table-up', function () {

        const $row = $(this).parents('tr');

        if ($row.index() === 0) {
            return;
        }

        $row.prev().before($row.get(0));
    });

    $tableID.on('click', '.table-down', function () {

        const $row = $(this).parents('tr');
        $row.next().after($row.get(0));
    });

// A few jQuery helpers for exporting only
    jQuery.fn.pop = [].pop;
    jQuery.fn.shift = [].shift;

    $BTN.on('click', () => {

        const $rows = $tableID.find('tr:not(:hidden)');
        const headers = [];
        const data = [];

        // Get the headers (add special header logic here)
        $($rows.shift()).find('th:not(:empty)').each(function () {

            headers.push($(this).text().toLowerCase());
        });

        // Turn all existing rows into a loopable array
        $rows.each(function () {
            const $td = $(this).find('td');
            const h = {};

            // Use the headers from earlier to name our hash keys
            headers.forEach((header, i) => {

                h[header] = $td.eq(i).text();
            });

            data.push(h);
        });

        // Output the result
        $EXPORT.text(JSON.stringify(data));
    });
}