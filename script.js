var fakeDatabase = [
  {
    firstName: "John",
    lastName: "Doe",
    handle: "@johndoe"
  },
  {
    firstName: "Sarah",
    lastName: "Smith",
    handle: "@sasmith"
  },
  {
    firstName: "Robert",
    lastName: "Plant",
    handle: "@robplanter"
  }
];

var tableData = [];

$(document).on("click", ".delete-btn", function() {
  var confirmDelete = confirm("are you sure you want to delete this line?");
  if (confirmDelete) {
    $(this)
      .parent()
      .parent()
      .remove();
  }
});

$(document).on("click", ".edit-btn", function(){
    var rowIndex = $(this).attr("data-index");
    $("#firstName").val(tableData[rowIndex].firstName);
    $("#lastName").val(tableData[rowIndex].lastName);
    $("#handle").val(tableData[rowIndex].handle);
    editModal("editCurrentRow", "Edit Row", rowIndex);
});

$(document).on("click", "#submitNewRow", function(){
    var newRowData = {
        firstName: $("#firstName").val().trim(),
        lastName: $("#lastName").val().trim(),
        handle: $("#handle").val().trim()
    }
    tableData.push(newRowData);
    populateTable(tableData);
    $("#firstName").val("");
    $("#lastName").val("");
    $("#handle").val("");
    $("#addRowModal").modal('hide');
})

$(document).on("click", "#editCurrentRow", function(){
    var rowIndex = $(this).attr("data-index");
    tableData[rowIndex] = {
      firstName: $("#firstName")
        .val()
        .trim(),
      lastName: $("#lastName")
        .val()
        .trim(),
      handle: $("#handle")
        .val()
        .trim()
    };
    populateTable(tableData);
    $("#addRowModal").modal("hide");
})

$(document).on("click", "#showBlankModal", function() {
    $("#firstName").val("");
    $("#lastName").val("");
    $("#handle").val("");
    editModal("submitNewRow", "Add Row");
})

function populateTable(array) {
  $("#table-body").empty();
    array.forEach((object, index) => {
    $("#table-body").append(addTableRow(object, index));
  });
}

function fakeAjax() {
    fakeDatabase.forEach(obj =>{
        tableData.push(obj);
    })
    populateTable(tableData);
}

function addTableRow(object, index) {
  var tableRow = $("<tr>");
  tableRow.append(`
        <td>
            <input type="button" value="edit" class="btn btn-primary edit-btn" data-index="${index}">
            <input type="button" value="delete" class="btn btn-danger delete-btn"> 
        </td>
    `);
  $.each(object, function(key, val) {
    tableRow.append(`<td data-key="${key}">${val}</tr>`);
  });
  return tableRow;
}

function editModal(buttonId, buttonText, currentIndex) {
    $("#submitNewRow").remove();
    $("#editCurrentRow").remove();
    $(".modal-footer").append(
      `<button type="button" class="btn btn-primary" id="${buttonId}" data-index="${currentIndex}">${buttonText}</button>`
    );
    $("#addRowModal").modal("show");
}

fakeAjax();