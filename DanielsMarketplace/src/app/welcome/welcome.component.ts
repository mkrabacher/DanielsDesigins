import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
    actions = new EventEmitter<object>();
    options;
    constructor(private _router: Router) { }

    ngOnInit() {
        this._router.navigate([{ outlets: { popup: null } }]);
        this.options = [{
            fullWidth: true
        }];
    }

    moveRight() {
        this.actions.emit({ action: 'carousel', params: ['next'] });
    }

    moveLeft() {
        this.actions.emit({ action: 'carousel', params: ['prev'] });
    }

}
