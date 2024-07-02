import CustomerModel from "../model/CustomerModel.js";
import {loadCombos} from "./order.js";
import {customer} from "../db/db.js"
var recordIndex;

/*auto generate customer id*/
$('#customer_id').val(nextId());

function nextId() {
    if (customer.length > 0) {
        return parseInt(customer[customer.length - 1].id) + 1;
    } else {
        return 1;
    }
}

function validateCustomerAddress(address) {
    const lettersOnlyRegex = /^[A-Za-z\s]+$/;
    if (!address || address.trim() === "") {
        alert("Customer address cannot be empty.");
        return false;
    }
    if (!lettersOnlyRegex.test(address)) {
        alert("Customer address can only contain letters and spaces.");
        return false;
    }
    return true;
}

function validateCustomerName(name) {
    const lettersOnlyRegex = /^[A-Za-z\s]+$/;
    if (!name || name.trim() === "") {
        alert("Customer name cannot be empty.");
        return false;
    }
    if (!lettersOnlyRegex.test(name)) {
        alert("Customer name can only contain letters and spaces.");
        return false;
    }
    return true;
}

function validateCustomerPhoneNumber(phoneNumber) {
    // A simple regex to validate phone numbers (adjust as needed for your use case)
    const phoneRegex = /^(?:\+94|94|0)?7\d{8}$/; // This regex assumes a 10-digit phone number without any separators
    if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
        alert("Invalid phone number. Please enter a valid 10-digit phone number.");
        return false;
    }
    return true;
}


/*customer save*/
$('#save-customer').on('click', () => {

    alert("Saving customer...");

    var customerId = $('#customer_id').val();
    var customerName = $('#customer_name').val();
    var customerAddress = $('#customer_address').val();
    var customerSalary = $('#customer_salary').val();

    if (!validateCustomerName(customerName)) {
        return; // Stop the function if validation fails
    }
    if (!validateCustomerAddress(customerAddress)) {
        return; // Stop the function if validation fails
    }

    if (!validateCustomerPhoneNumber(customerSalary)) {
        return; // Stop the function if phone number validation fails
    }

    $('#close-customer-model').click();

    var newCustomer = new CustomerModel(customerId, customerName, customerAddress, customerSalary);

    customer.push(newCustomer);

    // Log the data to the console for verification
    console.log("Customer ID:", customerId);
    console.log("Customer Name:", customerName);
    console.log("Customer Address:", customerAddress);
    console.log("Customer Salary:", customerSalary);


    loadTable();
    loadComboBoxes(customer,"inputGroupSelect-customer")
    loadCombos(customer,"customer-id-order")
    $('#customer_id').val(nextId());

});
/*search input-customer*/
var selectedCustomer = $('#inputGroupSelect-customer').val();

$('#inputGroupSelect-customer').on('input', () => {
    if ($('#inputGroupSelect-customer').val() !== 'select the customer'){
        $('#customer-tbl-body').empty();

        customer.map((item, index) => {
            if(item.id == $('#inputGroupSelect-customer').val()){
                let record = `<tr>
                                <td class="customer-id-value">${item.id}</td>
                                <td class="customer-name-value">${item.name}</td>
                                <td class="customer-address-value">${item.address}</td>
                                <td class="customer-salary-value">${item.salary}</td>
                            </tr>`;
                $('#customer-tbl-body').append(record);
            }
        });
    }else{
       loadTable()
    }
});

/*loard table*/
function loadTable() {
    $('#customer-tbl-body').empty();
    customer.map((item, index) => {
        let record = `<tr>
                        <td class="customer-id-value">${item.id}</td>
                        <td class="customer-name-value">${item.name}</td>
                        <td class="customer-address-value">${item.address}</td>
                        <td class="customer-salary-value">${item.salary}</td>
                    </tr>`;
        $('#customer-tbl-body').append(record);
    });
}

$("#customer-tbl-body").on('click', 'tr', function () {
    let index = $(this).index();
    recordIndex = index;
    console.log("index:", index);

    let id = $(this).find(".customer-id-value").text();
    let name = $(this).find(".customer-name-value").text();
    let address = $(this).find(".customer-address-value").text();
    let salary = $(this).find(".customer-salary-value").text();

    $("#customer_id").val(id);
    $("#customer_name").val(name);
    $("#customer_address").val(address);
    $("#customer_salary").val(salary);
});

/*delete */
$("#delete-customer").on('click', () => {
    const confirmation = confirm("Are you sure you want to delete this customer?");
    if (confirmation) {

        customer.splice(recordIndex, 1);
        alert("Customer deleted successfully.");
        loadTable();
    } else {

        alert("Deletion canceled.");
    }
});

/*revew customer*/
$('#revew-customer').on('click', () => {

    var customerId = $('#customer_id').val();

    var customerIndex = customer.findIndex(c => c.id === customerId);


    if (customerIndex !== -1) {
        var selectedCustomer = customer[customerIndex];

        // Fill the input fields with the retrieved customer details
        $("#customer_name").val(selectedCustomer.name);
        $("#customer_address").val(selectedCustomer.address);
        $("#customer_salary").val(selectedCustomer.salary);

        console.log("Customer details filled successfully.");
    } else {
        alert("Customer with the entered ID does not exist.");
    }
});

$('#close-customer-model').on('click', () => {
    // Clear the input fields
    $('#customer_id').val('');
    $('#customer_name').val('');
    $('#customer_address').val('');
    $('#customer_salary').val('');
});

$('#exite-customer-model').on('click', () => {
    $('#staticBackdrop-customer').modal('hide');
});


// Function to open the modal and fill the input fields with customer data for update
$("#Update-customer").on("click", () => {
    // Get the selected customer's data
    let id = $("#customer_id").val();
    let name = $("#customer_name").val();
    let address = $("#customer_address").val();
    let salary = $("#customer_salary").val();

    // Check if a customer is selected
    if (id) {
        // Fill the modal input fields with the selected customer's data
        $("#staticBackdrop-customer").modal("show");
        $("#customer_id").val(id);
        $("#customer_name").val(name);
        $("#customer_address").val(address);
        $("#customer_salary").val(salary);
    } else {
        alert("Please select a customer from the table.");
    }
});

// Function to update the customer's data when the "Update" button inside the modal is clicked
$("#update-customer-model").on("click", () => {
    // Get the updated values from the modal input fields
    var updatedId = $("#customer_id").val();
    var updatedName = $("#customer_name").val();
    var updatedAddress = $("#customer_address").val();
    var updatedSalary = $("#customer_salary").val();

    // Find the index of the customer in the array based on the customer ID
    var customerIndex = customer.findIndex((c) => c.id === updatedId);

    // Check if the customer with the entered ID exists
    if (customerIndex !== -1) {
        // Update the corresponding customer object in the customer array
        customer[customerIndex].name = updatedName;
        customer[customerIndex].address = updatedAddress;
        customer[customerIndex].salary = updatedSalary;



        // Log the updated values for verification
        console.log("Updated Customer ID:", updatedId);
        console.log("Updated Customer Name:", updatedName);
        console.log("Updated Customer Address:", updatedAddress);
        console.log("Updated Customer Salary:", updatedSalary);

        // Reload the table to reflect the changes
        loadTable();

        // Close the modal
        $("#staticBackdrop-customer").modal("hide");
    } else {
        alert("Customer with the entered ID does not exist.");
    }
});


function loadComboBoxes(array, comboBoxId) {
    console.log("combo-box loaded", array, comboBoxId);
    var comboBox = $('#' + comboBoxId); // Get the combo box by ID

    // Clear existing options
    comboBox.empty();

    comboBox.append($('<option>', {
        value: 'select the customer',
        text: 'select the customer'
    }));

    // Iterate through the array and add options
    array.forEach(function(customer) {
        comboBox.append($('<option>', {
            value: customer.id,
            text: customer.id
        }));
    });
}

// Call the loadComboBox function to populate the customer ID dropdown
loadComboBoxes(customer, 'inputGroupSelect-customer');

$('#all-customer').on('click', () => {
    $('#customer-tbl-body').empty();
    customer.map((item, index) => {
        let record = `<tr>
                        <td class="customer-id-value">${item.id}</td>
                        <td class="customer-name-value">${item.name}</td>
                        <td class="customer-address-value">${item.address}</td>
                        <td class="customer-salary-value">${item.salary}</td>
                    </tr>`;
        $('#customer-tbl-body').append(record);
    });
    loadTable();
});





























/*

import { customer } from "../db/db.js";


var recordIndex;
var lastCustomerId = 0; // Variable to keep track of the last customer ID

function generateCustomerId() {
    lastCustomerId += 1;
    return 'C' + String(lastCustomerId).padStart(3, '0'); // Generates ID like 'C001', 'C002', etc.
}

$('#save-customer').on('click', () => {
    alert("Saving customer...");

    var customerId = generateCustomerId(); // Auto-generate customer ID
    var customerName = $('#customer_name').val();
    var customerAddress = $('#customer_address').val();
    var customerSalary = $('#customer_salary').val();

    $('#close-customer-model').click();

    var newCustomer = {
        id: customerId,
        name: customerName,
        address: customerAddress,
        salary: customerSalary
    };

    customer.push(newCustomer);

    // Log the data to the console for verification
    console.log("Customer ID:", customerId);
    console.log("Customer Name:", customerName);
    console.log("Customer Address:", customerAddress);
    console.log("Customer Salary:", customerSalary);

    loadTable();
    loadComboBoxes(customer, "inputGroupSelect-customer");
});

function loadTable() {
    $('#customer-tbl-body').empty();
    customer.map((item, index) => {
        let record = `<tr>
                        <td class="customer-id-value">${item.id}</td>
                        <td class="customer-name-value">${item.name}</td>
                        <td class="customer-address-value">${item.address}</td>
                        <td class="customer-salary-value">${item.salary}</td>
                    </tr>`;
        $('#customer-tbl-body').append(record);
    });
}

$("#customer-tbl-body").on('click', 'tr', function () {
    let index = $(this).index();
    recordIndex = index;
    console.log("index:", index);

    let id = $(this).find(".customer-id-value").text();
    let name = $(this).find(".customer-name-value").text();
    let address = $(this).find(".customer-address-value").text();
    let salary = $(this).find(".customer-salary-value").text();

    $("#customer_id").val(id);
    $("#customer_name").val(name);
    $("#customer_address").val(address);
    $("#customer_salary").val(salary);
});

$("#delete-customer").on('click', () => {
    const confirmation = confirm("Are you sure you want to delete this customer?");
    if (confirmation) {
        customer.splice(recordIndex, 1);
        alert("Customer deleted successfully.");
        loadTable();
    } else {
        alert("Deletion canceled.");
    }
});

$('#update-customer').on('click', () => {
    var updatedId = $('#customer_id').val();
    var updatedName = $('#customer_name').val();
    var updatedAddress = $('#customer_address').val();
    var updatedSalary = $('#customer_salary').val();

    customer[recordIndex].id = updatedId;
    customer[recordIndex].name = updatedName;
    customer[recordIndex].address = updatedAddress;
    customer[recordIndex].salary = updatedSalary;

    console.log("Updated Customer ID:", updatedId);
    console.log("Updated Customer Name:", updatedName);
    console.log("Updated Customer Address:", updatedAddress);
    console.log("Updated Customer Salary:", updatedSalary);

    loadTable();
});

$('#review-customer').on('click', () => {
    var customerId = $('#customer_id').val();
    var customerIndex = customer.findIndex(c => c.id === customerId);

    if (customerIndex !== -1) {
        var selectedCustomer = customer[customerIndex];
        $("#customer_name").val(selectedCustomer.name);
        $("#customer_address").val(selectedCustomer.address);
        $("#customer_salary").val(selectedCustomer.salary);

        console.log("Customer details filled successfully.");
    } else {
        alert("Customer with the entered ID does not exist.");
    }
});

$('#close-customer-model').on('click', () => {
    $('#customer_id').val('');
    $('#customer_name').val('');
    $('#customer_address').val('');
    $('#customer_salary').val('');
});

$('#exit-customer-model').on('click', () => {
    $('#staticBackdrop-customer').modal('hide');
});

$("#Update-customer").on("click", () => {
    let id = $("#customer_id").val();
    let name = $("#customer_name").val();
    let address = $("#customer_address").val();
    let salary = $("#customer_salary").val();

    if (id) {
        $("#staticBackdrop-customer").modal("show");
        $("#customer_id").val(id);
        $("#customer_name").val(name);
        $("#customer_address").val(address);
        $("#customer_salary").val(salary);
    } else {
        alert("Please select a customer from the table.");
    }
});

$("#update-customer-model").on("click", () => {
    var updatedId = $("#customer_id").val();
    var updatedName = $("#customer_name").val();
    var updatedAddress = $("#customer_address").val();
    var updatedSalary = $("#customer_salary").val();

    var customerIndex = customer.findIndex((c) => c.id === updatedId);

    if (customerIndex !== -1) {
        customer[customerIndex].name = updatedName;
        customer[customerIndex].address = updatedAddress;
        customer[customerIndex].salary = updatedSalary;

        console.log("Updated Customer ID:", updatedId);
        console.log("Updated Customer Name:", updatedName);
        console.log("Updated Customer Address:", updatedAddress);
        console.log("Updated Customer Salary:", updatedSalary);

        loadTable();
        $("#staticBackdrop-customer").modal("hide");
    } else {
        alert("Customer with the entered ID does not exist.");
    }
});

function loadComboBoxes(array, comboBoxId) {
    console.log("combo-box loaded", array, comboBoxId);
    var comboBox = $('#' + comboBoxId);
    comboBox.empty();
    array.forEach(function(customer) {
        comboBox.append($('<option>', {
            value: customer.id,
            text: customer.id
        }));
    });
}

loadComboBoxes(customer, 'inputGroupSelect-customer');


*/