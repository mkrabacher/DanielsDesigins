export class GuestUser {
    _id;
    admin;
    cart;
    totalPrice;
    constructor () {
        this._id = 'guest',
        this.admin = false,
        this.cart = {
            current: [],
        },
        this.totalPrice = function() {
            let total = 0;
            for (let i = 0; i < this.current.length; i++) {
                total += this.current[i].price * this.current[i].quantity;
            }
            return total;
        };
    }
}
