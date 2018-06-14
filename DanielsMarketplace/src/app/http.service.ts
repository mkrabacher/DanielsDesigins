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
        // this.setHeatmap(this.attacksToHeatData());
        // this.setHeatmap(this.fullCompress(this.attacks));
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
        this.loggedUser = loggedUser;
        this._router.navigate(['']);
    }

    retrieveLogUser() {
        console.log(this.loggedUser);
        return this.loggedUser;
    }
}
