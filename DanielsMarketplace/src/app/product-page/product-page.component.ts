import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute, Params } from '../../../node_modules/@angular/router';

@Component({
    selector: 'app-product-page',
    templateUrl: './product-page.component.html',
    styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
    adminPrivileges: boolean;
    item;

    constructor(
        private _httpService: HttpService,
        private _router: Router,
        private _route: ActivatedRoute
        ) {
            this.item = {
                name: '',
            };
        }

    ngOnInit() {
        this.retrieveCurrentUserLevel();
        this._route.params.subscribe((params: Params) => {
            this.retrieveItem(params['id']);
        });
    }

    retrieveCurrentUserLevel() {
        this.adminPrivileges = this._httpService.retrieveCurrentUserLevelInService();
    }

    retrieveItem(id) {
        const observable = this._httpService.getItemInService(id);
        observable.subscribe(data => {
            this.item = data['item'];
        });
    }

    addToCart(item, $event) {
        // gets desired quanitity from number selector
        const quantity = $event.path[1].childNodes[0].valueAsNumber;
        this._httpService.addItemToCartInService(item, quantity);

        // unhides 'added' note
        console.log($event);
        $event.path[2].children[1].hidden = false;
    }

    closePopup() {
        this._router.navigate([{ outlets: { popup: null }}]);
    }
}
