import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import {MaterializeDirective} from 'angular2-materialize';
import * as Materialize from 'angular2-materialize';

@Component({
    selector: 'app-new-item',
    templateUrl: './new-item.component.html',
    styleUrls: ['./new-item.component.scss']
})
export class NewItemComponent implements OnInit {
    newItem;
    typesArray;
    currentUser;
    constructor(
        private _httpService: HttpService,
        private _router: Router
    ) {
        this.currentUser = this._httpService.currentUser;
        if (this.currentUser._id === 'guest') {
            _router.navigate(['/welcome']);
        }
        this.typesArray = [];
    }

    ngOnInit() {
        this.getItemTypes();
        this.newItem = {
            type: '',
            name: '',
            description: '',
            price: '',
            imgUrl: '',
            userID: this.currentUser['_id'],
        };
    }

    getItemTypes() {
        const observable = this._httpService.getItemsInService();
        observable.subscribe(data => {
            data['items'].forEach(item => {
                if (!this.typesArray.includes(item.itemType)) {
                    this.typesArray.push(item.itemType);
                }
            });
        });
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
