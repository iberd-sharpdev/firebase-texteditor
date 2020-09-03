import { Component } from '@angular/core';
import { MathContent } from 'src/common/math.interface';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	public isAppLoaded = true;
    mathLatex: MathContent = {
        latex: 'When $a \\ne 0$, there are two solutions to $\\frac{5}{9}$'
    };

    textChange(event) {
        this.mathLatex = {
            latex: event.target.value
        }
    }
}
