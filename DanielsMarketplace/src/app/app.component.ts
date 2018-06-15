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

    ngOnInit() {
    }

    loggingIn() {
        this.logIn = true;
    }

    setLoggedUser(user: object) {
        console.log(user);
        this.loggedInUser = user;
        this.logIn = false;
    }
}
