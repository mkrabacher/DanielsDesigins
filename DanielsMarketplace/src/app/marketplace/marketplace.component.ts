import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import * as $ from 'jquery';

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
        this.retrieveCurrentUserLevel();
        $(document).ready(function () {
            $('.item-image-frame').hover(function () {
                $('.item-hover-buttons').fadeIn('slow');
            });
        });
    }

    slideFadeToggle = function (HTMLele, speed, easing, callback) {
        return HTMLele.animate({ opacity: 'toggle', height: 'toggle' }, speed, easing, callback);
    };

    getAllItemsThroughService() {
        const observable = this._httpService.getItemsInService();
        observable.subscribe(data => {
            console.log('got back: ', data);
            this.allItems = data['items'];
            this.displayItems = this.allItems;
        });
    }

    addToCart(item, $event) {
        // gets desired quanitity from number selector
        const quantity = $event.path[1].childNodes[0].valueAsNumber;
        this._httpService.addItemToCartInService(item, quantity);

        // unhides 'added' note
        $event.path[1].children[2].hidden = false;
    }

    retrieveCurrentUserLevel() {
        this.adminPrivileges = this._httpService.retrieveCurrentUserLevelInService();
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
