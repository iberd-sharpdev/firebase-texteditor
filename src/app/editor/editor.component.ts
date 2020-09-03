import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { MathContent } from '@src/common/math.interface';

import { MEDIUM_CONFIG } from './medium-config';

import * as htmlToText from 'html-to-text';
import { MediumEditor } from 'medium-editor';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
    @ViewChild('editable', { static: true }) editable: ElementRef;

    public editor: MediumEditor;

    public mathLatex: MathContent = {
        latex: 'When $a \\ne 0$, there are two solutions to $\\frac{5}{9}$'
    };

    ngOnInit(): void {
        this.editor = new MediumEditor(this.editable.nativeElement, MEDIUM_CONFIG);

        this.editor.subscribe('editableInput', (event: InputEvent) => {
            const editorHTML = String(this.editable.nativeElement.innerHTML);

            console.log('new symbol =>', event.data);
            console.log('editor content =>', editorHTML);

            this.mathLatex = {
                latex: htmlToText.fromString(editorHTML),
            };
        });
    }
}
