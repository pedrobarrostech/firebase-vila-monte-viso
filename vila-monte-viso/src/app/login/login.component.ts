import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../common/_services/authentication.service';

@Component({
    styleUrls: [ './login.style.css' ],
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';

    constructor(
        private router: Router,
        private _authenticationService: AuthenticationService) { }

    ngOnInit() {
        this._authenticationService.logout();
    }

    login() {
        this.loading = true;
        this._authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate(['/']);
                } else {
                    this.error = 'Username ou senha estão incorretos.';
                    this.loading = false;
                }
            });
    }
}
