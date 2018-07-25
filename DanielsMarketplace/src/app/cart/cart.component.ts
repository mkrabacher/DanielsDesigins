import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnChanges {
    currentUser;
    totalPrice;

    constructor(private _httpService: HttpService) {}

    ngOnInit() {
        this.getcurrentUser();
        this.updateTotalPrice();
    }

    ngOnChanges() {
        console.log('changes in cart');
        // this.updateCurrentUser();
        this.updateTotalPrice();
    }

    getcurrentUser() {
        this.currentUser = this._httpService.retrieveCurrentUserInService();
    }

    updateCurrentUser() {
        this._httpService.updateCurrentUserInService(this.currentUser);
    }

    updateTotalPrice() {
        let total = 0;
        for (let i = 0; i < this.currentUser.orders.length; i++) {
            total += this.currentUser.orders[i].price * this.currentUser.orders[i].quantity;
        }
        this.totalPrice = total;
    }

    increaseQuantity(order) {
        const index = this.currentUser.orders.indexOf(order);

        this.currentUser.orders[index].quantity++;
        this.updateTotalPrice();
        this.updateCurrentUser();
    }

    decreaseQuantity(order) {
        order.quantity--;
        if (order.quantity < 1) {
            this.removeFromOrders(order);
        }
        this.updateTotalPrice();
        this.updateCurrentUser();
    }

    removeFromOrders(order) {
        for (let i = 0; i < this.currentUser.orders.length; i ++) {
            if (order._id === this.currentUser.orders[i]._id) {
                this.currentUser.orders.splice(i, 1);
            }
        }
    }
}
