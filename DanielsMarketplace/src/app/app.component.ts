import { Component, OnInit, OnChanges } from '@angular/core';
import { HttpService } from './http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnChanges {
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

    ngOnChanges() {
        this.updateCurrentUserInServer();
    }

    getCurrentUser() {
        const observable = this._httpService.retrieveCurrentUserInService();
        console.log('oberservable in app.component', observable);
    }

    loggingIn() {
        this.logIn = true;
    }

    notLoggingIn() {
        this.logIn = false;
    }

    updateCurrentUserInServer() {
        console.log('updating user in server.');
    }

    setCurrentUser(user: object) {
        console.log(user);
        this.currentUser = user;
        this.notLoggingIn();
    }

    currentUserFromChild(eventData) {
        console.log(eventData);
    }
}
