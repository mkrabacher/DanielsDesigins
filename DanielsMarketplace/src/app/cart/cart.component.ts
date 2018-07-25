import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnChanges {

    constructor(private _httpService: HttpService) {}

    ngOnInit() {
        this._httpService.currentUser.cart.totalPrice = function() {
            let total = 0;
            for (let i = 0; i < this.current.length; i++) {
                total += this.current[i].price * this.current[i].quantity;
            }
            return total;
        };
    }

    ngOnChanges() { }

    updateCurrentUser() {
        this._httpService.updateCurrentUserInServer();
    }

    increaseQuantity(order) {
        const index = this._httpService.currentUser.cart.current.indexOf(order);

        this._httpService.currentUser.cart.current[index].quantity++;
        this.updateCurrentUser();
    }

    decreaseQuantity(order) {
        order.quantity--;
        if (order.quantity < 1) {
            this.removeFromOrders(order);
        }
        this.updateCurrentUser();
    }

    removeFromOrders(order) {
        for (let i = 0; i < this._httpService.currentUser.cart.current.length; i ++) {
            if (order._id === this._httpService.currentUser.cart.current[i]._id) {
                this._httpService.currentUser.cart.current.splice(i, 1);
            }
        }
        if (this._httpService.currentUser._id !== 'guest') {
            this.updateCurrentUser();
        }
    }
}
