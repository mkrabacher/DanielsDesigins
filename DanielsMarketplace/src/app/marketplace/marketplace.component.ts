import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
    selector: 'app-marketplace',
    templateUrl: './marketplace.component.html',
    styleUrls: ['./marketplace.component.scss']
})
export class MarketplaceComponent implements OnInit {
    allItems;
    searchTerm;
    constructor(private _httpService: HttpService) {
        this.searchTerm = '';
    }

    ngOnInit() {
        this.allItems = [];
        this.getAllItemsThroughService();
    }

    getAllItemsThroughService() {
        const observable = this._httpService.getItems();
        observable.subscribe(data => {
            console.log('got back: ', data);
            this.allItems = data['items'];
        });
    }

    checkUserLevel() {
        const observable = this._httpService.retrieveLogUser();
        if (observable.admin) {
            return true;
        } else {
            return false;
        }
    }

    addToCart(item, $event) {
        console.log($event);
        item.quantity = $event.path[1].childNodes[0].valueAsNumber;
        this._httpService.addItemToCart(item);
        $event.path[1].children[2].hidden = false;
    }

    deleteItem(item) {
        console.log('sending delete request', item);
        const observable = this._httpService.deleteItem(item);
        observable.subscribe(data => {
            console.log('got back: ', data);
            this.getAllItemsThroughService();
        });
    }

}
