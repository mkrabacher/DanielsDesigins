import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class HttpService {
    loggedUser;
    constructor(
        private _http: HttpClient,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        this.loggedUser = {
            _id: 'guest',
            admin: false,
            orders: []
        };
    }

    loginInService(loginUser) {
        console.log('logging in through service');
        return this._http.post('/loginUser', loginUser);
    }

    registerInService(registerUser) {
        console.log('registering through service');
        return this._http.post('/registerUser', registerUser);
    }

    setLogUserInService(loggedUser) {
        console.log('setting logged user in service');
        this.loggedUser = loggedUser;
        this._router.navigate(['']);
    }

    updateLoggedUserInService(loggedUser) {
        console.log('updating logged in user in service with:', loggedUser.firstName);
        this.loggedUser = loggedUser;
        return this._http.post('/updateUser', this.loggedUser);
    }

    retrieveLogUserInService() {
        console.log('getting logged user in service');
        return this._http.post('/retrieveUser', this.loggedUser);
    }

    getItemsInService() {
        console.log('getting all items in service');
        const thing = null;
        return this._http.post('/getAllItems', thing);
    }

    addItemInService(newItem) {
        return this._http.post('/addItem', newItem);
    }

    deleteItemInService(item) {
        console.log('deleting in service');
        return this._http.post('/deleteItem', item);
    }

    addItemToCartInService(item) {
        let alreadyAdded = false;
        for (let i = 0; i < this.loggedUser.orders.length; i++) {
            if (this.loggedUser.orders[i].name === item.name) {
                this.loggedUser.orders[i].quantity++;
                alreadyAdded = true;
            }
        }
        if (!alreadyAdded) {
            this.loggedUser.orders.push(item);
        }
        const loggedUser = this.loggedUser;
        console.log('adding items to cart in service', loggedUser);
        return this._http.post('/updateUser', loggedUser);
    }
}
