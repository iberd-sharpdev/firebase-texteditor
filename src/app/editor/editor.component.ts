import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MathContent } from '@src/common/math.interface';

import { MEDIUM_CONFIG } from './medium-config';

import * as htmlToText from 'html-to-text';
import { MediumEditor } from 'medium-editor';
import { AuthService } from '../core/services';
import { UserInfoType } from '../core/models';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {
    @ViewChild('editable', { static: true }) editable: ElementRef;

    public currentUser: UserInfoType;
    public editor: MediumEditor;
    public mathLatex: MathContent = { latex: 'latex placeholder' };

    // TODO: delete this block
    public mathLatexDemo: MathContent = {
        latex: 'When $a \\ne 0$, there are two solutions to $\\frac{5}{9}$'
    };
    // ---

    private editorSub$: any;
    private typing$ = new Subject();
    private unsubscribe$ = new Subject();

    constructor(
        private authService: AuthService,
        private realtimeFirebaseDB: AngularFireDatabase,
    ) { }

    ngOnInit(): void {
        this.currentUser = this.authService.currentUser$.getValue();
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

    public onPush(): void {
        const editorHTML = String(this.editable.nativeElement.innerHTML);
        const path = `users/${this.currentUser.uid}/editor`;
        this.realtimeFirebaseDB.object(path).set(editorHTML);
    }

    // TODO: delete this block
    public textChange(event): void {
        this.mathLatexDemo = {
            latex: event.target.value
        };
    }
    // ---
}
