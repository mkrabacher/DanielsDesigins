import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-manage-users',
    templateUrl: './manage-users.component.html',
    styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
    currentUser;
    allUsers;
    constructor(
        private _httpService: HttpService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        this.currentUser = this._httpService.currentUser;
        if (this.currentUser._id === 'guest') {
            this._router.navigate(['/welcome']);
        }
    }

    ngOnInit() {
        this.getAllUsers();
    }

    getAllUsers() {
        console.log('getting all users');
        const observable = this._httpService.getAllUsersInService();
        observable.subscribe(data => {
            console.log(data);
            this.allUsers = data['users'];
        });
    }

    getOrderPrice(order) {
        let total = 0;
        order.items.forEach(item => {
            total += item.price;
        });
        return total;
    }

    deleteUser(user) {
        console.log('deleting user');
        const observable = this._httpService.deleteUserInService(user);
        if (confirm('Deleting users is permenant. Are you sure you want to remove this users?')) {
            if (this.currentUser.admin) {
                observable.subscribe(data => {
                    if (!data['err']) {
                        for (let i = 0; i < this.allUsers.length; i++) {
                            if (this.allUsers[i]._id === user._id) {
                                this.allUsers.splice(i, 1);
                            }
                        }
                    }
                    console.log(data);
                });
            } else {
                alert('you don\'t have privillages to do that. How\'d you get here?');
                this._router.navigate(['/welcome']);
            }
        }

    }

    setOrderStatusToShipped(userID, order) {
        console.log('setting order status to shipped');
        order.status = 'shipped';
        const observable = this._httpService.updateOrdersInService(userID, order);
        if (this.currentUser.admin) {
            observable.subscribe(data => {
                console.log(data);
            });
        } else {
            alert('you don\'t have privillages to do that. How\'d you get here?');
            this._router.navigate(['/welcome']);
        }

    }

    markItemDelivered(userID, order) {
        console.log('setting order status to delivered');
        order.status = 'delivered';
        const observable = this._httpService.updateOrdersInService(userID, order);
        if (this.currentUser.admin) {
            observable.subscribe(data => {
                console.log(data);
                this.getAllUsers();
            });
        } else {
            alert('you don\'t have privillages to do that. How\'d you get here?');
            this._router.navigate(['/welcome']);
        }

    }

    setOrderStatusToProcessing(userID, order) {
        console.log('setting order status to delivered');
        order.status = 'processing';
        const observable = this._httpService.updateOrdersInService(userID, order);
        if (this.currentUser.admin) {
            observable.subscribe(data => {
                console.log(data);
                this.getAllUsers();
            });
        } else {
            alert('you don\'t have privillages to do that. How\'d you get here?');
            this._router.navigate(['/welcome']);
        }

    }
}
