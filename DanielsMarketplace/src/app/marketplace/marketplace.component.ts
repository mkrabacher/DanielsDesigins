import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

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
    adminPrivileges;
    constructor(private _httpService: HttpService) {
        this.searchTerm = '';
        this.typeFilter = {
            Raincoat: false,
            DryBags: false,
            SunProtection: false,
        };
    }

    ngOnInit() {
        this.allItems = [];
        this.displayItems = [];
        this.getAllItemsThroughService();
        this.getCurrentUserLevel();
    }

    getAllItemsThroughService() {
        const observable = this._httpService.getItems();
        observable.subscribe(data => {
            console.log('got back: ', data);
            this.allItems = data['items'];
            this.displayItems = this.allItems;
        });
    }

    getCurrentUserLevel() {
        const observable = this._httpService.retrieveLogUser();
        observable.subscribe(data => {
            if (data['loggedUser']) {
                this.adminPrivileges = true;
            }
        });
    }

    addToCart(item, $event) {
        console.log($event);
        // gets desired quanitity from number selector
        item.quantity = $event.path[1].childNodes[0].valueAsNumber;
        const observable = this._httpService.addItemToCart(item);
        observable.subscribe(data => {
            console.log('got back: ', data);
            // unhides 'added' note
            $event.path[1].children[2].hidden = false;
        });
    }

    deleteItem(item) {
        console.log('sending delete request');
        const observable = this._httpService.deleteItem(item);
        observable.subscribe(data => {
            console.log('got back: ', data);
            this.getAllItemsThroughService();
        });
    }

    filter() {
        this.displayItems = [];
        if (!this.typeFilter.Raincoat && !this.typeFilter.DryBags && !this.typeFilter.SunProtection) {
            this.displayItems = this.allItems;
        } else {
            for (let i = 0; i < this.allItems.length; i++) {
                if (this.allItems[i].itemType === 'Raincoat' && this.typeFilter.Raincoat) {
                    this.displayItems.push(this.allItems[i]);
                } else if (this.allItems[i].itemType === 'Dry Bag' && this.typeFilter.DryBags) {
                    this.displayItems.push(this.allItems[i]);
                } else if (this.allItems[i].itemType === 'Sun Protection' && this.typeFilter.SunProtection) {
                    this.displayItems.push(this.allItems[i]);
                }
            }
        }
    }

    resetFilter() {
        this.typeFilter = {
            Raincoat: false,
            DryBags: false,
            SunProtection: false,
        };
        this.filter();
    }

}
