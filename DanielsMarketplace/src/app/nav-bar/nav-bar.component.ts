import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { HttpService } from '../http.service';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
    currentUser;
    showCart;
    constructor(private _router: Router, private _httpService: HttpService) {
        this.showCart = false;
        this.currentUser = _httpService.currentUser;
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
        this._httpService.currentUser = {
            _id: 'guest',
            admin: false,
            cart: {
                current: [],
            },
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
