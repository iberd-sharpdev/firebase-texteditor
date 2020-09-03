import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { from, Observable } from 'rxjs';

import { UserInfoType } from '../models';
import { AuthService } from './auth.service';


@Injectable()
export class EditorService {
    constructor(
        private authService: AuthService,
        private realtimeFirebaseDB: AngularFireDatabase,
    ) { }

    private get currentUser(): UserInfoType {
        return this.authService.currentUser$.getValue();
    }

    public saveUserInput(text: string): Observable<any> {
        const path = `users/${this.currentUser.uid}/editor`;
        const promise = this.realtimeFirebaseDB.object(path).set(text);
        return from(promise);
    }
}
