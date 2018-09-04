import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
    selector: 'app-edit-item',
    templateUrl: './edit-item.component.html',
    styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
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
            console.log(data['item']);
            this.item = data['item'];
        });
    }

    saveChanges() {
        console.log('saving changes of item with id ', this.item);
        const observable = this._httpService.editItemInService(this.item);
        observable.subscribe(data => {
            console.log(data);
        });
    }

    closePopup() {
        this._router.navigate([{ outlets: { popup: null }}]);
    }
}
