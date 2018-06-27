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
        this.loggedUser = {admin: false};
    }

    login(loginUser) {
        console.log('logging in through service');
        return this._http.post('/loginUser', loginUser);
    }

    register(registerUser) {
        console.log('registering through service');
        return this._http.post('/registerUser', registerUser);
    }

    setLogUser(loggedUser) {
        console.log('setting logged user in service');
        this.loggedUser = loggedUser;
        this._router.navigate(['']);
    }

    retrieveLogUser() {
        // console.log('getting logged user in service', this.loggedUser);
        return this.loggedUser;
    }

    getItems() {
        console.log('getting all items in service');
        const thing = null;
        return this._http.post('/getAllItems', thing);
    }

    addItem(newItem) {
        return this._http.post('/addItem', newItem);
    }

    deleteItem(item) {
        console.log('deleting in service', item);
        return this._http.post('/deleteItem', item);
    }
}
