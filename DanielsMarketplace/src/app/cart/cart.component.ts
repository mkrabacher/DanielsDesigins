import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    loggedUser;
    orders;
    constructor(private _httpService: HttpService) {}

    ngOnInit() {
        this.getUsersOrders();
    }

    getUsersOrders() {
        this.loggedUser = this._httpService.retrieveLogUser();
        this.orders = this.loggedUser.orders;
    }

}
