
var customer = [];
var recordIndex;

$('#save-customer').on('click', () => {

    alert("Saving customer...");


    var customerId = $('#customer_id').val();
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
    loadComboBoxes(customer,"inputGroupSelect-customer")
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
    // Get the updated values from the input fields
    var updatedId = $('#customer_id').val();
    var updatedName = $('#customer_name').val();
    var updatedAddress = $('#customer_address').val();
    var updatedSalary = $('#customer_salary').val();

    // Update the corresponding customer object in the customer array
    customer[recordIndex].id = updatedId;
    customer[recordIndex].name = updatedName;
    customer[recordIndex].address = updatedAddress;
    customer[recordIndex].salary = updatedSalary;

    // Log the updated values for verification
    console.log("Updated Customer ID:", updatedId);
    console.log("Updated Customer Name:", updatedName);
    console.log("Updated Customer Address:", updatedAddress);
    console.log("Updated Customer Salary:", updatedSalary);

    // Reload the table to reflect the changes
    loadTable();
});

$('#revew-customer').on('click', () => {
    // Get the entered customer ID
    var customerId = $('#customer_id').val();

    // Find the index of the customer in the array based on the entered ID
    var customerIndex = customer.findIndex(c => c.id === customerId);

    // Check if the customer with the entered ID exists
    if (customerIndex !== -1) {
        // Retrieve the customer details from the array
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

