const $tableID = $('#table');
const $BTN = $('#export-btn');
const $EXPORT = $('#export');

//TODO: FIND OUT HOW TO GET THE STRING FROM stdtablerow.html

// const newTr = fetch('/getstdtablerow').then(function (response) {
// 	// The API call was successful!
// 	return response.text();
// }).then(function (html) {
//
// 	// Convert the HTML string into a document object
// 	var parser = new DOMParser();
// 	var doc = parser.parseFromString(html, 'text/html');
//
// }).catch(function (err) {
// 	// There was an error
// 	console.warn('Something went wrong.', err);
// });

const newTr = '<tr></tr>'

$('.table-add').on('click', 'i', () => {

    const $clone = $tableID.find('tbody tr').last().clone(true).removeClass('hide table-line');

    if ($tableID.find('tbody tr').length === 0) {

        $('tbody').append(newTr);
    }

    $tableID.find('table').append($clone);
});

$tableID.on('click', '.table-remove', function () {
    if ($tableID.find('tbody tr').length > 1) {
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
