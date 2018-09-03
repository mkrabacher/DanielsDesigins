import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class HttpService {
    currentUser;
    constructor(
        private _http: HttpClient,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        this.currentUser = {
            _id: 'guest',
            admin: false,
            cart: {
                current: [],
            },
        };
    }

    loginInService(loginUser) {
        console.log('logging in through service');
        return this._http.post('/loginUser', loginUser);
    }

    logOutInService() {
        console.log('logging out through service');
        this.currentUser = {
            _id: 'guest',
            admin: false,
            cart: {
                current: [],
            },
        };
        return this._http.post('/logoutUser', null);
    }

    registerInService(registerUser) {
        console.log('registering through service');
        return this._http.post('/registerUser', registerUser);
    }

    setLogUserInService(currentUser) {
        console.log('setting current user in service');
        this.currentUser = currentUser;
        this._router.navigate(['']);
    }

    updateCurrentUserInServer() {
        console.log('updating current in user with id in service:', this.currentUser._id);
        if (this.currentUser._id !== 'guest') {
            console.log('dudnt eql guest', this.currentUser);
            this._http.post('/updateUser', this.currentUser).subscribe();
        }
    }

    retrieveCurrentUserInService() {
        return this._http.post('/retrieveUser', this.currentUser);
    }

    retrieveCurrentUserLevelInService() {
        return this.currentUser.admin;
    }

    getItemInService(id) {
        console.log('getting item in service with id:', id);
        return this._http.post('/getItem', {id: id});
    }

    getItemsInService() {
        console.log('getting all items in service');
        return this._http.post('/getAllItems', null);
    }

    addItemInService(newItem) {
        return this._http.post('/addItem', newItem);
    }

    deleteItemInService(item) {
        console.log('deleting in service');
        return this._http.post('/deleteItem', item);
    }

    addItemToCartInService(item, quantity) {
        let alreadyAdded = false;
        for (let i = 0; i < this.currentUser.cart.current.length; i++) {
            console.log(item.name, ':', quantity);
            if (this.currentUser.cart.current[i].name === item.name) {
                // tslint:disable-next-line:max-line-length
                console.log('adding:', quantity, item.name, 'to', this.currentUser.cart.current[i].quantity, this.currentUser.cart.current[i].name);
                this.currentUser.cart.current[i].quantity += quantity;
                alreadyAdded = true;
                console.log('so now its at', this.currentUser.cart.current[i].quantity);
            }
        }

        if (!alreadyAdded) {
            item.quantity = quantity;
            this.currentUser.cart.current.push(item);
        }

        console.log('adding items to cart in service', item);
        if (this.currentUser._id !== 'guest') {
            // this is untested and needs to be addressed when rebuilding the logged in user adding to cart user story.
            // return may be uneccessary.
            return this._http.post('/updateUser', this.currentUser).subscribe();
        } else {
            return this.currentUser;
        }
    }

    placeOrderInService() {
        console.log('placeing order in service');
        return this._http.post('/placeOrder', this.currentUser);
    }
}
