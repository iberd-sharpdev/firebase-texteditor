import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { MathContent } from '@src/common/math.interface';

import { MathServiceImpl } from './math.service';

@Directive({
    selector: '[appMath]'
})
export class MathDirective implements OnInit, OnChanges, OnDestroy {
    private unsubscribe$ = new Subject();

    @Input()
    private appMath: MathContent;
    private readonly _el: HTMLElement;

    constructor(
        private el: ElementRef,
        private service: MathServiceImpl,
    ) {
        this._el = el.nativeElement as HTMLElement;
    }

    ngOnInit(): void {
        this.service
            .ready()
            .pipe(
                take(1),
                takeUntil(this.unsubscribe$)
            ).subscribe(res => {
                this.service.render(this._el, this.appMath);
            });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!MathJax) { return; }
        this.service.render(this._el, this.appMath);
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
