// Auto-generate order ID
function generateOrderId() {
    const orderIdInput = $('#order-id');
    const orderIdPrefix = "ORD-";
    const orderIdNumber = String(customer.length + 1).padStart(4, '0');
    orderIdInput.val(orderIdPrefix + orderIdNumber);
}

// Call generateOrderId when the page loads
$(document).ready(function () {
    generateOrderId();
});

// Load customer IDs into the combo box and set up event listeners
function loadComboBoxes(array, comboBoxId) {
    console.log("combo-box loaded", array, comboBoxId);
    var comboBox = $('#' + comboBoxId);

    // Clear existing options
    comboBox.empty();

    // Add a default option
    comboBox.append($('<option>', {
        value: '',
        text: 'Select Customer ID...'
    }));

    // Iterate through the array and add options
    array.forEach(function (customer) {
        comboBox.append($('<option>', {
            value: customer.id,
            text: customer.id
        }));
    });
}

// Fill customer details based on selected customer ID
function fillCustomerDetails() {
    const selectedCustomerId = $('#customer-id-order').val();

    // Find the selected customer in the customer array
    const selectedCustomer = customer.find(c => c.id === selectedCustomerId);

    if (selectedCustomer) {
        // Fill the input fields with the selected customer's details
        $('#customerId-order-form').val(selectedCustomer.id);
        $('#customer-name-orderForm').val(selectedCustomer.name);
        $('#customer-salary-orderForm').val(selectedCustomer.salary);
        $('#customer_address-orderForm').val(selectedCustomer.address);
    } else {
        // Clear the input fields if no customer is found
        $('#customerId-order-form').val('');
        $('#customer-name-orderForm').val('');
        $('#customer-salary-orderForm').val('');
        $('#customer_address-orderForm').val('');
    }
}

// Initial call to loadComboBoxes with customer array and combo box ID
loadComboBoxes(customer, 'customer-id-order');
