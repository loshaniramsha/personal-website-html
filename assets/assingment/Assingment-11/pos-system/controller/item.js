import ItemModel from "../model/ItemModel.js"; // Import the ItemModel class
import {customer, items} from "../db/db.js"; // Import the items array
import {loadComboItem} from "./order.js";

let recordIndex;

$("#itemCode").val(nextId());

function nextId() {
    if (items.length > 0) {
        const lastCode = items[items.length - 1].itemCode;
        const lastNumber = parseInt(lastCode.split('-')[1], 10);
        return `Item-${lastNumber + 1}`;
    } else {
        return 'Item-1';
    }
}

function validateItemName(name) {
    const lettersOnlyRegex = /^[A-Za-z\s]+$/;
    if (!name || name.trim() === "") {
        alert("Item name cannot be empty.");
        return false;
    }
    if (!lettersOnlyRegex.test(name)) {
        alert("Item name can only contain letters and spaces.");
        return false;
    }
    return true;
}

function validateItemPrice(price) {
    if (!price || isNaN(price) || price <= 0) {
        alert("Item price must be a positive number.");
        return false;
    }
    return true;
}

function validateItemQty(qty) {
    if (!qty || isNaN(qty) || qty <= 0) {
        alert("Item quantity must be a positive number.");
        return false;
    }
    return true;
}
$("#item-save").on('click', () => {
    alert("Save item");

    const itemCode = $("#itemCode").val();
    const itemName = $("#item_name").val();
    const itemPrice = $("#item_price").val();
    const itemQty = $("#item_qty").val();

    if (!validateItemName(itemName)) {
        return; // Stop the function if validation fails
    }
    if (!validateItemPrice(itemPrice)) {
        return; // Stop the function if validation fails
    }
    if (!validateItemQty(itemQty)) {
        return; // Stop the function if validation fails
    }

    $('#close-item-model').click();

    const newItem = new ItemModel(itemCode, itemName, itemPrice, itemQty);
    items.push(newItem);

    console.log("Code:", itemCode);
    console.log("Name:", itemName);
    console.log("Price:", itemPrice);
    console.log("Qty:", itemQty);

    loadItemTable(items);
    loadComboBox(items, 'inputGroupSelect-item');
    $("#itemCode").val(nextId());
    loadComboItem(items, 'inputState-item');

});

$("#inputGroupSelect-item").on('change', () => {
    const selectedItemCode = $('#inputGroupSelect-item').val();

    if (selectedItemCode !== 'select the item') {
        const selectedItem = items.find(item => item.itemCode === selectedItemCode);
        if (selectedItem) {
            $("#item-tbl-body").empty();

            const record = `<tr>
                <td class="item-code-value">${selectedItem.itemCode}</td>
                <td class="item-name-value">${selectedItem.name}</td>
                <td class="item-price-value">${selectedItem.price}</td>
                <td class="item-qty-value">${selectedItem.qty}</td>
            </tr>`;
            $("#item-tbl-body").append(record);
        }
    } else {
        loadItemTable(items);
    }
});

function loadItemTable(items) {
    $("#item-tbl-body").empty();

    items.forEach((item, index) => {
        const record = `<tr>
            <td class="item-code-value">${item.itemCode}</td>
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

    const code = $(this).find(".item-code-value").text();
    const name = $(this).find(".item-name-value").text();
    const price = $(this).find(".item-price-value").text();
    const qty = $(this).find(".item-qty-value").text();

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
    $('#itemCode').val('');
    $('#item_name').val('');
    $('#item_price').val('');
    $('#item_qty').val('');
});

$('#exite-item-model').on('click', () => {
    $('#staticBackdrop-item').modal('hide');
});

$('#revew-item').on('click', () => {
    const itemCode = $('#itemCode').val();
    const itemIndex = items.findIndex(i => i.itemCode === itemCode);

    if (itemIndex !== -1) {
        const selectedItem = items[itemIndex];
        $("#item_name").val(selectedItem.name);
        $("#item_price").val(selectedItem.price);
        $("#item_qty").val(selectedItem.qty);

        console.log("Item details filled successfully.");
    } else {
        alert("Item with the entered code does not exist.");
    }
});

$('#update-item').on('click', () => {
    const code = $("#itemCode").val();
    const name = $("#item_name").val();
    const price = $("#item_price").val();
    const qty = $("#item_qty").val();

    if (code) {
        $("#staticBackdrop-item").modal("show");
        $("#itemCode").val(code);
        $("#item_name").val(name);
        $("#item_price").val(price);
        $("#item_qty").val(qty);
    } else {
        alert("Please select an item from the table.");
    }
});

$("#update-item-model").on("click", () => {
    const updatedCode = $("#itemCode").val();
    const updatedName = $("#item_name").val();
    const updatedPrice = $("#item_price").val();
    const updatedQty = $("#item_qty").val();

    const itemIndex = items.findIndex(i => i.itemCode === updatedCode);

    if (itemIndex !== -1) {
        items[itemIndex].name = updatedName;
        items[itemIndex].price = updatedPrice;
        items[itemIndex].qty = updatedQty;

        console.log("Updated Item Code:", updatedCode);
        console.log("Updated Item Name:", updatedName);
        console.log("Updated Item Price:", updatedPrice);
        console.log("Updated Item Quantity:", updatedQty);

        loadItemTable(items);
        $("#staticBackdrop-item").modal("hide");
    } else {
        alert("Item with the entered code does not exist.");
    }
});

function loadComboBox(array, comboId) {
    console.log("combo-box loaded", array, comboId);
    const comboBox = $('#' + comboId);
    comboBox.empty();

    array.forEach(item => {
        comboBox.append($('<option>', {
            value: item.itemCode,
            text: item.itemCode
        }));
    });
}

loadComboBox(items, 'inputGroupSelect-item');


$('#all-item').on('click', () => {
    loadItemTable(items);
});


