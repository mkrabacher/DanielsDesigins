import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
    selector: 'app-new-item',
    templateUrl: './new-item.component.html',
    styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {
    newItem;
    userItems;
    currentUser;
    constructor(private _httpService: HttpService) {
        this.currentUser = this._httpService.retrieveCurrentUserInService();
    }

    ngOnInit() {
        this.newItem = {
            type: '',
            name: '',
            description: '',
            price: '',
            imgUrl: '',
            userID: this.currentUser['_id'],
        };
    }

    addItemThroughService() {
        this.newItem.userID = this.currentUser['_id'];
        const observable = this._httpService.addItemInService(this.newItem);
        observable.subscribe(data => {
            console.log(data);
        });
        this.newItem = {
            type: '',
            name: '',
            description: '',
            price: '',
            imgUrl: '',
            userID: this.currentUser['_id'],
        };
    }

}
