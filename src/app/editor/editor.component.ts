import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

import { MathContent } from '@src/common/math.interface';

import { MEDIUM_CONFIG } from './medium-config';

import * as htmlToText from 'html-to-text';
import { MediumEditor } from 'medium-editor';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {
    @ViewChild('editable', { static: true }) editable: ElementRef;

    public editor: MediumEditor;
    public mathLatex: MathContent = { latex: 'latex placeholder' };

    // TODO: delete this block
    public mathLatexDemo: MathContent = {
        latex: 'When $a \\ne 0$, there are two solutions to $\\frac{5}{9}$'
    };
    // ---

    private editorSub$: any;
    private typing$ = new Subject();

    ngOnInit(): void {
        this.editor = new MediumEditor(this.editable.nativeElement, MEDIUM_CONFIG);

        this.editorSub$ = this.editor
            .subscribe('editableInput', (event: InputEvent) => {
                console.log('new symbol =>', event.data);
                this.typing$.next();

                const editorHTML = String(this.editable.nativeElement.innerHTML);
                console.log('editor content =>', editorHTML);
                this.mathLatex = {
                    latex: htmlToText.fromString(editorHTML),
                };
            });
    }

    ngOnDestroy(): void {
        this.editorSub$.unsubscribe('editableInput', null);
    }

    // TODO: delete this block
    public textChange(event): void {
        this.mathLatexDemo = {
            latex: event.target.value
        };
    }
    // ---
}
