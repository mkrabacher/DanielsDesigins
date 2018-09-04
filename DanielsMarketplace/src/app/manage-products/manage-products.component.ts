import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
    selector: 'app-manage-products',
    templateUrl: './manage-products.component.html',
    styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit {
    allItems;
    currentUser;
    constructor(
        private _httpService: HttpService,
        private _router: Router
    ) {
        this.currentUser = this._httpService.currentUser;
        if (this.currentUser._id === 'guest') {
            _router.navigate(['/welcome']);
        }
    }

    ngOnInit() {
        this._router.navigate([{ outlets: { popup: null } }]);
        this.allItems = [];
        this.getAllItems();
    }

    getAllItems() {
        const observable = this._httpService.getItemsInService();

        observable.subscribe(data => {
            console.log('got all items: ', data);
            this.allItems = data['items'];
            console.log(this.allItems);
        });
    }

    editProduct(id) {
        this._router.navigate([{ outlets: { popup: 'edit-item/' + id }}]);
    }
}
