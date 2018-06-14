import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    loggedInUser;
    logIn;
    constructor(
        private _httpService: HttpService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        this.logIn = false;
    }

    ngOnInit(): void {
        this.getLoggedUser();
    }

    loggingIn() {
        this.logIn = true;
    }

    setLoggedUser(user: object) {
        console.log(user);
        this.loggedInUser = user;
        this.logIn = false;
    }

    getLoggedUser() {
        console.log('getting user now');
        const observable = this._httpService.retrieveLogUser();
        observable.subscribe(data => {
            console.log(data);
            if (data['loggedUser']) {
                this.loggedInUser = data['loggedUser'];
            }
        });
    }
}
