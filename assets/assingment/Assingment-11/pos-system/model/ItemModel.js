export default class ItemModel{
    constructor(itemCode, name, price, qty) {
       this._itemCode = itemCode;
        this._name = name;
        this._price = price;
        this._qty = qty;
    }
    get itemCode() {
        return this._itemCode;
    }
    get name() {
        return this._name;
    }
    get price() {
        return this._price;
    }
    get qty() {
        return this._qty;
    }
    set itemCode(itemCode) {
        this._itemCode = itemCode;
    }
    set name(name) {
        this._name = name;
    }
    set price(price) {
        this._price = price;
    }
    set qty(qty) {
        this._qty = qty;
    }
}