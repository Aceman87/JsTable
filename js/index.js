var rowCount = 1;
var $TABLE = $('#table');
var $BTN = $('#export-btn');
var $EXPORT = $('#export');

$('.table-add').click(function () {
  var $clone = $TABLE.find('tr.hide').clone(true).removeClass('hide table-line');
  $clone = replaceText($clone);
  $TABLE.find('table').append($clone);
});

$('.table-remove').click(function () {
  $(this).parents('tr').detach();
});

$('.table-up').click(function () {
  var $row = $(this).parents('tr');
  if ($row.index() === 1) return; // Don't go above the header
  $row.prev().before($row.get(0));
});

$('.table-down').click(function () {
  var $row = $(this).parents('tr');
  $row.next().after($row.get(0));
});

// A few jQuery helpers for exporting only
jQuery.fn.pop = [].pop;
jQuery.fn.shift = [].shift;

$BTN.click(function () {
  var $rows = $TABLE.find('tr:not(:hidden)');
  var headers = [];
  var data = [];
  
  // Get the headers (add special header logic here)
  $($rows.shift()).find('th:not(:empty)').each(function () {
    headers.push($(this).text().toLowerCase());
  });
  
  // Turn all existing rows into a loopable array
  $rows.each(function () {
    var $td = $(this).find('td');
    var h = {};
    
    // Use the headers from earlier to name our hash keys
    headers.forEach(function (header, i) {
      h[header] = $td.eq(i).text();   
    });
    
    data.push(h);
  });
  
  // Output the result
  $EXPORT.text(JSON.stringify(data));
});

function replaceText(row) {
	var rowNumber = rowCount++;
	var nameCell = row.find('td.name');
	var nameText = nameCell[0].textContent;
	nameCell[0].textContent = nameText.replace("name", getCharFromInt(rowNumber));
	var idCell = row.find('td.id');
	var idText = idCell[0].textContent;
	idCell[0].textContent = idText.replace("id", rowNumber);
	return row;
}

//for (var i=0; i<100; i++){console.log(getCharFromInt(i))}
function getCharFromInt(code) {
	var asciiOffset = 65;
	return String.fromCharCode(code + asciiOffset);

/*	var asciiOffset = 65;
	var asciiCapsEnd = 90;
	var div = Math.floor(code/25);
	//console.log("DIV: ",div);
	code += asciiOffset;
	if (code > asciiCapsEnd) {
		return String.fromCharCode(div + asciiOffset - 1) + getCharFromInt(code - asciiCapsEnd - 1);
	} else {
		return String.fromCharCode(code);
	}*/
}