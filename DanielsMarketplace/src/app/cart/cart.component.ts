import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    @Input() loggedUser;
    constructor(private _httpService: HttpService) {}

    ngOnInit() {}

    updateLoggedUser() {
        const observable = this._httpService.updateLoggedUserInService(this.loggedUser);
        observable.subscribe();
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

    increaseQuantity(order) {
        const index = this.loggedUser.orders.indexOf(order);

        this.loggedUser.orders[index].quantity++;
        this.updateLoggedUser();
    }

    decreaseQuantity(order) {
        order.quantity--;
        if (order.quantity < 1) {
            this.removeFromOrders(order);
        }
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
