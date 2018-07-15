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
    loggedUser;
    constructor(private _httpService: HttpService) {
        this.loggedUser = this._httpService.retrieveLogUserInService();
    }

    ngOnInit() {
        this.newItem = {
            type: '',
            name: '',
            description: '',
            price: '',
            imgUrl: '',
            userID: this.loggedUser['_id'],
        };
    }

    addItemThroughService() {
        this.newItem.userID = this.loggedUser['_id'];
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
            userID: this.loggedUser['_id'],
        };
    }

}
