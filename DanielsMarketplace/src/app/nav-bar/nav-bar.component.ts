import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
    currentUser;
    showCart;
    constructor(private _router: Router) {
        this.showCart = false;
        this.currentUser = {
            _id: 'guest',
            admin: false,
            orders: []
        };
    }

    ngOnInit() {
    }

    loggedIn() {
        if (this.currentUser._id === 'guest') {
            return false;
        } else {
            return true;
        }
    }

    logOut() {
        this.currentUser = {
            _id: 'guest',
            admin: false,
            orders: []
        };
    }

    toggleCart() {
        if (this.showCart) {
            this._router.navigate([{ outlets: { popup: null }}]);
            this.showCart = false;
        } else {
            this._router.navigate([{ outlets: { popup: 'cart' }}]);
            this.showCart = true;
        }
    }

}
