import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { MEDIUM_CONFIG } from './medium-config';

import { MediumEditor } from 'medium-editor';

@Component({
    selector: 'app-medium',
    templateUrl: './medium.component.html',
    styleUrls: ['./medium.component.scss']
})
export class MediumComponent implements OnInit {
    @ViewChild('editable', { static: true }) editable: ElementRef;

    public editor: MediumEditor;

    ngOnInit(): void {
        this.editor = new MediumEditor(this.editable.nativeElement, MEDIUM_CONFIG);

        this.editor.subscribe('editableInput', (event: InputEvent) => {
            const editorText = String(this.editable.nativeElement.innerHTML);

            console.log('symbol =>', event.data);
            console.log('text =>', editorText);
        });
    }
}
