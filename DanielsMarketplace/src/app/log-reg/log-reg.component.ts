import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-log-reg',
    templateUrl: './log-reg.component.html',
    styleUrls: ['./log-reg.component.scss']
})
export class LogRegComponent implements OnInit {
    login;
    registerUser;
    currentUser;
    responseMsg;
    errorMsg;
    @Output() emitUser = new EventEmitter<object>();
    constructor(
        private _httpService: HttpService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {}

    ngOnInit() {
        this.login = {
            email: '',
            password: ''
        };
        this.registerUser = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConf: '',
            admin: false,
        };
    }

    loginThroughService() {
        console.log('logging in now');
        const observable = this._httpService.loginInService(this.login);
        observable.subscribe(data => {
            if (data['currentUser']) {
                this.currentUser = data['currentUser'];
                console.log('login data: ', data);
                this.emitUser.emit(this.currentUser);
                this._httpService.setLogUserInService(this.currentUser);
            } else {
                this.errorMsg = data['errorMsg'];
            }

        });
    }

    registerThroughService() {
        if (this.registerUser.password === this.registerUser.passwordConf) {
            console.log('registering now');
            const observable = this._httpService.registerInService(this.registerUser);
            observable.subscribe(data => {
                console.log('data from register:', data);
                if (data['message']) {
                    this.responseMsg = data['message'];
                    console.log('reg success');
                    this._router.navigate([]);
                } else if (data['error']) {
                    this.responseMsg = data['error'];
                    console.log('reg failed');
                }
            });
        } else  {
        }
    }

    closePopup() {
        this._router.navigate([{ outlets: { popup: null }}]);
    }
}
