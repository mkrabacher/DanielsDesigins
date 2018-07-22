import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    loggedInUser;
    logIn;
    showCart;
    constructor(
        private _httpService: HttpService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        this.logIn = false;
        this.showCart = false;
        this.loggedInUser = {
            _id: 'guest',
            admin: false,
            orders: []
        };
    }

    ngOnInit() {
        this.getCurrentUser();
    }

    getCurrentUser() {
        const observable = this._httpService.retrieveLogUserInService();
        observable.subscribe(data => {
            console.log('dataaaaaaaaaaaaa', data);
            if (data['loggedUser']) {
                this.loggedInUser = data['loggedUser'];
            }
        });
    }

    loggedIn() {
        if (this.loggedInUser._id === 'guest') {
            return false;
        } else {
            return true;
        }
    }

    loggingIn() {
        this.logIn = true;
    }

    notLoggingIn() {
        this.logIn = false;
    }

    logOut() {
        this.loggedInUser = {
            _id: 'guest',
            admin: false,
            orders: []
        };
    }

    setLoggedUser(user: object) {
        console.log(user);
        this.loggedInUser = user;
        this.notLoggingIn();
    }

    toggleCart() {
        this.notLoggingIn();
        if (this.showCart) {
            this.showCart = false;
        } else {
            this.showCart = true;
        }
    }

    loggedUserFromChild(eventData) {
        console.log(eventData);
    }
}
