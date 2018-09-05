import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
    selector: 'app-marketplace',
    templateUrl: './marketplace.component.html',
    styleUrls: ['./marketplace.component.scss']
})
export class MarketplaceComponent implements OnInit {
    allItems;
    displayItems;
    searchTerm;
    typeFilter;
    typesArray;
    adminPrivileges;
    constructor(private _httpService: HttpService, private _router: Router) {
        this.searchTerm = '';
        this.typeFilter = {};
    }

    ngOnInit() {
        this._router.navigate([{ outlets: { popup: null }}]);
        this.allItems = [];
        this.displayItems = [];
        this.typesArray = [];
        this.getAllItemsThroughService();
        this.retrieveCurrentUserLevel();
    }

    slideFadeToggle = function (HTMLele, speed, easing, callback) {
        return HTMLele.animate({ opacity: 'toggle', height: 'toggle' }, speed, easing, callback);
    };

    getAllItemsThroughService() {
        const observable = this._httpService.getItemsInService();
        observable.subscribe(data => {
            console.log('got back: ', data);
            this.allItems = data['items'];
            this.makeItemTypesArray();
            this.displayItems = this.allItems;
        });
    }

    makeItemTypesArray() {
        this.allItems.forEach(item => {
            if (this.typeFilter[item.itemType] === undefined) {
                this.typeFilter[item.itemType] = false;
                this.typesArray.push(item.itemType);
            }
        });
    }

    addToCart(item, $event) {
        // gets desired quanitity from number selector
        const quantity = 1;
        this._httpService.addItemToCartInService(item, quantity);
        // unhides 'added' note
        console.log($event);
        $event.path[1].children[1].hidden = false;
    }

    retrieveCurrentUserLevel() {
        this.adminPrivileges = this._httpService.retrieveCurrentUserLevelInService();
    }

    filter() {
        this.displayItems = [];
        for (let i = 0; i < this.allItems.length; i++) {
            if (this.typeFilter[this.allItems[i].itemType]) {
                this.displayItems.push(this.allItems[i]);
            }
        }
        if (this.displayItems.length === 0) {
            this.displayItems = this.allItems;
        }
    }

    resetFilter() {
        this.typeFilter = {};
        this.filter();
    }

    showProduct(id) {
        this._router.navigate([{ outlets: { popup: 'product-page/' + id }}]);
    }
}
