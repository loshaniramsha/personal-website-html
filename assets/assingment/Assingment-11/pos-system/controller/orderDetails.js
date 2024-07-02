import {orderDetails, orders} from "../db/db.js";

// Function to load order IDs into the select dropdown
export function loadCMBDetails(array, comboBoxId) {
    console.log("combo-box loaded", array, comboBoxId);
    const comboBox = $('#' + comboBoxId);
    comboBox.empty();
    comboBox.append($('<option>', { value: '', text: 'Search order...' }));
    array.forEach(function (order) {
        comboBox.append($('<option>', { value: order.orderId, text: order.orderId }));
    });
}


$('#inputGroupSelect-orderDetails').on('change', () => {
    const selectedOrderId = $('#inputGroupSelect-orderDetails').val();

    if (selectedOrderId !== '') {
        const selectedOrderDetails = orderDetails.filter(od => od.orderId === selectedOrderId);
        if (selectedOrderDetails.length > 0) {
            console.log("Selected Order Details:", selectedOrderDetails);
            $('#ordrDtails-tbl-body').empty();
            selectedOrderDetails.forEach(orderDetail => {
                $('#ordrDtails-tbl-body').append(`
                    <tr>
                        <td>${orderDetail.orderId}</td>
                        <td>${orderDetail.itemId}</td>
                        <td>${orderDetail.unitPrice}</td>
                        <td>${orderDetail.qty}</td>
                        <td>${orderDetail.total}</td>
                    </tr>
                `);
            });
        } else {
            $('#ordrDtails-tbl-body').empty();
        }
    } else {
        $('#ordrDtails-tbl-body').empty();
    }
});



