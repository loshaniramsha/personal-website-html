export class OrderDetailsModel{
    constructor(orderId,itemId,unitPrice,qty,total) {
        this._orderId = orderId;
        this._itemId = itemId;
        this._unitPrice = unitPrice;
        this._qty = qty;
        this._total = total;
    }


    get orderId() {
        return this._orderId;
    }

    set orderId(value) {
        this._orderId = value;
    }

    get itemId() {
        return this._itemId;
    }

    set itemId(value) {
        this._itemId = value;
    }

    get unitPrice() {
        return this._unitPrice;
    }

    set unitPrice(value) {
        this._unitPrice = value;
    }

    get qty() {
        return this._qty;
    }

    set qty(value) {
        this._qty = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }
}