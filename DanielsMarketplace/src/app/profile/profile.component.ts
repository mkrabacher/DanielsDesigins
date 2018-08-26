import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    currentUser;
    constructor(
        private _httpService: HttpService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        this.getCurrentUser();

    }

    ngOnInit() {
    }

    getCurrentUser() {
        console.log('getting user now');
        const observable = this._httpService.retrieveCurrentUserInService();
        observable.subscribe(data => {
            console.log(data);
            this.currentUser = data['currentUser'];
            if (this.currentUser == null) {
                this._router.navigate(['welcome']);
            }
        });
    }

}
