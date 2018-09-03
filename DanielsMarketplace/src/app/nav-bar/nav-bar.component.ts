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
            this.currentUser = this._httpService.currentUser;
            return true;
        }
    }

    logOut() {
        const observable = this._httpService.logOutInService();
        const _router = this._router;
        console.log('this outside:::::::::::::', this);
        observable.subscribe(function(data) {
            console.log('this:::::::::::::', this);
            _router.navigate(['/welcome']);
        });
    }

    toggleCart() {
        if (this.showCart) {
            this._router.navigate([{ outlets: { cart: null }}]);
            this.showCart = false;
        } else {
            this._router.navigate([{ outlets: { cart: 'cart' }}]);
            this.showCart = true;
        }
    }

}
