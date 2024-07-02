export default class CustomerModel {
    constructor(id, name, address, salary) {
        this._id = id;
        this._name = name;
        this._address = address;
        this._salary = salary;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get address() {
        return this._address;
    }

    set address(address) {
        this._address = address;
    }

    get salary() {
        return this._salary;
    }

    set salary(salary) {
        this._salary = salary;
    }
}
