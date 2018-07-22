import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnChanges {
    @Input() loggedUser;
    totalPrice;

    constructor(private _httpService: HttpService) {}

    ngOnInit() {
        this.updateTotalPrice();
    }

    ngOnChanges() {
        console.log('changes in cart');
        // this.updateLoggedUser();
        this.updateTotalPrice();
    }

    getLoggedUser() {
        const observable = this._httpService.retrieveLogUserInService();
        observable.subscribe(data => {
            console.log('dataaaaaaaaaaaaa', data);
            if (data['loggedUser']) {
                this.loggedUser = data['loggedUser'];
            }
        });
    }

    updateLoggedUser() {
        const observable = this._httpService.updateLoggedUserInService(this.loggedUser);
        observable.subscribe();
    }

    updateTotalPrice() {
        let total = 0;
        for (let i = 0; i < this.loggedUser.orders.length; i++) {
            total += this.loggedUser.orders[i].price * this.loggedUser.orders[i].quantity;
        }
        this.totalPrice = total;
    }

    increaseQuantity(order) {
        const index = this.loggedUser.orders.indexOf(order);

        this.loggedUser.orders[index].quantity++;
        this.updateTotalPrice();
        this.updateLoggedUser();
    }

    decreaseQuantity(order) {
        order.quantity--;
        if (order.quantity < 1) {
            this.removeFromOrders(order);
        }
        this.updateTotalPrice();
        this.updateLoggedUser();
    }

    removeFromOrders(order) {
        for (let i = 0; i < this.loggedUser.orders.length; i ++) {
            if (order._id === this.loggedUser.orders[i]._id) {
                this.loggedUser.orders.splice(i, 1);
            }
        }
    }
}
