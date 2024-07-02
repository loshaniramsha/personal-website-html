
var items = [];
var recordIndex;

$("#item-save").on('click', () => {
    alert("Save item");


    var itemCode = $("#itemCode").val();
    var itemName = $("#item_name").val();
    var itemPrice = $("#item_price").val();
    var itemQty = $("#item_qty").val();

    $('#close-item-model').click();

    var newItem = {
        code: itemCode,
        name: itemName,
        price: itemPrice,
        qty: itemQty
    };


    items.push(newItem);


    console.log("Code:", itemCode);
    console.log("Name:", itemName);
    console.log("Price:", itemPrice);
    console.log("Qty:", itemQty);

    loadItemTable(items)
    /*loadTable(items);*/
});

function loadItemTable(items) {
    $("#item-tbl-body").empty();

    items.forEach((item, index) => {
        let record = `<tr>
            <td class="item-code-value">${item.code}</td>
            <td class="item-name-value">${item.name}</td>
            <td class="item-price-value">${item.price}</td>
            <td class="item-qty-value">${item.qty}</td>
        </tr>`;
        $("#item-tbl-body").append(record);
    });
}

$("#item-tbl-body").on('click', 'tr', function () {
    recordIndex = $(this).index();
    console.log("index:", recordIndex);

    let code = $(this).find(".item-code-value").text();
    let name = $(this).find(".item-name-value").text();
    let price = $(this).find(".item-price-value").text();
    let qty = $(this).find(".item-qty-value").text();

    $("#itemCode").val(code);
    $("#item_name").val(name);
    $("#item_price").val(price);
    $("#item_qty").val(qty);
});


$("#item-delete").on('click', () => {
    const confirmation = confirm("Are you sure you want to delete this item?");
    if (confirmation) {
        items.splice(recordIndex, 1);
        alert("Item deleted successfully");
        loadItemTable(items);
    } else {
        alert("Delete canceled");
    }
});



$('#close-item-model').on('click', () => {
    // Clear the input fields
    $('#itemCode').val('');
    $('#item_name').val('');
    $('#item_price').val('');
    $('#item_qty').val('');
});

$('#exite-item-model').on('click', () => {
    $('#staticBackdrop-item').modal('hide');
});

$('#revew-item').on('click', () => {
    // Get the entered item code
    var itemCode = $('#itemCode').val();

    // Find the index of the item in the array based on the entered code
    var itemIndex = items.findIndex(i => i.code === itemCode);

    // Check if the item with the entered code exists
    if (itemIndex !== -1) {
        // Retrieve the item details from the array
        var selectedItem = items[itemIndex];

        // Fill the input fields with the retrieved item details
        $("#item_name").val(selectedItem.name);
        $("#item_price").val(selectedItem.price);
        $("#item_qty").val(selectedItem.qty);

        console.log("Item details filled successfully.");
    } else {
        alert("Item with the entered code does not exist.");
    }
});

$('#update-item').on('click', () => {
    // Get the selected item's data
    let code = $("#itemCode").val();
    let name = $("#item_name").val();
    let price = $("#item_price").val();
    let qty = $("#item_qty").val();

    // Check if an item is selected
    if (code) {
        // Fill the modal input fields with the selected item's data
        $("#staticBackdrop-item").modal("show");
        $("#itemCode").val(code);
        $("#item_name").val(name);
        $("#item_price").val(price);
        $("#item_qty").val(qty);
    } else {
        alert("Please select an item from the table.");
    }
});

// Function to update the item's data when the "Update" button inside the modal is clicked
$("#update-item-model").on("click", () => {
    // Get the updated values from the modal input fields
    var updatedCode = $("#itemCode").val();
    var updatedName = $("#item_name").val();
    var updatedPrice = $("#item_price").val();
    var updatedQty = $("#item_qty").val();

    // Find the index of the item in the array based on the item code
    var itemIndex = items.findIndex(i => i.code === updatedCode);

    // Check if the item with the entered code exists
    if (itemIndex !== -1) {
        // Update the corresponding item object in the items array
        items[itemIndex].name = updatedName;
        items[itemIndex].price = updatedPrice;
        items[itemIndex].qty = updatedQty;

        // Log the updated values for verification
        console.log("Updated Item Code:", updatedCode);
        console.log("Updated Item Name:", updatedName);
        console.log("Updated Item Price:", updatedPrice);
        console.log("Updated Item Quantity:", updatedQty);

        // Reload the table to reflect the changes
        loadItemTable(items);

        // Close the modal
        $("#staticBackdrop-item").modal("hide");
    } else {
        alert("Item with the entered code does not exist.");
    }
});

