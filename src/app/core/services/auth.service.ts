import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

import { UserCredentialsType, UserInfoType } from '@core/models';

import * as firebase from 'firebase';

@Injectable()
export class AuthService {
    public authState$ = this.afAuth.authState;
    public authError$ = new Subject<firebase.auth.Error>();
    public currentUser$ = new BehaviorSubject<UserInfoType>(null);

    constructor(private router: Router, private afAuth: AngularFireAuth) { }

    public loginWithGoogle(): void {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        const promise = this.afAuth.signInWithPopup(googleProvider);
        this._handleAuthPromise(promise);
    }

    public logout(): void {
        this.currentUser$.next(null);
        this.afAuth.signOut().then(() => {
            localStorage.removeItem('uid');
            this.router.navigate(['/auth']);
        });
    }

    private _handleAuthPromise(promise: Promise<UserCredentialsType>): void {
        promise
            .then((info: UserCredentialsType) => {
                localStorage.setItem('uid', info?.user?.uid || null);
                this.router.navigate(['/home']);
            })
            .catch((error: firebase.auth.Error) => {
                this.authError$.next(error);
            });
    }
}
