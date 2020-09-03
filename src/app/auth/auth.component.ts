import { Component } from '@angular/core';

import { AuthService } from '../core/services';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
    constructor(private authService: AuthService) { }

    public onLogin(): void {
        this.authService.loginWithGoogle();
    }
}
