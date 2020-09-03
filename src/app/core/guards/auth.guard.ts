import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) { }

    public canActivate(): boolean {
        const currentUser = this.authService.currentUser$.getValue();
        console.log('[AuthGuard] CURRENT_USER =>', currentUser);

        const storageUID = localStorage.getItem('uid');
        console.log('[AuthGuard] STORAGE_UID =>', storageUID);

        const isAuth = !!currentUser || !!storageUID;
        console.log('[AuthGuard] isAuth =>', isAuth);

        if (isAuth) {
            return true;
        } else {
            this.router.navigate(['/auth']);
            return false;
        }
    }
}
