import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

    public saveToDatabase(content: string): Observable<any> {
        const path = `users/${this.currentUser.uid}/editor`;
        const promise = this.realtimeFirebaseDB.object(path).set(content);
        return from(promise);
    }

    public loadFromDatabase(): Observable<any> {
        const path = `users/${this.currentUser.uid}/editor`;
        return this.realtimeFirebaseDB.object(path).snapshotChanges()
            .pipe(map((snapshot: SnapshotAction<any>) => snapshot.payload.val()));
    }
}
