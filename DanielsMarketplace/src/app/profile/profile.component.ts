import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    currentUser;
    constructor(
        private _httpService: HttpService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {}

    ngOnInit() {
        this.getCurrentUser();
        if (this._httpService.retrieveCurrentUserInService() == null) {
            this._router.navigate(['/log-reg']);
        }
    }

    getCurrentUser() {
        console.log('getting user now');
        this.currentUser = this._httpService.retrieveCurrentUserInService();
    }

}
