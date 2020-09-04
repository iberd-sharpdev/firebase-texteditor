import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { concatMap, debounceTime, first, skip, take, takeUntil } from 'rxjs/operators';

import { UserInfoType } from '@core/models';
import { AuthService, EditorService } from '@core/services';
import { MathContent } from '@src/common/math.interface';

import { MEDIUM_CONFIG } from './medium-config';

import { MediumEditor } from 'medium-editor';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {
    @ViewChild('editable', { static: true }) editable: ElementRef;

    public currentUser: UserInfoType;
    public editor: MediumEditor;

    private editorSub$: any;
    private typing$ = new Subject();
    private unsubscribe$ = new Subject();

    constructor(
        private authService: AuthService,
        private editorService: EditorService,
    ) { }

    ngOnInit(): void {
        this.currentUser = this.authService.currentUser$.getValue();
        this.editor = new MediumEditor(this.editable.nativeElement, MEDIUM_CONFIG);
        console.log('this.currentUser =>', this.currentUser);

        // load user input
        this.editorService.loadFromDatabase(this.currentUser.uid)
            .pipe(
                first(),
                takeUntil(this.unsubscribe$),
            )
            .subscribe((content: string) => {
                console.log('LOAD =>', content);
                this.editor.setContent(content);
            });

        // listen editor changes
        this.editorSub$ = this.editor
            .subscribe('editableInput', (event: InputEvent) => {
                console.log('* new symbol =>', event.data);
                this.typing$.next();
            });

        // save user input
        this.typing$
            .pipe(
                skip(1),
                debounceTime(300),
                concatMap(() => {
                    const editorContent = String(this.editable.nativeElement.innerHTML);
                    return this.editorService.saveToDatabase(this.currentUser.uid, editorContent);
                }),
                takeUntil(this.unsubscribe$),
            )
            .subscribe(() => {
                console.log(`SAVE (${new Date()})`);
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        this.editorSub$.unsubscribe('editableInput', null);
    }
}
