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
            orders: {
                cart: {
                    totalPrice: function() {
                        let total = 0;
                        for (let i = 0; i < this.current.length; i++) {
                            total += this.current[i].price * this.current[i].quantity;
                        }
                        return total;
                    },
                    current: [],
                },
                completedOrders: [],
                currentOrders: []
            }
        };
    }

    loginInService(loginUser) {
        console.log('logging in through service');
        const data = this._http.post('/loginUser', loginUser);
        console.log('data from login: ', data);
        return data;
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

    updateCurrentUserInService(currentUser) {
        console.log('updating current in user with id in service:', currentUser._id);
        if (this.currentUser._id === 'guest') {
            this.currentUser = currentUser;
        } else {
            // this is untested and will presumable return a different object containing the current user object.
            this.currentUser = currentUser;
            this._http.post('/updateUser', this.currentUser).subscribe();
        }
    }

    retrieveCurrentUserInService() {
        console.log('getting current user in service');
        if (this.currentUser._id === 'guest') {
            return this.currentUser;
        } else {
            // this is untested and will presumable return a different object containing the current user object.
            return this._http.post('/retrieveUser', this.currentUser).subscribe();
        }
    }

    retrieveCurrentUserLevelInService() {
        return this.currentUser.admin;
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

    addItemToCartInService(item, quantity) {
        let alreadyAdded = false;
        for (let i = 0; i < this.currentUser.orders.cart.current.length; i++) {
            console.log(item.name, ':', quantity);
            if (this.currentUser.orders.cart.current[i].name === item.name) {
                // tslint:disable-next-line:max-line-length
                console.log('adding:', quantity, item.name, 'to', this.currentUser.orders.cart.current[i].quantity, this.currentUser.orders.cart.current[i].name);
                this.currentUser.orders.cart.current[i].quantity += quantity;
                alreadyAdded = true;
                console.log('so now its at', this.currentUser.orders.cart.current[i].quantity);
            }
        }

        if (!alreadyAdded) {
            item.quantity = quantity;
            this.currentUser.orders.cart.current.push(item);
        }

        const currentUser = this.currentUser;
        console.log('adding items to cart in service', item);
        if (currentUser._id !== 'guest') {
            // this is untested and needs to be addressed when rebuilding the logged in user adding to cart user story.
            // return may be uneccessary.
            return this._http.post('/updateUser', currentUser).subscribe();
        } else {
            return currentUser;
        }
    }
}
