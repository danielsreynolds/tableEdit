var tableRowData = {
    FirstName: "John",
    LastName: "Doe",
    Handle: "@johndoe"
}

$(document).on("click", "#add-row", function() {
    $("#table-body").append(addTableRow(tableRowData));
})

$(document).on("click", ".delete-btn", function(){
    var confirmDelete = confirm("are you sure you want to delete this line?");
    if (confirmDelete)
    {
        $(this).parent().parent().remove();
    }
})

function addTableRow(object) {
    var tableRow = $("<tr>");
    tableRow.append(`
        <td>
            <input type="button" value="edit" class="btn btn-primary edit-btn">
            <input type="button" value="delete" class="btn btn-danger delete-btn"> 
        </td>
    `);
    $.each(object, function(key, val) {
        tableRow.append(`<td data-key="${key}" contenteditable="true">${val}</tr>`);
    })
    return tableRow;
}

$(document).on("click", "#save-table", function(){
    var tabledata = [];
    $("table tbody tr").each(function(){
        var rowData = {}
        $(this).children().each(function(){
            if ($(this).attr("data-key")){
                // console.log($(this).attr("data-key"));
                rowData[$(this).attr("data-key")] = $(this).text();
            }
        })
        tabledata.push(rowData);
    })
    console.log(tabledata);
})