export class OrderModel {
    constructor(orderId, date, discount, subTotal, customerId) {
        this._orderId = orderId;
        this._date = date;
        this._discount = discount;
        this._subTotal = subTotal;
        this._customerId = customerId;
    }

    get orderId() {
        return this._orderId;
    }

    get date() {
        return this._date;
    }

    get discount() {
        return this._discount;
    }

    get subTotal() {
        return this._subTotal;
    }

    get customerId() {
        return this._customerId;
    }

    set orderId(orderId) {
        this._orderId = orderId;
    }

    set date(date) {
        this._date = date;
    }

    set discount(discount) {
        this._discount = discount;
    }

    set subTotal(subTotal) {
        this._subTotal = subTotal;
    }

    set customerId(customerId) {
        this._customerId = customerId;
    }
}
