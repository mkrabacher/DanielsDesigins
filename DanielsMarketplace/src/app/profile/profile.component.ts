import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    loggedInUser;
    constructor(
        private _httpService: HttpService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {}

    ngOnInit() {
        this.getLoggedUser();
        if (this._httpService.retrieveLogUserInService() == null) {
            this._router.navigate(['/log-reg']);
        }
    }

    getLoggedUser() {
        console.log('getting user now');
        this.loggedInUser = this._httpService.retrieveLogUserInService();
    }

}
