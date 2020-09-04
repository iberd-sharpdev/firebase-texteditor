import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class EditorService {
    constructor(
        private realtimeFirebaseDB: AngularFireDatabase,
    ) { }

    public saveToDatabase(uid: string, content: string): Observable<any> {
        const path = `users/${uid}/editor`;
        const promise = this.realtimeFirebaseDB.object(path).set(content);
        return from(promise);
    }

    public loadFromDatabase(uid: string): Observable<any> {
        const path = `users/${uid}/editor`;
        return this.realtimeFirebaseDB.object(path).snapshotChanges()
            .pipe(map((snapshot: SnapshotAction<any>) => snapshot.payload.val()));
    }
}
