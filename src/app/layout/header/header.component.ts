import { Component } from '@angular/core';

interface ILink {
    title: string;
    url: string;
}

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    public links: ILink[] = [
        { title: 'Home', url: '/home' },
        { title: 'Editor', url: '/editor' },
    ];
}
