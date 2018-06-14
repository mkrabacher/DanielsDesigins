import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-log-reg',
    templateUrl: './log-reg.component.html',
    styleUrls: ['./log-reg.component.css']
})
export class LogRegComponent implements OnInit {
    login;
    registerUser;
    loggedInUser;
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
        };
    }

    loginThroughService() {
        console.log('logging in now');
        const observable = this._httpService.login(this.login);
        observable.subscribe(data => {
            if (data['loggedUser']) {
                this.loggedInUser = data['loggedUser'];
                console.log(data);
                this.emitUser.emit(this.loggedInUser);
                this._httpService.setLogUser(this.loggedInUser);
            } else {
                this.errorMsg = data['errorMsg'];
            }

        });
    }

    registerThroughService() {
        if (this.registerUser.password === this.registerUser.passwordConf) {
            console.log('registering now');
            const observable = this._httpService.register(this.registerUser);
            observable.subscribe(data => {
                console.log(data);
                if (data['message']) {
                    this.responseMsg = data['message'];
                    console.log('reg success');
                } else if (data['error']) {
                    this.responseMsg = data['error'];
                    console.log('reg failed');
                }
            });
        } else  {
        }
    }

}
