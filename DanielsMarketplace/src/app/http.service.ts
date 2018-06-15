import { Injectable, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class HttpService implements OnChanges {
    loggedUser;
    constructor(
        private _http: HttpClient,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnChanges() {
    }

    login(loginUser) {
        console.log('logging in through service');
        return this._http.post('/loginUser', loginUser);
    }

    register(registerUser) {
        console.log('registering through service');
        return this._http.post('/registerUser', registerUser);
    }

    setLogUser(loggedUser) {
        console.log('setting logged user in service');
        this.loggedUser = loggedUser;
        this._router.navigate(['']);
    }

    retrieveLogUser() {
        console.log('getting logged user in service');
        return this.loggedUser;
    }
}
