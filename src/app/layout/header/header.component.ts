import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserInfoType } from '@src/app/core/models';
import { AuthService } from '@src/app/core/services';

interface ILink {
    title: string;
    url: string;
}

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    public currentUser: UserInfoType;

    public links: ILink[] = [
        // { title: 'Editor', url: '/editor' },
    ];

    private unsubscribe$ = new Subject();

    constructor(
        private authService: AuthService,
    ) { }

    ngOnInit(): void {
        this.authService.currentUser$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((user: UserInfoType) => {
                this.currentUser = user;
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    public onLogout(): void {
        this.authService.logout();
    }
}
