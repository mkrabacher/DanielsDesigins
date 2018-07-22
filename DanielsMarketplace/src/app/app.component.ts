import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    currentUser;
    logIn;
    showCart;
    constructor(
        private _httpService: HttpService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        this.logIn = false;
        this.showCart = false;
        this.currentUser = {
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
            if (data['currentUser']) {
                this.currentUser = data['currentUser'];
            }
        });
    }

    currentIn() {
        if (this.currentUser._id === 'guest') {
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
        this.currentUser = {
            _id: 'guest',
            admin: false,
            orders: []
        };
    }

    setCurrentUser(user: object) {
        console.log(user);
        this.currentUser = user;
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

    currentUserFromChild(eventData) {
        console.log(eventData);
    }
}
