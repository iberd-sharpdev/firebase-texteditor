import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { MediumEditor } from 'medium-editor';

@Component({
    selector: 'app-medium',
    templateUrl: './medium.component.html',
    styleUrls: ['./medium.component.scss']
})
export class MediumComponent implements OnInit, AfterViewInit {
    @ViewChild('editable', { static: true }) editable: ElementRef;

    public editor: any;

    constructor() { }

    ngOnInit(): void {
        console.log('init');
    }

    ngAfterViewInit(): void {
        this.editor = new MediumEditor(this.editable.nativeElement);
    }
}
