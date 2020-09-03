import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserInfoType } from './core/models';
import { AuthService } from './core/services';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    public isAppLoaded = false;

    private unsubscribe$ = new Subject();

    constructor(
        private authService: AuthService,
    ) { }

    ngOnInit(): void {
        this.authService.authState$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((user: UserInfoType) => {
                console.log('[AppComponent] CURRENT_USER =>', user);
                this.authService.currentUser$.next(user);
                this.isAppLoaded = true;
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
