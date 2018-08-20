import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
    selector: 'app-product-page',
    templateUrl: './product-page.component.html',
    styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
    adminPrivileges: boolean;

    constructor(private _httpService: HttpService) { }

    ngOnInit() {
        this.retrieveCurrentUserLevel();
    }

    retrieveCurrentUserLevel() {
        this.adminPrivileges = this._httpService.retrieveCurrentUserLevelInService();
    }

    addToCart(item, $event) {
        // gets desired quanitity from number selector
        const quantity = $event.path[1].childNodes[0].valueAsNumber;
        this._httpService.addItemToCartInService(item, quantity);

        // unhides 'added' note
        $event.path[1].children[2].hidden = false;
    }

    deleteItem(item) {
        console.log('sending delete request');
        const observable = this._httpService.deleteItemInService(item);
        observable.subscribe(data => {
            console.log('got back: ', data);
        });
    }
}
