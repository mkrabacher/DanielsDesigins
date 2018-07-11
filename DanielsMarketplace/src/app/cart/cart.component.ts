import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    loggedUser;
    constructor(private _httpService: HttpService) {}

    ngOnInit() {
        this.loggedUser = {
            _id: 'guest',
            admin: false,
            orders: []
        };
        this.getUsersOrders();
    }

    getUsersOrders() {
        const observable = this._httpService.retrieveLogUser();
        observable.subscribe(data => {
            console.log('dataaaaaaaaaaaaa', data);
            if (data['loggedUser']) {
                this.loggedUser = data['loggedUser'];
            }
        });
    }

    increaseQuantity(order) {
        order.quantity++;
    }

    decreaseQuantity(order) {
        order.quantity--;
        if (order.quantity < 1) {
            this.removeFromOrders(order);
        }
    }

    removeFromOrders(order) {
        for (let i = 0; i < this.loggedUser.orders.length; i ++) {
            if (order._id === this.loggedUser.orders[i]._id) {
                this.loggedUser.orders.splice(i, 1);
            }
        }
    }
}
